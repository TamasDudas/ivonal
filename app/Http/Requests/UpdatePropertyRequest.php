<?php

namespace App\Http\Requests;

use App\Http\Requests\StorePropertyRequest;

class UpdatePropertyRequest extends StorePropertyRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $propertyId = $this->route('property')?->id ?? null;

        return [
            'city_id' => 'nullable|exists:cities,id',
            'featured_img_id' => 'nullable|exists:media,id',
            'street' => 'nullable|string|max:255',
            'slug' => 'nullable|string|max:255|unique:properties,slug,' . $propertyId,
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'rental_price' => 'nullable|string|max:255',
            'size' => 'nullable|string|max:255',
            'sale_price' => 'nullable|string|max:255',
            'minimum_rental_period' => 'nullable|string|max:255',
            'year_built' => 'nullable|string|max:255',
            'building_floors' => 'nullable|string|max:255',
            'floor' => 'nullable|string|max:255',
            'balcony' => 'nullable|string|max:255',
            'furniture' => 'nullable|string|in:igen,nem',
            'appliances' => 'nullable|string|in:igen,nem',
            'view' => 'nullable|string|max:255',
            'heating_type' => 'nullable|string|max:255',
            'parking' => 'nullable|string|max:255',
            'air_conditioning' => 'nullable|string|in:igen,nem',
            'smoking' => 'nullable|string|in:igen,nem',
            'pets' => 'nullable|string|in:igen,nem',
            'elevator' => 'nullable|string|in:igen,nem',
            'is_featured' => 'nullable|string|in:igen,nem',
            'floor_area' => 'nullable|string|max:255',
            'short_description' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:500',
        ];
    }
}
