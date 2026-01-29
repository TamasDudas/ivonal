<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Property extends Model
{
    protected $fillable = [
        'user_id',
        'city_id',
        'featured_img_id',
        'street',
        'slug',
        'latitude',
        'longitude',
        'rental_price',
        'size',
        'sale_price',
        'minimum_rental_period',
        'year_built',
        'building_floors',
        'floor',
        'balcony',
        'furniture',
        'appliances',
        'view',
        'heating_type',
        'parking',
        'air_conditioning',
        'smoking',
        'pets',
        'elevator',
        'is_featured',
        'floor_area',
        'short_description',
        'description',
        'meta_title',
        'meta_description',
        'meta_keywords',
    ];

    protected $casts = [
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
    ];

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function featuredImage(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'featured_img_id');
    }

    public function media(): BelongsToMany
    {
        return $this->belongsToMany(Media::class, 'property_media')->withPivot('order')->orderByPivot('order');
    }
    //Beépített laravel method, hogy a slug legyen használva az id helyett
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
