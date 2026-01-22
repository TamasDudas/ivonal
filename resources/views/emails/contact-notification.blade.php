<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Új kapcsolatfelvételi üzenet</title>
    <style>
        /* Email kliensek támogatása - inline CSS és media query a dark mode-hoz */
        /* A projekt színeit használjuk: primary szín oklch(0.6209 0.1801 348.1385) - rózsaszín árnyalat */

        body {
            font-family: 'Playfair Display', Arial, sans-serif;
            line-height: 1.6;
            color: oklch(0.4712 0 0);
            /* --foreground light mode */
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: oklch(0.9399 0.0203 345.6985);
            /* --background light mode */
        }

        .container {
            background-color: oklch(0.9498 0.05 86.8891);
            /* --card light mode */
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            border-bottom: 2px solid oklch(0.6209 0.1801 348.1385);
            /* --primary light mode */
            padding-bottom: 20px;
            margin-bottom: 30px;
        }

        .header h1 {
            color: oklch(0.6209 0.1801 348.1385);
            /* --primary light mode */
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }

        .info-section {
            margin-bottom: 25px;
        }

        .info-label {
            font-weight: bold;
            color: oklch(0.5795 0 0);
            /* --muted-foreground light mode */
            margin-bottom: 5px;
            display: block;
        }

        .info-value {
            color: oklch(0.4712 0 0);
            /* --foreground light mode */
            padding: 10px;
            background-color: oklch(0.88 0.0504 212.0952);
            /* --muted light mode */
            border-left: 3px solid oklch(0.6209 0.1801 348.1385);
            /* --primary light mode */
            margin-top: 5px;
            border-radius: 4px;
        }

        .message-section {
            margin-top: 30px;
        }

        .message-content {
            padding: 15px;
            background-color: oklch(0.88 0.0504 212.0952);
            /* --muted light mode */
            border-radius: 4px;
            white-space: pre-wrap;
            word-wrap: break-word;
            color: oklch(0.4712 0 0);
            /* --foreground light mode */
        }

        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid oklch(0.6209 0.1801 348.1385);
            /* --border light mode */
            font-size: 12px;
            color: oklch(0.5795 0 0);
            /* --muted-foreground light mode */
            text-align: center;
        }

        /* Dark mode támogatás - email kliensek, amelyek támogatják a prefers-color-scheme media query-t */
        @media (prefers-color-scheme: dark) {
            body {
                background-color: oklch(0.2497 0.0305 234.1628);
                /* --background dark mode */
                color: oklch(0.9306 0.0197 349.0785);
                /* --foreground dark mode */
            }

            .container {
                background-color: oklch(0.2902 0.0299 233.5352);
                /* --card dark mode */
            }

            .header {
                border-bottom-color: oklch(0.9195 0.0801 87.667);
                /* --primary dark mode */
            }

            .header h1 {
                color: oklch(0.9195 0.0801 87.667);
                /* --primary dark mode */
            }

            .info-label {
                color: oklch(0.7794 0.0803 4.133);
                /* --muted-foreground dark mode */
            }

            .info-value {
                background-color: oklch(0.2713 0.0086 255.578);
                /* --muted dark mode */
                border-left-color: oklch(0.9195 0.0801 87.667);
                /* --primary dark mode */
                color: oklch(0.9306 0.0197 349.0785);
                /* --foreground dark mode */
            }

            .message-content {
                background-color: oklch(0.2713 0.0086 255.578);
                /* --muted dark mode */
                color: oklch(0.9306 0.0197 349.0785);
                /* --foreground dark mode */
            }

            .footer {
                border-top-color: oklch(0.3907 0.0399 242.2181);
                /* --border dark mode */
                color: oklch(0.7794 0.0803 4.133);
                /* --muted-foreground dark mode */
            }
        }

        /* Fallback színek olyan email kliensekhez, amelyek nem támogatják az oklch színeket */
        @supports not (color: oklch(0 0 0)) {
            body {
                background-color: #f0f0f0;
                color: #333333;
            }

            .container {
                background-color: #ffffff;
            }

            .header {
                border-bottom-color: #d81b60;
                /* rózsaszín árnyalat */
            }

            .header h1 {
                color: #d81b60;
            }

            .info-label {
                color: #666666;
            }

            .info-value {
                background-color: #f5f5f5;
                border-left-color: #d81b60;
                color: #333333;
            }

            .message-content {
                background-color: #f5f5f5;
                color: #333333;
            }

            .footer {
                border-top-color: #d81b60;
                color: #666666;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Új kapcsolatfelvételi üzenet</h1>
        </div>

        <div class="info-section">
            <span class="info-label">Feladó neve:</span>
            <div class="info-value">{{ $incomingEmail->name }}</div>
        </div>

        <div class="info-section">
            <span class="info-label">Email cím:</span>
            <div class="info-value">{{ $incomingEmail->email }}</div>
        </div>

        @if ($incomingEmail->phone)
            <div class="info-section">
                <span class="info-label">Telefonszám:</span>
                <div class="info-value">{{ $incomingEmail->phone }}</div>
            </div>
        @endif

        <div class="info-section">
            <span class="info-label">Tárgy:</span>
            <div class="info-value">{{ $incomingEmail->subject }}</div>
        </div>

        <div class="message-section">
            <span class="info-label">Üzenet:</span>
            <div class="message-content">{{ $incomingEmail->message }}</div>
        </div>

        <div class="footer">
            <p>Ez az email automatikusan generálva lett a kapcsolatfelvételi űrlapból.</p>
            <p>Küldés ideje: {{ $incomingEmail->created_at->format('Y-m-d H:i:s') }}</p>
        </div>
    </div>
</body>

</html>
