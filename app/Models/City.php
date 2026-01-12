<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class City extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description',
        'featured_img_id',
        'meta_title',
        'meta_description',
        'meta_keywords',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function featuredImage(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'featured_img_id');
    }

    public function properties(): HasMany
    {
        return $this->hasMany(Property::class);
    }

    //Beépített laravel method, hogy a slug legyen használva az id helyett
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
