<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Property;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\PropertyResource;
use Mews\Purifier\Facades\Purifier;

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
        ], [
            'city_id.required' => 'A város kiválasztása kötelező.',
            'city_id.exists' => 'A kiválasztott város nem létezik.',
            'street.required' => 'Az utca megadása kötelező.',
            'street.string' => 'Az utca csak szöveget tartalmazhat.',
            'street.max' => 'Az utca neve maximum 255 karakter lehet.',
            'slug.unique' => 'Ez a slug már foglalt.',
            'latitude.numeric' => 'A földrajzi szélesség csak szám lehet.',
            'latitude.between' => 'A földrajzi szélesség -90 és 90 között lehet.',
            'longitude.numeric' => 'A földrajzi hosszúság csak szám lehet.',
            'longitude.between' => 'A földrajzi hosszúság -180 és 180 között lehet.',
            'rental_price.max' => 'A bérleti díj maximum 255 karakter lehet.',
            'size.max' => 'A méret maximum 255 karakter lehet.',
            'sale_price.max' => 'Az eladási ár maximum 255 karakter lehet.',
            'minimum_rental_period.max' => 'A minimális bérleti időszak maximum 255 karakter lehet.',
            'year_built.max' => 'Az építés éve maximum 255 karakter lehet.',
            'building_floors.max' => 'Az épület szintjei maximum 255 karakter lehet.',
            'floor.max' => 'Az emelet maximum 255 karakter lehet.',
            'balcony.max' => 'Az erkély maximum 255 karakter lehet.',
            'furniture.required' => 'A bútorozottság megadása kötelező.',
            'furniture.in' => 'A bútorozottság csak "igen" vagy "nem" lehet.',
            'appliances.required' => 'A gépesítés megadása kötelező.',
            'appliances.in' => 'A gépesítés csak "igen" vagy "nem" lehet.',
            'view.max' => 'A kilátás maximum 255 karakter lehet.',
            'heating_type.max' => 'A fűtés típusa maximum 255 karakter lehet.',
            'parking.max' => 'A parkolás maximum 255 karakter lehet.',
            'air_conditioning.required' => 'A légkondicionáló megadása kötelező.',
            'air_conditioning.in' => 'A légkondicionáló csak "igen" vagy "nem" lehet.',
            'smoking.required' => 'A dohányzás engedélyezése kötelező.',
            'smoking.in' => 'A dohányzás csak "igen" vagy "nem" lehet.',
            'pets.required' => 'A háziállat engedélyezése kötelező.',
            'pets.in' => 'A háziállat csak "igen" vagy "nem" lehet.',
            'elevator.required' => 'A lift megadása kötelező.',
            'elevator.in' => 'A lift csak "igen" vagy "nem" lehet.',
            'is_featured.required' => 'A kiemelt hirdetés megadása kötelező.',
            'is_featured.in' => 'A kiemelt hirdetés csak "igen" vagy "nem" lehet.',
            'floor_area.max' => 'Az alapterület maximum 255 karakter lehet.',
            'short_description.max' => 'A rövid leírás maximum 500 karakter lehet.',
            'meta_title.max' => 'A meta cím maximum 255 karakter lehet.',
            'meta_description.max' => 'A meta leírás maximum 500 karakter lehet.',
            'meta_keywords.max' => 'A meta kulcsszavak maximum 500 karakter lehet.',
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
            ], [
                'city_id.required' => 'A város kiválasztása kötelező.',
                'city_id.exists' => 'A kiválasztott város nem létezik.',
                'street.required' => 'Az utca megadása kötelező.',
                'street.string' => 'Az utca csak szöveget tartalmazhat.',
                'street.max' => 'Az utca neve maximum 255 karakter lehet.',
                'slug.unique' => 'Ez a slug már foglalt.',
                'latitude.numeric' => 'A földrajzi szélesség csak szám lehet.',
                'latitude.between' => 'A földrajzi szélesség -90 és 90 között lehet.',
                'longitude.numeric' => 'A földrajzi hosszúság csak szám lehet.',
                'longitude.between' => 'A földrajzi hosszúság -180 és 180 között lehet.',
                'rental_price.max' => 'A bérleti díj maximum 255 karakter lehet.',
                'size.max' => 'A méret maximum 255 karakter lehet.',
                'sale_price.max' => 'Az eladási ár maximum 255 karakter lehet.',
                'minimum_rental_period.max' => 'A minimális bérleti időszak maximum 255 karakter lehet.',
                'year_built.max' => 'Az építés éve maximum 255 karakter lehet.',
                'building_floors.max' => 'Az épület szintjei maximum 255 karakter lehet.',
                'floor.max' => 'Az emelet maximum 255 karakter lehet.',
                'balcony.max' => 'Az erkély maximum 255 karakter lehet.',
                'furniture.in' => 'A bútorozottság csak "igen" vagy "nem" lehet.',
                'appliances.in' => 'A gépesítés csak "igen" vagy "nem" lehet.',
                'view.max' => 'A kilátás maximum 255 karakter lehet.',
                'heating_type.max' => 'A fűtés típusa maximum 255 karakter lehet.',
                'parking.max' => 'A parkolás maximum 255 karakter lehet.',
                'air_conditioning.in' => 'A légkondicionáló csak "igen" vagy "nem" lehet.',
                'smoking.in' => 'A dohányzás csak "igen" vagy "nem" lehet.',
                'pets.in' => 'A háziállat csak "igen" vagy "nem" lehet.',
                'elevator.in' => 'A lift csak "igen" vagy "nem" lehet.',
                'is_featured.in' => 'A kiemelt hirdetés csak "igen" vagy "nem" lehet.',
                'floor_area.max' => 'Az alapterület maximum 255 karakter lehet.',
                'short_description.max' => 'A rövid leírás maximum 500 karakter lehet.',
                'meta_title.max' => 'A meta cím maximum 255 karakter lehet.',
                'meta_description.max' => 'A meta leírás maximum 500 karakter lehet.',
                'meta_keywords.max' => 'A meta kulcsszavak maximum 500 karakter lehet.',
            ]);

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
