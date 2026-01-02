<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Property;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\PropertyResource;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $properties = Property::withCount('media')
            ->with('featuredImage', 'city')
            ->latest()
            ->get();

        return Inertia::render('properties', [
            'properties' => PropertyResource::collection($properties)->toArray(request())
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $cities = City::select('id', 'name')->orderBy('name')->get();
        
        return Inertia::render('property-create', [
            'cities' => $cities
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'city_id' => 'required|exists:cities,id',
            'featured_img_id' => 'nullable|exists:media,id',
            'street' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:properties,slug',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'rental_price' => 'nullable|string|max:255',
            'size' => 'nullable|string|max:255',
            'sale_price' => 'nullable|string|max:255',
            'minimum_rental_period' => 'nullable|string|max:255',
            'year_built' => 'nullable|string|max:255',
            'building_floors' => 'nullable|string|max:255',
            'floor' => 'nullable|string|max:255',
            'balcony' => 'nullable|string|max:255',
            'furniture' => 'required|string|in:igen,nem',
            'appliances' => 'required|string|in:igen,nem',
            'view' => 'nullable|string|max:255',
            'heating_type' => 'nullable|string|max:255',
            'parking' => 'nullable|string|max:255',
            'air_conditioning' => 'required|string|in:igen,nem',
            'smoking' => 'required|string|in:nem,igen',
            'pets' => 'required|string|in:nem,igen',
            'elevator' => 'required|string|in:igen,nem',
            'is_featured' => 'required|string|in:igen,nem',
            'floor_area' => 'nullable|string|max:255',
            'short_description' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:500',
        ]);

        try {
            // Automatikus slug generálás ha nincs megadva
            if (empty($validated['slug'])) {
                $city = City::find($validated['city_id']);
                $baseSlug = Str::slug($validated['street'] . '-' . $city->name);
                $slug = $baseSlug;
                $counter = 1;
                
                while (Property::where('slug', $slug)->exists()) {
                    $slug = $baseSlug . '-' . $counter;
                    $counter++;
                }
                
                $validated['slug'] = $slug;
            }

            // User ID hozzáadása
            $validated['user_id'] = auth()->id();

            $property = Property::create($validated);

            return redirect()->route('home')->with('success', 'Ingatlan sikeresen létrehozva!');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->withErrors(['error' => 'Hiba történt az ingatlan létrehozása során: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Property $property)
    {
        $property->load(['city', 'featuredImage', 'media']);

        return Inertia::render('property.show', new PropertyResource($property));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Property $property)
    {
        return Inertia::render('property-update');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Property $property)
    {
        // Ellenőrizzük, hogy az ingatlan a felhasználóhoz tartozik
        if ($property->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        try {
            $validated = $request->validate([
                'city_id' => 'required|exists:cities,id',
                'featured_img_id' => 'nullable|exists:media,id',
                'street' => 'required|string|max:255',
                'slug' => 'nullable|string|max:255|unique:properties,slug,' . $property->id,
                'latitude' => 'nullable|numeric|between:-90,90',
                'longitude' => 'nullable|numeric|between:-180,180',
                'rental_price' => 'nullable|string|max:255',
                'size' => 'nullable|string|max:255',
                'sale_price' => 'nullable|string|max:255',
                'minimum_rental_period' => 'nullable|string|max:255',
                'year_built' => 'nullable|string|max:255',
                'building_floors' => 'nullable|string|max:255',
                'floor' => 'nullable|string|max:255',
                'balcony' => 'nullable|string|max:255',
                'furniture' => 'string|in:igen,nem',
                'appliances' => 'string|in:igen,nem',
                'view' => 'nullable|string|max:255',
                'heating_type' => 'nullable|string|max:255',
                'parking' => 'nullable|string|max:255',
                'air_conditioning' => 'string|in:igen,nem',
                'smoking' => 'string|in:igen,nem',
                'pets' => 'string|in:igen,nem',
                'elevator' => 'string|in:igen,nem',
                'is_featured' => 'string|in:igen,nem',
                'floor_area' => 'nullable|string|max:255',
                'short_description' => 'nullable|string|max:500',
                'description' => 'nullable|string',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string|max:500',
                'meta_keywords' => 'nullable|string|max:500',
            ]);

            // Automatikus slug generálás ha nincs megadva
            if (empty($validated['slug'])) {
                $city = City::find($validated['city_id']);
                $baseSlug = Str::slug($validated['street'] . '-' . $city->name);
                $slug = $baseSlug;
                $counter = 1;
                
                while (Property::where('slug', $slug)->exists()) {
                    $slug = $baseSlug . '-' . $counter;
                    $counter++;
                }
                
                $validated['slug'] = $slug;
            }

            $property->update($validated);

            return redirect()->route('properties.index')->with('success', 'Ingatlan sikeresen frissítve!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Hiba történt az ingatlan frissítése során: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        // Ellenőrizzük, hogy az ingatlan a felhasználóhoz tartozik
        if ($property->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        try {
            $property->delete();

            return redirect()->route('properties.index')->with('success', 'Ingatlan sikeresen törölve!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Hiba történt az ingatlan törlése során: ' . $e->getMessage()]);
        }
    }
}
