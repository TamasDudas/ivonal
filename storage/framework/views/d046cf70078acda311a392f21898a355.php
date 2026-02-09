<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>" class="<?php echo \Illuminate\Support\Arr::toCssClasses(['dark' => ($appearance ?? 'system') == 'dark']); ?>">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    
    <script>
        (function() {
            const appearance = '<?php echo e($appearance ?? 'system'); ?>';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    <title inertia><?php echo e($page['props']['seo']['title'] ?? config('app.name')); ?></title>

    
    <?php if(config('services.google.search_console_verification')): ?>
        <meta name="google-site-verification" content="<?php echo e(config('services.google.search_console_verification')); ?>" />
    <?php endif; ?>

    <?php if(config('services.google.analytics_id') && \Spatie\CookieConsent\CookieConsent::hasConsentedTo('optional')): ?>
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo e(config('services.google.analytics_id')); ?>"></script>
        <script>
            window.dataLayer = window.dataLayer || [];

            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', '<?php echo e(config('services.google.analytics_id')); ?>');
        </script>
    <?php endif; ?>

    <?php if(config('services.google.tag_manager_id')): ?>
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
            })(window, document, 'script', 'dataLayer', '<?php echo e(config('services.google.tag_manager_id')); ?>');
        </script>
        <!-- End Google Tag Manager -->
    <?php endif; ?>

    <?php if(isset($page['props']['seo'])): ?>
        <meta name="description" content="<?php echo e($page['props']['seo']['description'] ?? ''); ?>">
        <meta name="keywords" content="<?php echo e($page['props']['seo']['keywords'] ?? ''); ?>">
        <meta name="robots" content="<?php echo e($page['props']['seo']['robots'] ?? 'index, follow'); ?>">

        <?php if(isset($page['props']['seo']['canonical'])): ?>
            <link rel="canonical" href="<?php echo e($page['props']['seo']['canonical']); ?>">
        <?php endif; ?>

        <meta property="og:title"
            content="<?php echo e($page['props']['seo']['og_title'] ?? ($page['props']['seo']['title'] ?? '')); ?>">
        <meta property="og:description"
            content="<?php echo e($page['props']['seo']['og_description'] ?? ($page['props']['seo']['description'] ?? '')); ?>">
        <meta property="og:image" content="<?php echo e($page['props']['seo']['og_image'] ?? ''); ?>">
        <meta property="og:url" content="<?php echo e($page['props']['seo']['og_url'] ?? url()->current()); ?>">
        <meta property="og:type" content="<?php echo e($page['props']['seo']['og_type'] ?? 'website'); ?>">

        <meta name="twitter:card" content="<?php echo e($page['props']['seo']['twitter_card'] ?? 'summary_large_image'); ?>">
        <meta name="twitter:title"
            content="<?php echo e($page['props']['seo']['twitter_title'] ?? ($page['props']['seo']['title'] ?? '')); ?>">
        <meta name="twitter:description"
            content="<?php echo e($page['props']['seo']['twitter_description'] ?? ($page['props']['seo']['description'] ?? '')); ?>">
        <meta name="twitter:image"
            content="<?php echo e($page['props']['seo']['twitter_image'] ?? ($page['props']['seo']['og_image'] ?? '')); ?>">

        <?php if(isset($page['props']['seo']['schema'])): ?>
            <script type="application/ld+json"><?php echo json_encode($page['props']['seo']['schema']); ?></script>
        <?php endif; ?>
    <?php endif; ?>

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet" />

    
    <script>
        (function() {
            var correctUrl = "<?php echo e(config('app.url')); ?>";
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

    <?php echo app('Illuminate\Foundation\Vite')->reactRefresh(); ?>
    <?php echo app('Illuminate\Foundation\Vite')(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"]); ?>
    <?php if (!isset($__inertiaSsrDispatched)) { $__inertiaSsrDispatched = true; $__inertiaSsrResponse = app(\Inertia\Ssr\Gateway::class)->dispatch($page); }  if ($__inertiaSsrResponse) { echo $__inertiaSsrResponse->head; } ?>
</head>

<body class="font-sans antialiased">
    <?php if(config('services.google.tag_manager_id')): ?>
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe
                src="https://www.googletagmanager.com/ns.html?id=<?php echo e(config('services.google.tag_manager_id')); ?>"
                height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
    <?php endif; ?>

    <?php if (!isset($__inertiaSsrDispatched)) { $__inertiaSsrDispatched = true; $__inertiaSsrResponse = app(\Inertia\Ssr\Gateway::class)->dispatch($page); }  if ($__inertiaSsrResponse) { echo $__inertiaSsrResponse->body; } elseif (config('inertia.use_script_element_for_initial_page')) { ?><script data-page="app" type="application/json"><?php echo json_encode($page); ?></script><div id="app"></div><?php } else { ?><div id="app" data-page="<?php echo e(json_encode($page)); ?>"></div><?php } ?>

    <?php echo $__env->make('cookie-consent::index', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
</body>

</html>
<?php /**PATH C:\Users\Tamas\Desktop\ivonal\resources\views/app.blade.php ENDPATH**/ ?>