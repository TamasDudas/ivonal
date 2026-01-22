<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IncomingEmail extends Model
{
  // Mass assignment védelem - csak ezek a mezők tölthetők be tömegesen
  // Ez biztonsági funkció, hogy ne lehessen nem kívánt mezőket módosítani
  protected $fillable = [
    'name',
    'email',
    'phone',
    'subject',
    'message',
    'read_at',
    'replied_at',
  ];

  // Típuskonverziók - Laravel automatikusan konvertálja ezeket
  // read_at és replied_at datetime objektumokká lesznek konvertálva
  // Így könnyen használhatjuk őket Carbon metódusokkal (pl. ->format(), ->diffForHumans())
  protected $casts = [
    'read_at' => 'datetime',
    'replied_at' => 'datetime',
  ];

  /**
   * Visszaadja, hogy az email olvasott-e
   * Helper metódus, hogy könnyebben ellenőrizhessük az olvasottságot
   * 
   * @return bool
   */
  public function isRead(): bool
  {
    return $this->read_at !== null;
  }

  /**
   * Visszaadja, hogy az email-re válaszoltunk-e
   * Helper metódus, hogy könnyebben ellenőrizhessük a válaszolást
   * 
   * @return bool
   */
  public function isReplied(): bool
  {
    return $this->replied_at !== null;
  }

  /**
   * Megjelöli az email-t olvasottként
   * Ha még nincs beállítva a read_at, akkor beállítja az aktuális időpontra
   * 
   * @return void
   */
  public function markAsRead(): void
  {
    if (!$this->isRead()) {
      $this->update(['read_at' => now()]);
    }
  }

  /**
   * Megjelöli az email-t válaszoltként
   * Ha még nincs beállítva a replied_at, akkor beállítja az aktuális időpontra
   * 
   * @return void
   */
  public function markAsReplied(): void
  {
    if (!$this->isReplied()) {
      $this->update(['replied_at' => now()]);
    }
  }

  /**
   * Scope query - csak az olvasott email-eket adja vissza
   * Használat: IncomingEmail::read()->get()
   * 
   * @param \Illuminate\Database\Eloquent\Builder $query
   * @return \Illuminate\Database\Eloquent\Builder
   */
  public function scopeRead($query)
  {
    return $query->whereNotNull('read_at');
  }

  /**
   * Scope query - csak a nem olvasott email-eket adja vissza
   * Használat: IncomingEmail::unread()->get()
   * 
   * @param \Illuminate\Database\Eloquent\Builder $query
   * @return \Illuminate\Database\Eloquent\Builder
   */
  public function scopeUnread($query)
  {
    return $query->whereNull('read_at');
  }

  /**
   * Scope query - csak a válaszolt email-eket adja vissza
   * Használat: IncomingEmail::replied()->get()
   * 
   * @param \Illuminate\Database\Eloquent\Builder $query
   * @return \Illuminate\Database\Eloquent\Builder
   */
  public function scopeReplied($query)
  {
    return $query->whereNotNull('replied_at');
  }

  /**
   * Scope query - csak a nem válaszolt email-eket adja vissza
   * Használat: IncomingEmail::unreplied()->get()
   * 
   * @param \Illuminate\Database\Eloquent\Builder $query
   * @return \Illuminate\Database\Eloquent\Builder
   */
  public function scopeUnreplied($query)
  {
    return $query->whereNull('replied_at');
  }
}
