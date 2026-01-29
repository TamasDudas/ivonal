<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Property;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\PropertyResource;
use Mews\Purifier\Facades\Purifier;
use App\Http\Requests\StorePropertyRequest;
use App\Http\Requests\UpdatePropertyRequest;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $properties = Property::all();

        return Inertia::render('property/property-handle', [
            'properties' => PropertyResource::collection($properties)
        ]);
    }

   //Ingatlanik a városok szerint
    public function listByCity(City $city){
        if(!$city){
            abort(404, 'Város nem található');
        }

        $properties = $city->properties()->select('id', 'street', 'featured_img_id', 'short_description' )->with('featuredImage')->get();

        return Inertia::render('property/properties-by-city', ['city' => $city, 'properties' => PropertyResource::collection($properties)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $cities = City::select('id', 'name')->orderBy('name')->get();
        
        return Inertia::render('property/property-create', [
            'cities' => $cities
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePropertyRequest $request)
    {
        $validated = $request->validated();
        
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

            // HTML mezők sanitizálása XSS védelem
            if (!empty($validated['short_description'])) {
                $validated['short_description'] = Purifier::clean($validated['short_description']);
            }
            if (!empty($validated['description'])) {
                $validated['description'] = Purifier::clean($validated['description']);
            }

            // User ID hozzáadása
            $validated['user_id'] = auth()->id();

            $property = Property::create($validated);

            return back()->with('success', 'Ingatlan sikeresen létrehozva!');
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

        return Inertia::render('property/property', [
            'property' => new PropertyResource($property)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Property $property)
    {
        $cities = City::select('id', 'name')->orderBy('name')->get();
        
        return Inertia::render('property/property-update', [
            'property' => $property,
            'cities' => $cities
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePropertyRequest $request, Property $property)
    {
        // Ellenőrizzük, hogy az ingatlan a felhasználóhoz tartozik
        if ($property->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        try {
            $validated = $request->validated();

            // HTML mezők sanitizálása XSS védelem
            if (!empty($validated['short_description'])) {
                $validated['short_description'] = Purifier::clean($validated['short_description']);
            }
            if (!empty($validated['description'])) {
                $validated['description'] = Purifier::clean($validated['description']);
            }

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

            return back()->with('success', 'Ingatlan sikeresen frissítve!');
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
