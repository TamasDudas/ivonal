<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Models\City;
use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\MediaResource;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $cities = City::where('user_id', auth()->id())->get();
        $properties = Property::where('user_id', auth()->id())->get();

        return Inertia::render('gallery/media', [
            'images' => Inertia::scroll(fn () => Media::where('user_id', auth()->id())
                ->latest()
                ->paginate(12)),
            'cities' => $cities,
            'properties' => $properties
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('gallery/upload-image');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'images' => 'required|array|min:1|max:100',
                'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'alt_texts' => 'nullable|array',
                'alt_texts.*' => 'nullable|string|max:255'
            ], [
                'images.required' => 'Képek kiválasztása kötelező.',
                'images.array' => 'A képek tömb formátumban kell legyenek.',
                'images.min' => 'Legalább 1 képet kell kiválasztani.',
                'images.max' => 'Maximum 100 képet lehet feltölteni egyszerre.',
                'images.*.required' => 'Minden kép kötelező.',
                'images.*.image' => 'Csak képfájlok tölthetők fel.',
                'images.*.mimes' => 'Csak jpeg, png, jpg, gif vagy webp formátumú képek engedélyezettek.',
                'images.*.max' => 'A képek maximum 2MB méretűek lehetnek.',
                'alt_texts.array' => 'Az alt szövegek tömb formátumban kell legyenek.',
                'alt_texts.*.string' => 'Az alt szöveg csak szöveget tartalmazhat.',
                'alt_texts.*.max' => 'Az alt szöveg maximum 255 karakter lehet.',
            ]);

            $uploadedImages = [];

            //A $index-el párosítjuk a megfelelő alt_texts-et a megfelelő index-es képhez
            foreach ($request->file('images') as $index => $image) {
                // Fájl mentése
                $path = $image->store('media', 'public');

                // Thumbnail és különböző méretek generálása (opcionális)
                $versions = [];

                // Media rekord létrehozása
                $media = Media::create([
                    'user_id' => auth()->id(),
                    'filename' => $image->hashName(),
                    'path' => $path,
                    'original_filename' => $image->getClientOriginalName(),
                    'versions' => $versions,
                    'size' => $image->getSize(),
                    'mime_type' => $image->getMimeType(),
                    'width' => null, // TODO: kép feldolgozással kitölteni
                    'height' => null, // TODO: kép feldolgozással kitölteni
                    'alt_text' => $validated['alt_texts'][$index] ?? null,
                ]);

                $uploadedImages[] = $media;
            }

            return back()->with('success', 'Képek sikeresen feltöltve!');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->withErrors(['error' => 'Hiba történt a képek feltöltése során: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Media $media)
    {
        // Ellenőrizzük, hogy a kép a felhasználóhoz tartozik
        if ($media->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $media->load(['featuredInCities', 'featuredInProperties', 'properties']);

        return Inertia::render('MediaShow', [
            'media' => new MediaResource($media)
        ]);
    }

    /**
     * Assign media as featured image for a city.
     */
    public function assignCityFeatured(Request $request, Media $media)
    {
        $request->validate([
            'city_id' => 'required|exists:cities,id',
        ], [
            'city_id.required' => 'Város kiválasztása kötelező.',
            'city_id.exists' => 'A kiválasztott város nem létezik.',
        ]);

        // Ellenőrizzük, hogy a kép és a város a felhasználóhoz tartozik
        if ($media->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $city = City::where('id', $request->city_id)->where('user_id', auth()->id())->first();
        if (!$city) {
            abort(403, 'Unauthorized');
        }

        // Előző featured kép eltávolítása, ha volt
        City::where('featured_img_id', $media->id)->update(['featured_img_id' => null]);

        $city->update(['featured_img_id' => $media->id]);

        return redirect()->back()->with('success', 'Kép beállítva featured-ként a városnak.');
    }

    /**
     * Assign media as featured image for a property.
     */
    public function assignPropertyFeatured(Request $request, Media $media)
    {
        $request->validate([
            'property_id' => 'required|exists:properties,id',
        ], [
            'property_id.required' => 'Ingatlan kiválasztása kötelező.',
            'property_id.exists' => 'A kiválasztott ingatlan nem létezik.',
        ]);

        // Ellenőrizzük, hogy a kép és az ingatlan a felhasználóhoz tartozik
        if ($media->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $property = Property::where('id', $request->property_id)->where('user_id', auth()->id())->first();
        if (!$property) {
            abort(403, 'Unauthorized');
        }

        // Előző featured kép eltávolítása, ha volt
        Property::where('featured_img_id', $media->id)->update(['featured_img_id' => null]);

        $property->update(['featured_img_id' => $media->id]);

        return redirect()->back()->with('success', 'Kép beállítva featured-ként az ingatlannak.');
    }

    /**
     * Assign multiple media to property gallery.
     */
    public function assignMultipleToGallery(Request $request)
    {
        $request->validate([
            'property_id' => 'required|exists:properties,id',
            'media_ids' => 'required|array',
            'media_ids.*' => 'exists:media,id',
        ], [
            'property_id.required' => 'Ingatlan kiválasztása kötelező.',
            'property_id.exists' => 'A kiválasztott ingatlan nem létezik.',
            'media_ids.required' => 'Képek kiválasztása kötelező.',
            'media_ids.array' => 'A képek tömb formátumban kell legyenek.',
            'media_ids.*.exists' => 'Egy vagy több kiválasztott kép nem létezik.',
        ]);

        $property = Property::where('id', $request->property_id)->where('user_id', auth()->id())->first();
        if (!$property) {
            abort(403, 'Unauthorized');
        }

        foreach ($request->media_ids as $mediaId) {
            $media = Media::find($mediaId);
            if ($media && $media->user_id === auth()->id() && !$property->media()->where('media_id', $mediaId)->exists()) {
                $property->media()->attach($mediaId, ['order' => $property->media()->count() + 1]);
            }
        }

        return redirect()->back()->with('success', 'Képek hozzáadva az ingatlan galériájához.');
    }


    //Kép törlése
    public function destroy(Media $media)
    {
        // Ellenőrizzük, hogy a kép a felhasználóhoz tartozik
        if ($media->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        try {
            // Eltávolítjuk az összes kapcsolódásból
            City::where('featured_img_id', $media->id)->update(['featured_img_id' => null]);
            Property::where('featured_img_id', $media->id)->update(['featured_img_id' => null]);
            $media->properties()->detach();

            // Fájl törlése a storage-ból
            if ($media->path && \Storage::disk('public')->exists($media->path)) {
                \Storage::disk('public')->delete($media->path);
            }

            $media->delete();

            return redirect()->route('media.index')->with('success', 'Kép sikeresen törölve!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['delete' => 'Hiba történt a kép törlése során: ' . $e->getMessage()]);
        }
    }
}
