<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Models\City;
use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
            $properties = Property::where('user_id', auth()->id())->get();

        return Inertia::render('Media', [
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
        $cities = City::where('user_id', auth()->id())->get();
        $properties = Property::where('user_id', auth()->id())->get();

        return Inertia::render('GalleryImageCreate', ['cities' => $cities, 'properties' => $properties]);
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
                'alt_text' => 'nullable|string|max:255',
                'city_id' => 'nullable|exists:cities,id',
                'property_ids' => 'nullable|array',
                'property_ids.*' => 'exists:properties,id',
                'is_featured' => 'boolean'
            ]);

            $uploadedImages = [];

            foreach ($request->file('images') as $image) {
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
                    'alt_text' => $validated['alt_text'] ?? null,
                ]);

                // Kapcsolatok létrehozása
                if (!empty($validated['city_id'])) {
                    // Ellenőrizzük, hogy a város a felhasználóhoz tartozik
                    $city = City::where('id', $validated['city_id'])
                               ->where('user_id', auth()->id())
                               ->first();
                    if ($city) {
                        $city->update(['featured_img_id' => $media->id]);
                    }
                }

                if (!empty($validated['property_ids'])) {
                    foreach ($validated['property_ids'] as $propertyId) {
                        // Ellenőrizzük, hogy az ingatlan a felhasználóhoz tartozik
                        $property = Property::where('id', $propertyId)
                                           ->where('user_id', auth()->id())
                                           ->first();
                        if ($property) {
                            if ($validated['is_featured'] ?? false) {
                                $property->update(['featured_img_id' => $media->id]);
                            } else {
                                // Galéria kép hozzáadása
                                $property->media()->attach($media->id, ['order' => 0]);
                            }
                        }
                    }
                }

                $uploadedImages[] = $media;
            }

            return response()->json([
                'message' => 'Images uploaded successfully',
                'images' => MediaResource::collection($uploadedImages)
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error uploading images',
                'error' => $e->getMessage()
            ], 500);
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
     * Show the form for editing the specified resource.
     */
    public function edit(Media $media)
    {
        // Ellenőrizzük, hogy a kép a felhasználóhoz tartozik
        if ($media->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $cities = City::where('user_id', auth()->id())->get();
        $properties = Property::where('user_id', auth()->id())->get();

        $media->load(['featuredInCities', 'featuredInProperties', 'properties']);

        return Inertia::render('EditGalleryImage', [
            'media' => new MediaResource($media),
            'cities' => $cities,
            'properties' => $properties
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Media $media)
    {
        // Ellenőrizzük, hogy a kép a felhasználóhoz tartozik
        if ($media->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        try {
            $validated = $request->validate([
                'alt_text' => 'nullable|string|max:255'
            ]);

            $media->update([
                'alt_text' => $validated['alt_text'] ?? $media->alt_text
            ]);

            return response()->json([
                'message' => 'Image updated successfully',
                'media' => new MediaResource($media)
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
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

            return response()->json([
                'message' => 'Image deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting image',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
