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
    public function index()
    {
        $images = Media::with(['featuredInCities', 'featuredInProperties', 'properties'])
            ->where('user_id', auth()->id())
            ->latest()
            ->paginate(10);

            $cities = City::where('user_id', auth()->id())->get();

            //Vissza adja az összes ingatlant ami a felhasználóhoz tartozik, ez jelneik meg a frontenden
            $properties = Property::where('user_id', auth()->id())->get();

        return Inertia::render('gallery/media', [
            'images' => [
                'data' => MediaResource::collection($images->items())->toArray(request()),
                'current_page' => $images->currentPage(),
                'last_page' => $images->lastPage(),
                'per_page' => $images->perPage(),
                'total' => $images->total(),
                'links' => $images->linkCollection()->toArray()
            ],
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'images' => 'required|array|min:1|max:10',
                'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'alt_texts' => 'nullable|array',
                'alt_texts.*' => 'nullable|string|max:255'
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

            return redirect()->back()->with('success', 'Images uploaded successfully');

        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['upload' => 'Error uploading images: ' . $e->getMessage()]);
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
     * Assign media to property gallery.
     */
    public function assignPropertyGallery(Request $request, Media $media)
    {
        $request->validate([
            'property_id' => 'required|exists:properties,id',
        ]);

        // Ellenőrizzük, hogy a kép és az ingatlan a felhasználóhoz tartozik
        if ($media->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $property = Property::where('id', $request->property_id)->where('user_id', auth()->id())->first();
        if (!$property) {
            abort(403, 'Unauthorized');
        }

        // Hozzáadás a galériához, ha még nincs
        if (!$property->media()->where('media_id', $media->id)->exists()) {
            $property->media()->attach($media->id, ['order' => $property->media()->count() + 1]);
        }

        return redirect()->back()->with('success', 'Kép hozzáadva az ingatlan galériájához.');
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

            return redirect()->route('media.index')->with('success', 'Image deleted successfully');

        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['delete' => 'Error deleting image: ' . $e->getMessage()]);
        }
    }
}
