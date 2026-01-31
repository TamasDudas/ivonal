# Laravel + React + Inertia SEO Útmutató

## Bevezető

Ez az útmutató bemutatja, hogyan optimalizálhatod SEO szempontból a Laravel + React + Inertia alkalmazásodat **Node.js nélkül**, tisztán PHP alapú tárhelyen.

---

## 1. Frontend - app.blade.php (Inertia root template)

**Fájl:** `resources/views/app.blade.php`

```php
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    {{-- SEO Meta tagek a backend-ről --}}
    @if(isset($page['props']['seo']))
        <title>{{ $page['props']['seo']['title'] ?? 'Ingatlanvonal' }}</title>
        <meta name="description" content="{{ $page['props']['seo']['description'] ?? '' }}">
        <meta name="keywords" content="{{ $page['props']['seo']['keywords'] ?? '' }}">
        <meta name="robots" content="{{ $page['props']['seo']['robots'] ?? 'index, follow' }}">
        <link rel="canonical" href="{{ $page['props']['seo']['canonical'] ?? url()->current() }}">
        
        {{-- Open Graph --}}
        <meta property="og:title" content="{{ $page['props']['seo']['og_title'] ?? $page['props']['seo']['title'] ?? '' }}">
        <meta property="og:description" content="{{ $page['props']['seo']['og_description'] ?? $page['props']['seo']['description'] ?? '' }}">
        <meta property="og:image" content="{{ $page['props']['seo']['og_image'] ?? '' }}">
        <meta property="og:url" content="{{ $page['props']['seo']['og_url'] ?? url()->current() }}">
        <meta property="og:type" content="{{ $page['props']['seo']['og_type'] ?? 'website' }}">
        <meta property="og:locale" content="hu_HU">
        
        {{-- Twitter Card --}}
        <meta name="twitter:card" content="{{ $page['props']['seo']['twitter_card'] ?? 'summary_large_image' }}">
        <meta name="twitter:title" content="{{ $page['props']['seo']['twitter_title'] ?? $page['props']['seo']['title'] ?? '' }}">
        <meta name="twitter:description" content="{{ $page['props']['seo']['twitter_description'] ?? $page['props']['seo']['description'] ?? '' }}">
        <meta name="twitter:image" content="{{ $page['props']['seo']['twitter_image'] ?? $page['props']['seo']['og_image'] ?? '' }}">
        
        {{-- Structured Data (JSON-LD) --}}
        @if(isset($page['props']['seo']['schema']))
            <script type="application/ld+json">
                {!! json_encode($page['props']['seo']['schema'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}
            </script>
        @endif
    @else
        <title>Ingatlanvonal</title>
    @endif
    
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
```

---

## 2. SEO Helper Service (DRY principle)

**Fájl:** `app/Services/SeoService.php`

