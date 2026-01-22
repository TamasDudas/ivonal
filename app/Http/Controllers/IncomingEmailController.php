<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIncomingEmailRequest;
use App\Http\Resources\IncomingEmailResource;
use App\Mail\ContactEmailNotification;
use App\Models\IncomingEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class IncomingEmailController extends Controller
{
  /**
   * Bejövő email-ek listázása
   * Csak bejelentkezett felhasználók láthatják
   * 
   * @return \Inertia\Response
   */
  public function index()
  {
    // Összes email lekérése dátum szerint csökkenő sorrendben (legújabbak először)
    // A scope-okat is használhatjuk: unread(), unreplied() stb.
    $emails = IncomingEmail::latest()
      ->get();

    return Inertia::render('incoming-emails/index', [
      'emails' => IncomingEmailResource::collection($emails),
    ]);
  }

  /**
   * Új bejövő email mentése (nyilvános endpoint)
   * Validáció után elmentjük az adatbázisba és email-t küldünk
   * 
   * @param \App\Http\Requests\StoreIncomingEmailRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function store(StoreIncomingEmailRequest $request)
  {
    try {
      // Validált adatokkal új email létrehozása
      // A Form Request már ellenőrizte az adatokat, így biztonságosan használhatjuk
      $incomingEmail = IncomingEmail::create($request->validated());

      // Email küldése az adminisztrátornak
      // A Mail::to() metódussal megadjuk a címzettet
      // A config/mail.php fájlban van beállítva a MAIL_FROM_ADDRESS
      // Ha nincs beállítva, akkor a .env fájlban kell beállítani
      $adminEmail = config('mail.from.address', 'admin@example.com');
      
      Mail::to($adminEmail)->send(new ContactEmailNotification($incomingEmail));

      // Sikeres válasz visszaadása
      // Ha Inertia-t használunk, akkor with() metódussal adhatunk át flash üzenetet
      return back()->with('success', 'Köszönjük az üzenetét! Hamarosan válaszolunk.');
    } catch (\Exception $e) {
      // Hiba esetén logoljuk és visszaadjuk a hibát
      Log::error('Hiba történt az email küldése során: ' . $e->getMessage());

      return back()
        ->withInput()
        ->withErrors(['error' => 'Hiba történt az üzenet küldése során. Kérjük, próbálja újra később.']);
    }
  }

  /**
   * Egy bejövő email részleteinek megjelenítése
   * Csak bejelentkezett felhasználók láthatják
   * 
   * @param \App\Models\IncomingEmail $incomingEmail
   * @return \Inertia\Response
   */
  public function show(IncomingEmail $incomingEmail)
  {
    // Automatikusan olvasottként jelöljük meg, amikor megnyitjuk
    $incomingEmail->markAsRead();

    return Inertia::render('incoming-emails/show', [
      'email' => new IncomingEmailResource($incomingEmail),
    ]);
  }

  /**
   * Email olvasottként jelölése
   * Inertia-kompatibilis válasz - visszatér az előző oldalra flash üzenettel
   * Ha AJAX hívásról van szó, az Inertia router kezeli automatikusan
   * 
   * @param \App\Models\IncomingEmail $incomingEmail
   * @return \Illuminate\Http\RedirectResponse
   */
  public function markAsRead(IncomingEmail $incomingEmail)
  {
    $incomingEmail->markAsRead();

    // Inertia-kompatibilis válasz - back() visszatér az előző oldalra
    // A flash üzenet elérhető lesz a frontend-en az Inertia page props-ban
    return back()->with('success', 'Email olvasottként jelölve.');
  }

  /**
   * Email válaszoltként jelölése
   * Inertia-kompatibilis válasz - visszatér az előző oldalra flash üzenettel
   * Ha AJAX hívásról van szó, az Inertia router kezeli automatikusan
   * 
   * @param \App\Models\IncomingEmail $incomingEmail
   * @return \Illuminate\Http\RedirectResponse
   */
  public function markAsReplied(IncomingEmail $incomingEmail)
  {
    $incomingEmail->markAsReplied();

    // Inertia-kompatibilis válasz - back() visszatér az előző oldalra
    // A flash üzenet elérhető lesz a frontend-en az Inertia page props-ban
    return back()->with('success', 'Email válaszoltként jelölve.');
  }

  /**
   * Email törlése
   * Csak bejelentkezett felhasználók törölhetnek email-eket
   * 
   * @param \App\Models\IncomingEmail $incomingEmail
   * @return \Illuminate\Http\RedirectResponse
   */
  public function destroy(IncomingEmail $incomingEmail)
  {
    try {
      $incomingEmail->delete();

      return redirect()
        ->route('incoming-emails.index')
        ->with('success', 'Email sikeresen törölve.');
    } catch (\Exception $e) {
      return redirect()
        ->back()
        ->withErrors(['error' => 'Hiba történt az email törlése során: ' . $e->getMessage()]);
    }
  }
}
