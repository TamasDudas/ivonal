<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Új kapcsolatfelvételi üzenet</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }

        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            border-bottom: 2px solid #007bff;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }

        .header h1 {
            color: #007bff;
            margin: 0;
            font-size: 24px;
        }

        .info-section {
            margin-bottom: 25px;
        }

        .info-label {
            font-weight: bold;
            color: #555;
            margin-bottom: 5px;
            display: block;
        }

        .info-value {
            color: #333;
            padding: 10px;
            background-color: #f8f9fa;
            border-left: 3px solid #007bff;
            margin-top: 5px;
        }

        .message-section {
            margin-top: 30px;
        }

        .message-content {
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 4px;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #777;
            text-align: center;
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
