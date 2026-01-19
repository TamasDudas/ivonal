<?php

namespace App\Http\Controllers;

use App\Models\City;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Mews\Purifier\Facades\Purifier;
use App\Http\Resources\CityResource;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cities = City::with('featuredImage')
            ->latest()
            ->get();

        return Inertia::render('home', [
            'cities' => CityResource::collection($cities)
        ]);
    }

    public function cityHandle(){
        $cities = City::all();

        return Inertia::render('city/cities', ["cities" => CityResource::collection($cities)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('city/city-create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:cities,slug',
            'description' => 'nullable|string|max:1000',
            'featured_img_id' => 'nullable|exists:media,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:500',
        ], [
            'name.required' => 'A város neve kötelező.',
            'name.string' => 'A város neve csak szöveget tartalmazhat.',
            'name.max' => 'A város neve maximum 255 karakter lehet.',
            'slug.unique' => 'Ez a slug már foglalt.',
            'description.max' => 'A város leírása maximum 1000 karakter lehet.',
            'featured_img_id.exists' => 'A kiválasztott kép nem létezik.',
            'meta_title.max' => 'A meta cím maximum 255 karakter lehet.',
            'meta_description.max' => 'A meta leírás maximum 500 karakter lehet.',
            'meta_keywords.max' => 'A meta kulcsszavak maximum 500 karakter lehet.',
        ]);

        try {
            // Automatikus slug generálás ha nincs megadva
            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['name']);
            }

            // User ID hozzáadása
            $validated['user_id'] = auth()->id();

            if(!empty($validated['description'])){
                $validated['description'] = Purifier::clean($validated['description']);
            }

            $city = City::create($validated);

            return back()->with('success', 'Város sikeresen létrehozva!');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->withErrors(['error' => 'Hiba történt a város létrehozása során: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(City $city)
    {
        $city->load(['featuredImage', 'properties']);

        return Inertia::render('city/city', [
            'city' => $city
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(City $city)
    {
       return Inertia::render('city/city-update', [
           'city' => $city
       ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, City $city)
    {
        // Ellenőrizzük, hogy a város a felhasználóhoz tartozik
        if ($city->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:cities,slug,' . $city->id,
            'description' => 'nullable|string|max:1000',
            'featured_img_id' => 'nullable|exists:media,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:500',
        ], [
            'name.required' => 'A város neve kötelező.',
            'name.string' => 'A város neve csak szöveget tartalmazhat.',
            'name.max' => 'A város neve maximum 255 karakter lehet.',
            'slug.unique' => 'Ez a slug már foglalt.',
            'description.max' => 'A város leírása maximum 1000 karakter lehet.',
            'featured_img_id.exists' => 'A kiválasztott kép nem létezik.',
            'meta_title.max' => 'A meta cím maximum 255 karakter lehet.',
            'meta_description.max' => 'A meta leírás maximum 500 karakter lehet.',
            'meta_keywords.max' => 'A meta kulcsszavak maximum 500 karakter lehet.',
        ]);

        try {
            // Automatikus slug generálás ha nincs megadva
            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['name']);
            }

            // HTML mező sanitizálása XSS védelem
            if (!empty($validated['description'])) {
                $validated['description'] = Purifier::clean($validated['description']);
            }

            $city->update($validated);

            return back()->with('success', 'Város sikeresen frissítve!');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->withErrors(['error' => 'Hiba történt a város frissítése során: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(City $city)
    {
        // Ellenőrizzük, hogy a város a felhasználóhoz tartozik
        if ($city->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        try {
            $city->delete();

            return redirect()->back()->with('success', 'Város sikeresen törölve!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Hiba történt a város törlése során: ' . $e->getMessage()]);
        }
    }
}
