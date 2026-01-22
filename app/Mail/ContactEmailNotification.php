<?php

namespace App\Mail;

use App\Models\IncomingEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactEmailNotification extends Mailable
{
  use Queueable, SerializesModels;

  /**
   * Az IncomingEmail modell példánya
   * Ezt adjuk át a view-nak, hogy megjeleníthessük az adatokat
   * 
   * @var \App\Models\IncomingEmail
   */
  public $incomingEmail;

  /**
   * Mailable konstruktor
   * Az IncomingEmail modellt kapja paraméterként, amit a view-ban használunk
   * 
   * @param \App\Models\IncomingEmail $incomingEmail
   */
  public function __construct(IncomingEmail $incomingEmail)
  {
    $this->incomingEmail = $incomingEmail;
  }

  /**
   * Email boríték beállítása (címzett, feladó, tárgy)
   * 
   * @return \Illuminate\Mail\Mailables\Envelope
   */
  public function envelope(): Envelope
  {
    return new Envelope(
      subject: 'Új kapcsolatfelvételi üzenet: ' . $this->incomingEmail->subject,
    );
  }

  /**
   * Email tartalom definíciója
   * A view-ban használhatjuk a $incomingEmail változót
   * 
   * @return \Illuminate\Mail\Mailables\Content
   */
  public function content(): Content
  {
    return new Content(
      view: 'emails.contact-notification',
    );
  }

  /**
   * Email mellékletek (jelenleg nincs)
   * 
   * @return array<int, \Illuminate\Mail\Mailables\Attachment>
   */
  public function attachments(): array
  {
    return [];
  }
}
