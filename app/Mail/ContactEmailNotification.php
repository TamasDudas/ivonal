<?php

namespace App\Mail;

use App\Models\IncomingEmail;
use Illuminate\Bus\Queueable;
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
     */
    public function __construct(IncomingEmail $incomingEmail)
    {
        $this->incomingEmail = $incomingEmail;
    }

    /**
     * Email boríték beállítása (címzett, feladó, tárgy)
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Új kapcsolatfelvételi üzenet: '.$this->incomingEmail->subject,
        );
    }

    /**
     * Email tartalom definíciója
     * A view-ban használhatjuk a $incomingEmail változót
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
