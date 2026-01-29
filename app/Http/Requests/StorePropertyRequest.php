<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePropertyRequest extends FormRequest
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
        return [
            'city_id' => 'required|exists:cities,id',
            'featured_img_id' => 'nullable|exists:media,id',
            'street' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:properties,slug',
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
            'furniture' => 'required|string|in:igen,nem',
            'appliances' => 'required|string|in:igen,nem',
            'view' => 'nullable|string|max:255',
            'heating_type' => 'nullable|string|max:255',
            'parking' => 'nullable|string|max:255',
            'air_conditioning' => 'required|string|in:igen,nem',
            'smoking' => 'required|string|in:nem,igen',
            'pets' => 'required|string|in:nem,igen',
            'elevator' => 'required|string|in:igen,nem',
            'is_featured' => 'required|string|in:igen,nem',
            'floor_area' => 'nullable|string|max:255',
            'short_description' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:500',
        ];
    }

    public function messages(): array
    {
        return 
            [
            'city_id.required' => 'A város kiválasztása kötelező.',
            'city_id.exists' => 'A kiválasztott város nem létezik.',
            'street.required' => 'Az utca megadása kötelező.',
            'street.string' => 'Az utca csak szöveget tartalmazhat.',
            'street.max' => 'Az utca neve maximum 255 karakter lehet.',
            'slug.unique' => 'Ez a slug már foglalt.',
            'latitude.numeric' => 'A földrajzi szélesség csak szám lehet.',
            'latitude.between' => 'A földrajzi szélesség -90 és 90 között lehet.',
            'longitude.numeric' => 'A földrajzi hosszúság csak szám lehet.',
            'longitude.between' => 'A földrajzi hosszúság -180 és 180 között lehet.',
            'rental_price.max' => 'A bérleti díj maximum 255 karakter lehet.',
            'size.max' => 'A méret maximum 255 karakter lehet.',
            'sale_price.max' => 'Az eladási ár maximum 255 karakter lehet.',
            'minimum_rental_period.max' => 'A minimális bérleti időszak maximum 255 karakter lehet.',
            'year_built.max' => 'Az építés éve maximum 255 karakter lehet.',
            'building_floors.max' => 'Az épület szintjei maximum 255 karakter lehet.',
            'floor.max' => 'Az emelet maximum 255 karakter lehet.',
            'balcony.max' => 'Az erkély maximum 255 karakter lehet.',
            'furniture.required' => 'A bútorozottság megadása kötelező.',
            'furniture.in' => 'A bútorozottság csak "igen" vagy "nem" lehet.',
            'appliances.required' => 'A gépesítés megadása kötelező.',
            'appliances.in' => 'A gépesítés csak "igen" vagy "nem" lehet.',
            'view.max' => 'A kilátás maximum 255 karakter lehet.',
            'heating_type.max' => 'A fűtés típusa maximum 255 karakter lehet.',
            'parking.max' => 'A parkolás maximum 255 karakter lehet.',
            'air_conditioning.required' => 'A légkondicionáló megadása kötelező.',
            'air_conditioning.in' => 'A légkondicionáló csak "igen" vagy "nem" lehet.',
            'smoking.required' => 'A dohányzás engedélyezése kötelező.',
            'smoking.in' => 'A dohányzás csak "igen" vagy "nem" lehet.',
            'pets.required' => 'A háziállat engedélyezése kötelező.',
            'pets.in' => 'A háziállat csak "igen" vagy "nem" lehet.',
            'elevator.required' => 'A lift megadása kötelező.',
            'elevator.in' => 'A lift csak "igen" vagy "nem" lehet.',
            'is_featured.required' => 'A kiemelt hirdetés megadása kötelező.',
            'is_featured.in' => 'A kiemelt hirdetés csak "igen" vagy "nem" lehet.',
            'floor_area.max' => 'Az alapterület maximum 255 karakter lehet.',
            'short_description.max' => 'A rövid leírás maximum 500 karakter lehet.',
            'meta_title.max' => 'A meta cím maximum 255 karakter lehet.',
            'meta_description.max' => 'A meta leírás maximum 500 karakter lehet.',
            'meta_keywords.max' => 'A meta kulcsszavak maximum 500 karakter lehet.'
        ];
    }
}