```php
<?php

namespace App\Services;

class SeoService
{
    /**
     * Generál SEO meta adatokat
     */
    public static function generate(array $data = []): array
    {
        $defaults = [
            'title' => 'Ingatlanvonal',
            'description' => '',
            'keywords' => '',
            'robots' => 'index, follow',
            'canonical' => url()->current(),
        ];

        $seo = array_merge($defaults, $data);

        // Open Graph defaults
        $seo['og_title'] = $seo['og_title'] ?? $seo['title'];
        $seo['og_description'] = $seo['og_description'] ?? $seo['description'];
        $seo['og_url'] = $seo['og_url'] ?? $seo['canonical'];
        $seo['og_type'] = $seo['og_type'] ?? 'website';
        $seo['og_image'] = $seo['og_image'] ?? asset('storage/default-og-image.jpg');

        // Twitter Card defaults
        $seo['twitter_card'] = $seo['twitter_card'] ?? 'summary_large_image';
        $seo['twitter_title'] = $seo['twitter_title'] ?? $seo['title'];
        $seo['twitter_description'] = $seo['twitter_description'] ?? $seo['description'];
        $seo['twitter_image'] = $seo['twitter_image'] ?? $seo['og_image'];

        return $seo;
    }

    /**
     * Szervezet (Organization) Schema.org structured data
     */
    public static function organizationSchema(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => 'Ingatlanvonal',
            'url' => url('/'),
            'logo' => asset('storage/logo.png'),
            'description' => 'Kiadó és eladó ingatlanok Budapesten és Szegeden',
            'address' => [
                '@type' => 'PostalAddress',
                'addressCountry' => 'HU',
            ],
        ];
    }

    /**
     * Ingatlan (RealEstateListing) Schema.org structured data
     */
    public static function propertySchema($property): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'RealEstateListing',
            'name' => $property->title,
            'description' => $property->description,
            'url' => route('property.show', $property->slug),
            'image' => $property->featuredImage?->url,
            'offers' => [
                '@type' => 'Offer',
                'price' => $property->price,
                'priceCurrency' => 'HUF',
                'availability' => 'https://schema.org/InStock',
            ],
            'address' => [
                '@type' => 'PostalAddress',
                'addressLocality' => $property->city?->name,
                'addressCountry' => 'HU',
            ],
        ];
    }

    /**
     * Breadcrumb (BreadcrumbList) Schema.org structured data
     */
    public static function breadcrumbSchema(array $items): array
    {
        $listItems = [];
        
        foreach ($items as $position => $item) {
            $listItems[] = [
                '@type' => 'ListItem',
                'position' => $position + 1,
                'name' => $item['name'],
                'item' => $item['url'],
            ];
        }

        return [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => $listItems,
        ];
    }
}
```

---

## 3. Refaktorált Controller példák

**Fájl:** `app/Http/Controllers/HomeController.php`

```php
<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Http\Resources\CityResource;
use App\Services\SeoService;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $cities = City::with('featuredImage')
            ->latest()
            ->get();

        return Inertia::render('Home', [
            'cities' => CityResource::collection($cities),
            'seo' => SeoService::generate([
                'title' => 'Ingatlanvonal - Kiadó ingatlanok Budapesten és Szegeden',
                'description' => 'Weboldalunkon baráti társaság által kínált kiadó és eladó lakóingatlanokat talál Budapesten és Szegeden. Személyes szolgáltatás, széles választék.',
                'keywords' => 'kiadó ingatlanok, Budapest, Szeged, lakás, bérlés, eladó ingatlanok',
                'schema' => SeoService::organizationSchema(),
            ]),
        ]);
    }
}
```

**Fájl:** `app/Http/Controllers/PropertyController.php`

```php
<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Http\Resources\PropertyResource;
use App\Services\SeoService;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PropertyController extends Controller
{
    public function show(Property $property)
    {
        return Inertia::render('PropertyShow', [
            'property' => new PropertyResource($property),
            'seo' => SeoService::generate([
                'title' => $property->title . ' - Ingatlanvonal',
                'description' => Str::limit($property->description, 155),
                'keywords' => implode(', ', [
                    $property->city?->name, 
                    $property->type, 
                    'kiadó', 
                    'ingatlan'
                ]),
                'canonical' => route('property.show', $property->slug),
                'og_image' => $property->featuredImage?->url,
                'og_type' => 'article',
                'schema' => SeoService::propertySchema($property),
            ]),
        ]);
    }

    public function index()
    {
        $properties = Property::with(['city', 'featuredImage'])
            ->where('is_published', true)
            ->latest()
            ->paginate(12);

        return Inertia::render('PropertyIndex', [
            'properties' => PropertyResource::collection($properties),
            'seo' => SeoService::generate([
                'title' => 'Összes ingatlan - Ingatlanvonal',
                'description' => 'Böngésszen kiadó és eladó ingatlanjaink között Budapesten és Szegeden.',
                'keywords' => 'ingatlanok, lakások, kiadó, eladó',
            ]),
        ]);
    }
}
```

