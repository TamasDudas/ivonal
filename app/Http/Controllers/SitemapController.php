<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\City;
use Illuminate\Http\Request;

class SitemapController extends Controller
{
    public function index()
    {
        $properties = Property::latest('updated_at')
            ->get();
        
        $cities = City::all();

        return response()->view('sitemap', [
            'properties' => $properties,
            'cities' => $cities,
        ])->header('Content-Type', 'text/xml');
    }
}
