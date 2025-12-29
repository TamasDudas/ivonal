<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

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
            'cities' => $cities
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('city-create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'slug' => 'nullable|string|max:255|unique:cities,slug',
                'description' => 'nullable|string|max:1000',
                'featured_img_id' => 'nullable|exists:media,id',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string|max:500',
                'meta_keywords' => 'nullable|string|max:500',
            ]);

            // Automatikus slug generálás ha nincs megadva
            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['name']);
            }

            // User ID hozzáadása
            $validated['user_id'] = auth()->id();

            $city = City::create($validated);

            return redirect()->route('home')->with('success', 'Város sikeresen létrehozva!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Hiba történt a város létrehozása során: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(City $city)
    {
        $city->load(['featuredImage', 'properties']);

        return Inertia::render('City', [
            'city' => $city
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(City $city)
    {
       return Inertia::render('city-update');
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

        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'slug' => 'nullable|string|max:255|unique:cities,slug,' . $city->id,
                'description' => 'nullable|string|max:1000',
                'featured_img_id' => 'nullable|exists:media,id',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string|max:500',
                'meta_keywords' => 'nullable|string|max:500',
            ]);

            // Automatikus slug generálás ha nincs megadva
            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['name']);
            }

            $city->update($validated);

            return redirect()->route('home')->with('success', 'Város sikeresen frissítve!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Hiba történt a város frissítése során: ' . $e->getMessage()]);
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

            return redirect()->route('home')->with('success', 'Város sikeresen törölve!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Hiba történt a város törlése során: ' . $e->getMessage()]);
        }
    }
}