**Fájl:** `app/Http/Controllers/CityController.php`

```php
<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Http\Resources\PropertyResource;
use App\Services\SeoService;
use Inertia\Inertia;

class CityController extends Controller
{
    public function show(City $city)
    {
        $properties = $city->properties()
            ->with('featuredImage')
            ->where('is_published', true)
            ->latest()
            ->paginate(12);

        return Inertia::render('CityShow', [
            'city' => $city,
            'properties' => PropertyResource::collection($properties),
            'seo' => SeoService::generate([
                'title' => "Ingatlanok {$city->name}n - Ingatlanvonal",
                'description' => "Kiadó és eladó ingatlanok {$city->name}n. Böngésszen ajánlataink között!",
                'keywords' => "{$city->name}, ingatlan, kiadó, eladó, lakás",
                'canonical' => route('city.show', $city->slug),
            ]),
        ]);
    }
}
```

---

## 4. React komponens példák (opcionális dinamikus update)

**Fájl:** `resources/js/Pages/Home.jsx`

```jsx
import { Head } from '@inertiajs/react';

export default function Home({ cities, seo }) {
    return (
        <>
            <Head>
                {/* Ez felülírja a backend meta tageket, ha szükséges */}
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
            </Head>
            
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold my-8">
                    Kiadó ingatlanok
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cities.map(city => (
                        <div key={city.id} className="card">
                            <h2>{city.name}</h2>
                            {/* ... */}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
```

**Fájl:** `resources/js/Pages/PropertyShow.jsx`

```jsx
import { Head } from '@inertiajs/react';

export default function PropertyShow({ property, seo }) {
    return (
        <>
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
            </Head>
            
            <article className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-4">
                    {property.title}
                </h1>
                
                <img 
                    src={property.featured_image?.url} 
                    alt={property.title}
                    className="w-full h-96 object-cover rounded-lg mb-6"
                />
                
                <div className="prose max-w-none">
                    <p>{property.description}</p>
                </div>
                
                {/* ... további részletek */}
            </article>
        </>
    );
}
```

---

## 5. Sitemap generálás

**Fájl:** `routes/web.php`

```php
use App\Http\Controllers\SitemapController;

Route::get('sitemap.xml', [SitemapController::class, 'index']);
```

**Fájl:** `app/Http/Controllers/SitemapController.php`

```php
<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\City;

class SitemapController extends Controller
{
    public function index()
    {
        $properties = Property::where('is_published', true)
            ->latest('updated_at')
            ->get();
        
        $cities = City::all();

        return response()->view('sitemap', [
            'properties' => $properties,
            'cities' => $cities,
        ])->header('Content-Type', 'text/xml');
    }
}
```

