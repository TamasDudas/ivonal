<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class StoreIncomingEmailRequest extends FormRequest
{
  /**
   * Meghatározza, hogy a felhasználó jogosult-e erre a kérésre
   * Nyilvános endpoint, így mindenki küldhet email-t
   * 
   * @return bool
   */
  public function authorize(): bool
  {
    return true; // Nyilvános endpoint, mindenki küldhet email-t
  }

  /**
   * Validációs szabályok a bejövő email adatokhoz
   * 
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'name' => 'required|string|max:255',
      'email' => 'required|email|max:255',
      'phone' => 'nullable|string|max:255',
      'subject' => 'required|string|max:255',
      'message' => 'required|string|max:5000', // Maximum 5000 karakter az üzenet
    ];
  }

  /**
   * Magyar nyelvű validációs hibaüzenetek
   * 
   * @return array<string, string>
   */
  public function messages(): array
  {
    return [
      'name.required' => 'A név megadása kötelező.',
      'name.string' => 'A név csak szöveget tartalmazhat.',
      'name.max' => 'A név maximum 255 karakter lehet.',
      'email.required' => 'Az email cím megadása kötelező.',
      'email.email' => 'Az email cím formátuma nem megfelelő.',
      'email.max' => 'Az email cím maximum 255 karakter lehet.',
      'phone.string' => 'A telefonszám csak szöveget tartalmazhat.',
      'phone.max' => 'A telefonszám maximum 255 karakter lehet.',
      'subject.required' => 'A tárgy megadása kötelező.',
      'subject.string' => 'A tárgy csak szöveget tartalmazhat.',
      'subject.max' => 'A tárgy maximum 255 karakter lehet.',
      'message.required' => 'Az üzenet megadása kötelező.',
      'message.string' => 'Az üzenet csak szöveget tartalmazhat.',
      'message.max' => 'Az üzenet maximum 5000 karakter lehet.',
    ];
  }

  /**
   * Validációs hiba esetén visszaadjuk a beküldött input mezőket is (JSON kéréseknél).
   *
   * Miért jó?
   * - Inertia/React oldalon így garantáltan vissza tudod tölteni a form mezőket,
   *   még akkor is, ha nem klasszikus redirectes (web) validációról van szó.
   * - Webes (nem JSON) kérésnél meghagyjuk a Laravel alap működését:
   *   visszairányítás és old input flash-elése.
   *
   * @param \Illuminate\Contracts\Validation\Validator $validator
   * @return void
   */
  protected function failedValidation(Validator $validator): void
  {
    if (!$this->expectsJson()) {
      parent::failedValidation($validator);
      return;
    }

    throw new HttpResponseException(
      response()->json([
        'message' => 'A megadott adatok érvénytelenek.',
        'errors' => $validator->errors(),
        'input' => $this->except($this->dontFlash),
      ], 422)
    );
  }
}
