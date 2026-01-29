<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCityRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:cities,slug',
            'description' => 'nullable|string|max:1000',
            'featured_img_id' => 'nullable|exists:media,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'A város neve kötelező.',
            'name.string' => 'A város neve csak szöveget tartalmazhat.',
            'name.max' => 'A város neve maximum 255 karakter lehet.',
            'slug.unique' => 'Ez a slug már foglalt.',
            'description.max' => 'A város leírása maximum 1000 karakter lehet.',
            'featured_img_id.exists' => 'A kiválasztott kép nem létezik.',
            'meta_title.max' => 'A meta cím maximum 255 karakter lehet.',
            'meta_description.max' => 'A meta leírás maximum 500 karakter lehet.',
            'meta_keywords.max' => 'A meta kulcsszavak maximum 500 karakter lehet.'
        ];
    }
}
