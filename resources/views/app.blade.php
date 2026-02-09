<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <style>
        html {
            background-color: oklch(0.2497 0.0305 234.1628);
        }
    </style>

    <title inertia>{{ $page['props']['seo']['title'] ?? config('app.name') }}</title>

    {{-- Google Services --}}
    @if (config('services.google.search_console_verification'))
        <meta name="google-site-verification" content="{{ config('services.google.search_console_verification') }}" />
    @endif

    @if (config('services.google.analytics_id') && \Spatie\CookieConsent\CookieConsent::hasConsentedTo('optional'))
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ config('services.google.analytics_id') }}"></script>
        <script>
            window.dataLayer = window.dataLayer || [];

            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', '{{ config('services.google.analytics_id') }}');
        </script>
    @endif

    @if (config('services.google.tag_manager_id'))
        <!-- Google Tag Manager -->
        <script>
            (function(w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({
                    'gtm.start': new Date().getTime(),
                    event: 'gtm.js'
                });
                var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', '{{ config('services.google.tag_manager_id') }}');
        </script>
        <!-- End Google Tag Manager -->
    @endif

    @if (isset($page['props']['seo']))
        <meta name="description" content="{{ $page['props']['seo']['description'] ?? '' }}">
        <meta name="keywords" content="{{ $page['props']['seo']['keywords'] ?? '' }}">
        <meta name="robots" content="{{ $page['props']['seo']['robots'] ?? 'index, follow' }}">

        @if (isset($page['props']['seo']['canonical']))
            <link rel="canonical" href="{{ $page['props']['seo']['canonical'] }}">
        @endif

        <meta property="og:title"
            content="{{ $page['props']['seo']['og_title'] ?? ($page['props']['seo']['title'] ?? '') }}">
        <meta property="og:description"
            content="{{ $page['props']['seo']['og_description'] ?? ($page['props']['seo']['description'] ?? '') }}">
        <meta property="og:image" content="{{ $page['props']['seo']['og_image'] ?? '' }}">
        <meta property="og:url" content="{{ $page['props']['seo']['og_url'] ?? url()->current() }}">
        <meta property="og:type" content="{{ $page['props']['seo']['og_type'] ?? 'website' }}">

        <meta name="twitter:card" content="{{ $page['props']['seo']['twitter_card'] ?? 'summary_large_image' }}">
        <meta name="twitter:title"
            content="{{ $page['props']['seo']['twitter_title'] ?? ($page['props']['seo']['title'] ?? '') }}">
        <meta name="twitter:description"
            content="{{ $page['props']['seo']['twitter_description'] ?? ($page['props']['seo']['description'] ?? '') }}">
        <meta name="twitter:image"
            content="{{ $page['props']['seo']['twitter_image'] ?? ($page['props']['seo']['og_image'] ?? '') }}">

        @if (isset($page['props']['seo']['schema']))
            <script type="application/ld+json">{!! json_encode($page['props']['seo']['schema']) !!}</script>
        @endif
    @endif

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet" />

    {{-- Override Ziggy URL from server config (temporary fix until rebuild) --}}
    <script>
        (function() {
            var correctUrl = "{{ config('app.url') }}";
            // Repeatedly check and patch Ziggy URL until it's set correctly
            var patchZiggy = function() {
                if (window.Ziggy && window.Ziggy.url !== correctUrl) {
                    window.Ziggy.url = correctUrl;
                    window.Ziggy.port = null;
                }
            };
            // Run immediately and on various events
            document.addEventListener('DOMContentLoaded', patchZiggy);
            setInterval(patchZiggy, 50);
            setTimeout(function() {
                clearInterval(patchZiggy);
            }, 3000);
        })();
    </script>

    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @if (config('services.google.tag_manager_id'))
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe
                src="https://www.googletagmanager.com/ns.html?id={{ config('services.google.tag_manager_id') }}"
                height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
    @endif

    @inertia

    @include('cookie-consent::index')
</body>

</html>
