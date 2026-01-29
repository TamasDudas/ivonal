<?php

namespace App\Http\Requests;

class UpdateCityRequest extends StoreCityRequest
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
        $cityId = $this->route('city')?->id ?? null;

        return [
            'name' => 'nullable|string|max:255',
            'slug' => 'nullable|string|max:255|unique:cities,slug,' . $cityId,
            'description' => 'nullable|string|max:1000',
            'featured_img_id' => 'nullable|exists:media,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:500',
        ];
    }
}
