<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('incoming_emails', function (Blueprint $table) {
            $table->id();
            
            // Feladó adatai - ezek kötelezőek, mert minden email-nek kell küldő
            $table->string('name'); // Feladó neve
            $table->string('email'); // Feladó email címe - validációval ellenőrizzük majd
            
            // Opcionális telefon szám - nem minden kapcsolatfelvételi form tartalmazza
            $table->string('phone')->nullable();
            
            // Email tartalma
            $table->string('subject'); // Tárgy - rövid szöveg, ezért string
            $table->text('message'); // Üzenet - hosszabb szöveg, ezért text típus
            
            
            // Olvasottság követése - nullable timestamp, mert kezdetben nincs beállítva
            // Ha null, akkor még nem olvastuk el
            $table->timestamp('read_at')->nullable();
            
            // Válaszolás követése - nullable timestamp, mert kezdetben nincs beállítva
            // Ha null, akkor még nem válaszoltunk
            $table->timestamp('replied_at')->nullable();
            
            // Laravel automatikusan kezeli a created_at és updated_at mezőket
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incoming_emails');
    }
};
