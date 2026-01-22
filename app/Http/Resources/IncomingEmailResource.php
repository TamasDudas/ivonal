<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IncomingEmailResource extends JsonResource
{
  /**
   * Az IncomingEmail modell adatainak átalakítása JSON formátumba
   * Ez a Resource osztály biztosítja, hogy konzisztens formátumban adjuk vissza az adatokat
   * 
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'name' => $this->name,
      'email' => $this->email,
      'phone' => $this->phone,
      'subject' => $this->subject,
      'message' => $this->message,
      'read_at' => $this->read_at?->format('Y-m-d H:i:s'), // Ha null, akkor null marad, egyébként formázott dátum
      'replied_at' => $this->replied_at?->format('Y-m-d H:i:s'),
      'is_read' => $this->isRead(), // Helper metódus használata
      'is_replied' => $this->isReplied(), // Helper metódus használata
      'created_at' => $this->created_at->format('Y-m-d H:i:s'),
      'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
    ];
  }
}
