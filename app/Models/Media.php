<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    protected $fillable = [
        'user_id',
        'filename',
        'path',
        'original_filename',
        'versions',
        'size',
        'mime_type',
        'width',
        'height',
        'alt_text',
    ];

    protected $casts = [
        'versions' => 'array',
        'size' => 'integer',
        'width' => 'integer',
        'height' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function properties(): BelongsToMany
    {
        return $this->belongsToMany(Property::class, 'property_media')->withPivot('order')->orderBy('pivot_order');
    }

    public function featuredInProperties(): HasMany
    {
        return $this->hasMany(Property::class, 'featured_img_id');
    }

    public function featuredInCities(): HasMany
    {
        return $this->hasMany(City::class, 'featured_img_id');
    }

    /**
     * Visszaadja a médiafájl teljes URL-jét a Storage facade segítségével.
     */
    public function getUrlAttribute()
    {
        return Storage::url($this->path);
    }
}