**Fájl:** `resources/views/sitemap.blade.php`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Főoldal -->
    <url>
        <loc>{{ url('/') }}</loc>
        <lastmod>{{ now()->toAtomString() }}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    
    <!-- Városok -->
    @foreach($cities as $city)
    <url>
        <loc>{{ route('city.show', $city->slug) }}</loc>
        <lastmod>{{ $city->updated_at->toAtomString() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    @endforeach
    
    <!-- Ingatlanok -->
    @foreach($properties as $property)
    <url>
        <loc>{{ route('property.show', $property->slug) }}</loc>
        <lastmod>{{ $property->updated_at->toAtomString() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    @endforeach
</urlset>
```

---

## 6. robots.txt

**Fájl:** `public/robots.txt`

```txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /dashboard
Disallow: /api

Sitemap: https://yourdomain.com/sitemap.xml
```

---

## 7. Kiegészítő SEO javítások

### 7.1 URL slug generálás

**Fájl:** `app/Models/Property.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Property extends Model
{
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($property) {
            if (empty($property->slug)) {
                $property->slug = Str::slug($property->title);
            }
        });

        static::updating(function ($property) {
            if ($property->isDirty('title') && empty($property->slug)) {
                $property->slug = Str::slug($property->title);
            }
        });
    }
}
```

### 7.2 Image optimization helper

**Fájl:** `app/Services/ImageService.php`

```php
<?php

namespace App\Services;

use Intervention\Image\Facades\Image;

class ImageService
{
    /**
     * Optimalizálja a képet SEO és teljesítmény szempontjából
     */
    public static function optimizeForWeb($imagePath, $width = 1200, $quality = 85)
    {
        $image = Image::make($imagePath);
        
        // Arány megtartásával átméretezés
        $image->resize($width, null, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });
        
        // Minőség beállítása
        $image->save(null, $quality);
        
        return $image;
    }

    /**
     * Generál thumbnail-t OG image-hez
     */
    public static function generateOgImage($imagePath, $width = 1200, $height = 630)
    {
        $image = Image::make($imagePath);
        
        $image->fit($width, $height);
        
        return $image;
    }
}
```

### 7.3 Google Search Console integráció

**Fájl:** `resources/views/app.blade.php` (head részbe)

```php
<!-- Google Search Console verification -->
<meta name="google-site-verification" content="your-verification-code" />

<!-- Google Analytics (opcionális) -->
@if(config('services.google.analytics_id'))
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id={{ config('services.google.analytics_id') }}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '{{ config('services.google.analytics_id') }}');
    </script>
@endif
```

---

## 8. Teljesítmény optimalizáció

### 8.1 Lazy loading képekhez

**React komponensben:**

```jsx
<img 
    src={property.image_url} 
    alt={property.title}
    loading="lazy"
    decoding="async"
/>
```

### 8.2 Database indexek

**Migration példa:**

```php
Schema::table('properties', function (Blueprint $table) {
    $table->index('slug');
    $table->index('is_published');
    $table->index(['city_id', 'is_published']);
    $table->index('created_at');
});
```

---

## 9. Checklist - Mit implementáltunk?

- ✅ Server-side meta tagek (title, description, keywords)
- ✅ Open Graph tagek (Facebook, LinkedIn megosztásokhoz)
- ✅ Twitter Card tagek
- ✅ Canonical URL-ek
- ✅ Structured Data (JSON-LD) - Organization, RealEstateListing
- ✅ Sitemap.xml generálás
- ✅ robots.txt
- ✅ SEO-barát URL slug-ok
- ✅ Image optimization
- ✅ Lazy loading
- ✅ Database indexelés

---

## 10. Következő lépések

1. **Google Search Console regisztráció**
   - Weboldal hozzáadása
   - Sitemap beküldése
   - Index kérése új oldalakhoz

2. **Google Analytics beállítása**
   - Tracking code telepítése
   - Konverziók követése

3. **Schema.org bővítése**
   - FAQ schema
   - Review/Rating schema (ha van értékelés)

4. **Teljesítmény ellenőrzés**
   - Google PageSpeed Insights
   - Lighthouse audit
   - Core Web Vitals optimalizálás

5. **Tartalmi SEO**
   - Kulcsszó kutatás
   - Meta description optimalizálás
   - Alt szövegek minden képhez
   - Belső linkek építése

---

## Összefoglalás

Ez a megoldás **Node.js nélkül is tökéletesen működik**, mert:

- ✅ A meta tagek server-side rendereltek (Blade template)
- ✅ A Google és más botok látják az összes SEO információt
- ✅ Structured data JSON-LD formátumban
- ✅ Sitemap automatikusan generálódik
- ✅ Tisztán PHP alapú megoldás

Az egyetlen dolog, amit a botok nem látnak, az a JavaScript által renderelt tartalom, de ez nem probléma, mert:
- A fontos SEO elemek (meta tagek, structured data) server-side vannak
- A szöveges tartalom indexelhető
- A képek megfelelő alt szöveggel vannak ellátva

**Sikeres SEO-zást! 🚀**
