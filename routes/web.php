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
Route::get('/ingatlanok', [PropertyController::class, 'index'])->name('properties.index');
Route::get('/media', [MediaController::class, 'index'])->name('media.index');
// Nyilvános kapcsolatfelvételi form - bárki küldhet email-t
Route::get('/kapcsolat', [IncomingEmailController::class, 'contactPage'])->name('contact.page');
// Nyilvános kapcsolatfelvételi form - bárki küldhet email-t
Route::post('/contact', [IncomingEmailController::class, 'store'])->name('contact.store');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Ingatlanok CRUD (védett műveletek)
    Route::get('ingatlanok/letrehozas', [PropertyController::class, 'create'])->name('properties.create');
    Route::post('ingatlanok', [PropertyController::class, 'store'])->name('properties.store');
    Route::get('ingatlanok/{property:id}/szerkesztes', [PropertyController::class, 'edit'])->name('properties.edit');
    Route::patch('ingatlanok/{property:id}', [PropertyController::class, 'update'])->name('properties.update');
    Route::delete('ingatlanok/{property:id}', [PropertyController::class, 'destroy'])->name('properties.destroy');

    // Városok CRUD (védett műveletek)
    Route::get('varosok/letrehozas', [CityController::class, 'create'])->name('cities.create');
    
    Route::post('varosok', [CityController::class, 'store'])->name('cities.store');
    Route::get('varosok/{city:id}/szerkesztes', [CityController::class, 'edit'])->name('cities.edit');
    Route::patch('varosok/{city:id}', [CityController::class, 'update'])->name('cities.update');
    Route::delete('varosok/{city:id}', [CityController::class, 'destroy'])->name('cities.destroy');

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

//Adatvédelmi tájékoztató oldal
Route::get('/adatvedelmi-tajekoztato', function () {
    return Inertia::render('terms-conditions');
})->name('terms-conditions');

// Nyilvános ingatlan és város megtekintés - ezek UTOLJÁRA kellenek, hogy a /create ne ütközzön velük
Route::get('/ingatlanok/varos/{city:slug}', [PropertyController::class, 'listByCity'])->name('properties.by.city');
Route::get('/ingatlanok/{property:slug}', [PropertyController::class, 'show'])->name('properties.show');
Route::get('/varosok/{city:slug}', [CityController::class, 'show'])->name('cities.show');
Route::get('/media/{media}', [MediaController::class, 'show'])->name('media.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/varosok', [CityController::class, 'cityHandle'])->name('cities.list');
});



require __DIR__.'/settings.php';
