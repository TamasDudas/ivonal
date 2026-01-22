<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\IncomingEmailController;

// Nyilvános route-ok (ingatlanok és városok megtekintése)
Route::get('/', [CityController::class, 'index'])->name('home');
Route::get('/properties', [PropertyController::class, 'index'])->name('properties.index');
Route::get('/media', [MediaController::class, 'index'])->name('media.index');

// Nyilvános kapcsolatfelvételi form - bárki küldhet email-t
Route::post('/contact', [IncomingEmailController::class, 'store'])->name('contact.store');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Ingatlanok CRUD (védett műveletek)
    Route::get('properties/create', [PropertyController::class, 'create'])->name('properties.create');
    Route::post('properties', [PropertyController::class, 'store'])->name('properties.store');
    Route::get('properties/{property}/edit', [PropertyController::class, 'edit'])->name('properties.edit');
    Route::patch('properties/{property}', [PropertyController::class, 'update'])->name('properties.update');
    Route::delete('properties/{property}', [PropertyController::class, 'destroy'])->name('properties.destroy');

    // Városok CRUD (védett műveletek)
    Route::get('cities/create', [CityController::class, 'create'])->name('cities.create');
    
    Route::post('cities', [CityController::class, 'store'])->name('cities.store');
    Route::get('cities/{city}/edit', [CityController::class, 'edit'])->name('cities.edit');
    Route::patch('cities/{city}', [CityController::class, 'update'])->name('cities.update');
    Route::delete('cities/{city}', [CityController::class, 'destroy'])->name('cities.destroy');
    Route::get('cities', [CityController::class, 'cityHandle'])->name('cities.handle');

    // Média CRUD (védett)
    Route::get('media/create', [MediaController::class, 'create'])->name('media.create');
    Route::post('media', [MediaController::class, 'store'])->name('media.store');
    Route::patch('media/{media}/assign-city', [MediaController::class, 'assignCityFeatured'])->name('media.assign-city');
    Route::patch('media/{media}/assign-property', [MediaController::class, 'assignPropertyFeatured'])->name('media.assign-property');
    Route::post('media/assign-gallery', [MediaController::class, 'assignMultipleToGallery'])->name('media.assign-multiple-gallery');
    Route::patch('media/{media}/assign-gallery', [MediaController::class, 'assignPropertyGallery'])->name('media.assign-gallery');
    Route::delete('media/{media}', [MediaController::class, 'destroy'])->name('media.destroy');

    // Bejövő email-ek kezelése (védett)
    Route::get('incoming-emails', [IncomingEmailController::class, 'index'])->name('incoming-emails.index');
    Route::get('incoming-emails/{incomingEmail}', [IncomingEmailController::class, 'show'])->name('incoming-emails.show');
    Route::patch('incoming-emails/{incomingEmail}/mark-read', [IncomingEmailController::class, 'markAsRead'])->name('incoming-emails.mark-read');
    Route::patch('incoming-emails/{incomingEmail}/mark-replied', [IncomingEmailController::class, 'markAsReplied'])->name('incoming-emails.mark-replied');
    Route::delete('incoming-emails/{incomingEmail}', [IncomingEmailController::class, 'destroy'])->name('incoming-emails.destroy');
});

// Nyilvános ingatlan és város megtekintés - ezek UTOLJÁRA kellenek, hogy a /create ne ütközzön velük
Route::get('/properties/city/{city}', [PropertyController::class, 'listByCity'])->name('properties.by.city');
Route::get('/properties/{property}', [PropertyController::class, 'show'])->name('properties.show');
Route::get('/cities/{city}', [CityController::class, 'show'])->name('cities.show');
Route::get('/media/{media}', [MediaController::class, 'show'])->name('media.show');

require __DIR__.'/settings.php';
