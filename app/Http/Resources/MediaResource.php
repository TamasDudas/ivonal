<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;

class MediaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        'id' =>$this->id,
        'user_id' => $this->user_id,
        'filename' => $this->filename,
        'path' => $this->path,
        'original_filename'=> $this->original_filename,
        'versions' => $this->versions,
        'size' => $this->size,
        'mime_type' => $this->mime_type,
        'width' => $this->width,
        'height' => $this->height,
        'alt_text' =>$this->alt_text,
        //Kiemelt kép a városhoz
        'cities' => $this->whenLoaded('featuredInCities', function() {
            return $this->featuredInCities->map(function($city){
                return [
                    'id' => $city->id,
                    'name' =>$city->name,
                ];
            });
        }),
        //Kiemelt kép az ingatlanhoz
        'properties' => $this->whenLoaded('featuredInProperties', function() {
            return $this->featuredInProperties->map(function($property){
                return [
                 'id' => $property->id,
                 'street' => $property->street,
                ];
            });
        }),
        //Képek a galériához
        'gallery_properties' => $this->whenLoaded('properties', function() {
            return $this->properties->map(function($property){
                return [
                 'id' => $property->id,
                 'street' => $property->street,
                 'order' => $property->pivot->order,
                ];
            });
        }),
        'image_url' => $this->path ? Storage::url($this->path) : null,
        ];
    }
}
