<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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

        return Inertia::render('Cities', [
            'cities' => $cities
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CityCreate');
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

            return response()->json([
                'message' => 'City created successfully',
                'city' => $city->load('featuredImage')
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating city',
                'error' => $e->getMessage()
            ], 500);
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
       return Inertia::render('CityUpdate');
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

            return response()->json([
                'message' => 'City updated successfully',
                'city' => $city->load('featuredImage')
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating city',
                'error' => $e->getMessage()
            ], 500);
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

            return response()->json([
                'message' => 'City deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting city',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
