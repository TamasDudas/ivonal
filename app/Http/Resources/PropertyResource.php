<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PropertyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            //a whenLoad()-ok controllerben lesznek definiálva
            'user' => $this->whenLoaded('user'),
            'city' => $this->whenLoaded('city'),
           'featured_image' => $this->featuredImage ? Storage::url($this->featuredImage->path) : null,
            'media' => $this->whenLoaded('media'),
            'street' => $this->street,
            'slug' => $this->slug,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'rental_price' => $this->rental_price,
            'size' => $this->size,
            'sale_price' => $this->sale_price,
            'minimum_rental_period' => $this->minimum_rental_period,
            'year_built' => $this->year_built,
            'building_floors' => $this->building_floors,
            'floor' => $this->floor,
            'balcony' => $this->balcony,
            'furniture' => $this->furniture,
            'appliances' => $this->appliances,
            'view' => $this->view,
            'heating_type' => $this->heating_type,
            'parking' => $this->parking,
            'air_conditioning' => $this->air_conditioning,
            'smoking' => $this->smoking,
            'pets' => $this->pets,
            'elevator' => $this->elevator,
            'is_featured' => $this->is_featured,
            'floor_area' => $this->floor_area,
            'short_description' => $this->short_description,
            'description' => $this->description,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'meta_keywords' => $this->meta_keywords,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
