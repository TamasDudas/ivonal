# SEO Implementáció Általános Útmutató - Laravel + Inertia.js

**Utolsó frissítés:** 2026. január 31.  
**Technológia:** Laravel + React + Inertia (PHP-only, SSR nélkül)  
**Projektfüggetlen:** ✅ Használható bármilyen Laravel + Inertia projektnél

> 💡 **Ez az útmutató általános SEO implementációs sablon.** Adaptáld a projekt igényeihez (webshop, blog, portfólió, ingatlan, fotós oldal, stb.)

---

## 🔍 Teljes SEO Implementáció Áttekintése

### **1. Biztonság - XSS védelem (DOMPurify)**

- **Probléma**: `dangerouslySetInnerHTML` használata XSS kockázatot jelent
- **Megoldás**: DOMPurify telepítése és használata HTML tartalmak tisztítására
- **Telepítés**:
  ```bash
  npm install dompurify
  npm install --save-dev @types/dompurify
  ```
- **Használat példa**:

  ```tsx
  import DOMPurify from 'dompurify';

  // Használat bármilyen HTML tartalomnál (leírások, blog posztok, stb.)
  <div
   dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlContent) }}
  ></div>;
  ```

- **Alkalmazható**: Blog posztok, termékleírások, oldal tartalmak, stb.

---

### **2. Server-side SEO Meta Tagek**

- **Fájl**: `resources/views/app.blade.php`
- **Tartalom**:
  - `<title>`, `<meta description>`, `<meta keywords>`
  - `<link rel="canonical">`
  - Open Graph tagek (Facebook/LinkedIn megosztásokhoz)
  - Twitter Card tagek
  - JSON-LD Structured Data (Schema.org)

**Miért server-side?**

- Inertia.js `<Head>` komponens csak SSR-rel működik teljesen
- PHP-only tárhelyen nincs Node.js
- Google és más botok látják a meta tageket az oldal forrásában

**Hogyan működik?**

- Controller-ben `SeoService::generate()` metódus használata
- Blade template beolvassa a `$page['props']['seo']` tömböt
- Meta tagek server-side rendereltek a `<head>`-ben

---

### **3. SEO Helper Osztály (DRY principle)**

- **Fájl**: `app/Services/SeoService.php`
- **Metódusok**:

#### `generate(array $data = []): array`

Meta adatok generálása alapértelmezésekkel:

```php
SeoService::generate([
    'title' => 'Oldal címe',
    'description' => 'Oldal leírása...',
    'keywords' => 'kulcsszó1, kulcsszó2',
    'canonical' => route('route.name'),
    'og_image' => $imageUrl,
    'schema' => [...], // JSON-LD structured data (lásd Schema.org példák lent)
])
```

**Példák különböző projektekhez:**

```php
// Blog oldal
SeoService::generate([
    'title' => $post->title . ' | Blog Név',
    'description' => Str::limit(strip_tags($post->content), 155),
    'keywords' => implode(', ', $post->tags->pluck('name')->toArray()),
    'canonical' => route('posts.show', $post->slug),
    'og_image' => $post->featured_image,
    'schema' => SeoService::articleSchema($post),
]);

// Webshop termék
SeoService::generate([
    'title' => $product->name . ' | Webshop Név',
    'description' => $product->short_description,
    'keywords' => $product->category->name . ', ' . $product->brand,
    'canonical' => route('products.show', $product->slug),
    'og_image' => $product->main_image,
    'schema' => SeoService::productSchema($product),
]);

// Portfólió projekt
SeoService::generate([
    'title' => $project->title . ' | Portfolio',
    'description' => $project->description,
    'keywords' => implode(', ', $project->technologies),
    'canonical' => route('portfolio.show', $project->slug),
    'og_image' => $project->thumbnail,
    'schema' => SeoService::creativeWorkSchema($project),
]);
```

#### `organizationSchema(): array`

Szervezeti/vállalati adatok (Schema.org Organization):

```php
'schema' => SeoService::organizationSchema()
```

#### `itemListSchema(string $name, string $description, string $url, array $items): array`

Lista structured data (Schema.org ItemList) - termékek, blogok, projektek, stb.:

```php
// Általános példa
'schema' => SeoService::itemListSchema(
    "Lista címe",
    "Lista leírása",
    route('items.index'),
    $itemListElements
)
```

#### `breadcrumbSchema(array $items): array`

Morzsamenü navigációhoz:

```php
'schema' => SeoService::breadcrumbSchema([
    ['name' => 'Főoldal', 'url' => route('home')],
    ['name' => 'Kategória', 'url' => route('category.show', $category)],
    ['name' => $item->name, 'url' => route('item.show', $item)],
])
```

---

### **Schema.org Típusok Kibővítése** (Projektfüggő)

Az alábbi metódusokat add hozzá az `SeoService.php`-hez igény szerint:

#### `articleSchema()` - Blog/Hír cikkekhez

```php
public static function articleSchema(object $article): array
{
    return [
        '@context' => 'https://schema.org',
        '@type' => 'Article',
        'headline' => $article->title,
        'description' => Str::limit(strip_tags($article->content), 200),
        'image' => $article->featured_image,
        'datePublished' => $article->published_at->toIso8601String(),
        'dateModified' => $article->updated_at->toIso8601String(),
        'author' => [
            '@type' => 'Person',
            'name' => $article->author->name,
        ],
        'publisher' => [
            '@type' => 'Organization',
            'name' => config('app.name'),
            'logo' => [
                '@type' => 'ImageObject',
                'url' => asset('images/logo.png'),
            ],
        ],
    ];
}
```

#### `productSchema()` - Webshop termékekhez

```php
public static function productSchema(object $product): array
{
    return [
        '@context' => 'https://schema.org',
        '@type' => 'Product',
        'name' => $product->name,
        'description' => $product->description,
        'image' => $product->images->pluck('url')->toArray(),
        'sku' => $product->sku,
        'brand' => [
            '@type' => 'Brand',
            'name' => $product->brand,
        ],
        'offers' => [
            '@type' => 'Offer',
            'url' => route('products.show', $product->slug),
            'priceCurrency' => 'HUF',
            'price' => $product->price,
            'availability' => $product->in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            'priceValidUntil' => now()->addYear()->toIso8601String(),
        ],
        'aggregateRating' => $product->reviews_count > 0 ? [
            '@type' => 'AggregateRating',
            'ratingValue' => $product->average_rating,
            'reviewCount' => $product->reviews_count,
        ] : null,
    ];
}
```

#### `localBusinessSchema()` - Helyi vállalkozásokhoz

```php
public static function localBusinessSchema(): array
{
    return [
        '@context' => 'https://schema.org',
        '@type' => 'LocalBusiness', // vagy Restaurant, Store, Bakery, stb.
        'name' => config('app.name'),
        'image' => asset('images/business-photo.jpg'),
        'address' => [
            '@type' => 'PostalAddress',
            'streetAddress' => 'Utca 123',
            'addressLocality' => 'Budapest',
            'postalCode' => '1234',
            'addressCountry' => 'HU',
        ],
        'geo' => [
            '@type' => 'GeoCoordinates',
            'latitude' => 47.4979,
            'longitude' => 19.0402,
        ],
        'telephone' => '+36 1 234 5678',
        'openingHoursSpecification' => [
            '@type' => 'OpeningHoursSpecification',
            'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            'opens' => '09:00',
            'closes' => '17:00',
        ],
    ];
}
```

#### `eventSchema()` - Eseményekhez (koncertek, konferenciák, stb.)

```php
public static function eventSchema(object $event): array
{
    return [
        '@context' => 'https://schema.org',
        '@type' => 'Event',
        'name' => $event->name,
        'description' => $event->description,
        'image' => $event->poster_image,
        'startDate' => $event->starts_at->toIso8601String(),
        'endDate' => $event->ends_at->toIso8601String(),
        'eventStatus' => 'https://schema.org/EventScheduled',
        'eventAttendanceMode' => 'https://schema.org/OfflineEventAttendanceMode',
        'location' => [
            '@type' => 'Place',
            'name' => $event->venue_name,
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => $event->venue_address,
                'addressLocality' => $event->city,
                'addressCountry' => 'HU',
            ],
        ],
        'offers' => [
            '@type' => 'Offer',
            'url' => route('events.show', $event->slug),
            'price' => $event->ticket_price,
            'priceCurrency' => 'HUF',
            'availability' => 'https://schema.org/InStock',
        ],
    ];
}
```

#### `creativeWorkSchema()` - Portfólió projektekhez

```php
public static function creativeWorkSchema(object $project): array
{
    return [
        '@context' => 'https://schema.org',
        '@type' => 'CreativeWork',
        'name' => $project->title,
        'description' => $project->description,
        'image' => $project->thumbnail,
        'url' => route('portfolio.show', $project->slug),
        'creator' => [
            '@type' => 'Person',
            'name' => config('app.name'),
        ],
        'keywords' => implode(', ', $project->technologies ?? []),
    ];
}
```

#### `faqSchema()` - GYIK oldalakhoz

```php
public static function faqSchema(array $faqs): array
{
    $mainEntity = [];
    foreach ($faqs as $faq) {
        $mainEntity[] = [
            '@type' => 'Question',
            'name' => $faq['question'],
            'acceptedAnswer' => [
                '@type' => 'Answer',
                'text' => $faq['answer'],
            ],
        ];
    }

    return [
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        'mainEntity' => $mainEntity,
    ];
}
```

---

### **4. Controller SEO Implementációk - Általános Minták**

> 💡 **Adaptáld az alábbi mintákat a projekted igényeihez!** Cseréld ki a model neveket, mezőket, route-okat.

---

#### **Főoldal SEO**

```php
// HomeController.php vagy hasonló
public function index()
{
    return Inertia::render('home', [
        'data' => $someData,
        'seo' => SeoService::generate([
            'title' => config('app.name') . ' - Rövid tagline',
            'description' => 'Az oldal fő leírása. Maximum 155 karakter ajánlott.',
            'keywords' => 'főbb kulcsszavak, témák, szolgáltatások',
            'canonical' => route('home'),
            'schema' => SeoService::organizationSchema(),
        ]),
    ]);
}
```

---

#### **Lista oldal SEO (Blog, Termékek, Portfólió, stb.)**

```php
// Példa: BlogController.php, ProductController.php, PortfolioController.php
public function index()
{
    $items = Item::latest()->paginate(12); // Termék/Blog/Project model

    return Inertia::render('items/index', [
        'items' => ItemResource::collection($items),
        'seo' => SeoService::generate([
            'title' => 'Összes [Termék/Blog/Projekt] | ' . config('app.name'),
            'description' => 'Böngéssz a [termékek/cikkek/projektek] között...',
            'keywords' => '[kategória], [típus], [brand]',
            'canonical' => route('items.index'),
            'schema' => SeoService::itemListSchema(
                'Összes [téma]',
                'Lista leírása',
                route('items.index'),
                $items->map(fn($item, $index) => [
                    '@type' => 'ListItem',
                    'position' => $index + 1,
                    'url' => route('items.show', $item->slug),
                ])->toArray()
            ),
        ]),
    ]);
}
```

---

#### **Kategóriás/Szűrt lista SEO**

```php
// Példa kategória szerinti szűrés
public function byCategory(Category $category)
{
    $items = $category->items()->latest()->paginate(12);

    return Inertia::render('items/by-category', [
        'category' => new CategoryResource($category),
        'items' => ItemResource::collection($items),
        'seo' => SeoService::generate([
            'title' => "{$category->name} - Összes [téma] | " . config('app.name'),
            'description' => "Fedezd fel a(z) {$category->name} kategória [termékeit/cikkeit]...",
            'keywords' => "{$category->name}, [további kulcsszavak]",
            'canonical' => route('items.by-category', $category->slug),
            'og_image' => $category->image ?? asset('images/default-og.jpg'),
        ]),
    ]);
}
```

---

#### **Részletes oldal SEO (Termék/Blog/Portfólió elem)**

**Blog cikk példa:**

```php
// PostController.php
public function show(Post $post)
{
    return Inertia::render('posts/show', [
        'post' => new PostResource($post),
        'seo' => SeoService::generate([
            'title' => $post->title . ' | Blog',
            'description' => Str::limit(strip_tags($post->content), 155),
            'keywords' => implode(', ', $post->tags->pluck('name')->toArray()),
            'canonical' => route('posts.show', $post->slug),
            'og_image' => $post->featured_image,
            'schema' => SeoService::articleSchema($post),
        ]),
    ]);
}
```

**Webshop termék példa:**

```php
// ProductController.php
public function show(Product $product)
{
    return Inertia::render('products/show', [
        'product' => new ProductResource($product),
        'seo' => SeoService::generate([
            'title' => "{$product->name} | Webshop",
            'description' => $product->short_description,
            'keywords' => "{$product->category->name}, {$product->brand}, {$product->name}",
            'canonical' => route('products.show', $product->slug),
            'og_image' => $product->main_image,
            'schema' => SeoService::productSchema($product),
        ]),
    ]);
}
```

**Fotós portfólió projekt példa:**

```php
// PortfolioController.php
public function show(Project $project)
{
    return Inertia::render('portfolio/show', [
        'project' => new ProjectResource($project),
        'seo' => SeoService::generate([
            'title' => "{$project->title} - Portfolio",
            'description' => $project->description,
            'keywords' => implode(', ', $project->tags ?? []),
            'canonical' => route('portfolio.show', $project->slug),
            'og_image' => $project->cover_image,
            'schema' => SeoService::creativeWorkSchema($project),
        ]),
    ]);
}
```

---

#### **Statikus oldalak SEO (About, Contact, stb.)**

```php
public function about()
{
    return Inertia::render('about', [
        'seo' => SeoService::generate([
            'title' => 'Rólunk | ' . config('app.name'),
            'description' => 'Ismerd meg a csapatunkat és történetünket...',
            'keywords' => 'rólunk, csapat, történet',
            'canonical' => route('about'),
        ]),
    ]);
}

public function contact()
{
    return Inertia::render('contact', [
        'seo' => SeoService::generate([
            'title' => 'Kapcsolat | ' . config('app.name'),
            'description' => 'Lépj kapcsolatba velünk! Email, telefon, cím.',
            'keywords' => 'kapcsolat, elérhetőség, email',
            'canonical' => route('contact'),
            'schema' => SeoService::localBusinessSchema(), // Ha releváns
        ]),
    ]);
}
```

---

### **5. Sitemap.xml Generálás**

- **Controller**: `app/Http/Controllers/SitemapController.php`
- **Template**: `resources/views/sitemap.blade.php`
- **Route**: `routes/web.php` → `Route::get('sitemap.xml', [SitemapController::class, 'index']);`

**Sitemap tartalma (adaptáld a projekthez):**

- Főoldal (priority: 1.0, changefreq: daily)
- Fő kategóriák/oldalak (priority: 0.8, changefreq: weekly)
- Tartalom elemek (termékek/blogok/projektek) (priority: 0.6-0.9, changefreq: weekly/monthly)
- Statikus oldalak (About, Contact) (priority: 0.5, changefreq: monthly)

**Példa sitemap template (Blade):**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    {{-- Főoldal --}}
    <url>
        <loc>{{ url('/') }}</loc>
        <lastmod>{{ now()->toIso8601String() }}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>

    {{-- Kategóriák/Városok/Témák --}}
    @foreach($categories as $category)
    <url>
        <loc>{{ route('category.show', $category->slug) }}</loc>
        <lastmod>{{ $category->updated_at->toIso8601String() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    @endforeach

    {{-- Tartalom elemek (Termékek/Blogok/Projektek) --}}
    @foreach($items as $item)
    <url>
        <loc>{{ route('items.show', $item->slug) }}</loc>
        <lastmod>{{ $item->updated_at->toIso8601String() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>
    @endforeach

    {{-- Statikus oldalak --}}
    <url>
        <loc>{{ route('about') }}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>
</urlset>
```

**SitemapController példa:**

```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SitemapController extends Controller
{
    public function index()
    {
        // Adaptáld a modelljeidhez
        $categories = Category::all(); // vagy City, Tag, stb.
        $items = Item::all(); // vagy Product, Post, Project, stb.

        return response()->view('sitemap', [
            'categories' => $categories,
            'items' => $items,
        ])->header('Content-Type', 'text/xml');
    }
}
```

**Tesztelés**: `https://yourdomain.com/sitemap.xml`

---

### **6. robots.txt Optimalizálás**

- **Fájl**: `public/robots.txt`
- **Tartalom**:

  ```txt
  User-agent: *
  Allow: /
  Disallow: /admin
  Disallow: /dashboard
  Disallow: /api

  Sitemap: https://ingatlanvonal.hu/sitemap.xml
  ```

---

### **7. Lazy Loading Képekhez**

**Mit csinál?**

- Képek csak akkor töltődnek be, amikor a látótérbe kerülnek
- Javítja az oldal betöltési sebességét
- Csökkenti a sávszélesség-használatot

**Implementáció:**
Minden `<img>` taghez hozzáadva:

```tsx
<img
 src={image}
 alt="Leírás"
 loading="lazy" // vagy "eager" a fold above képeknél
 decoding="async"
/>
```

**Fájlok:**

- `resources/js/pages/home.tsx` - Főoldal (fő kép: eager, város képek: lazy)
- `resources/js/pages/city/cities.tsx` - Város listázás (lazy)
- `resources/js/pages/property/property.tsx` - Ingatlan részletek (featured: eager)
- `resources/js/pages/property/properties-by-city.tsx` - Ingatlanok városonként (lazy)
- `resources/js/components/property/property-gallery.tsx` - Galéria thumbnailek (lazy)

**Különbség:**

- `loading="eager"` - Azonnal betöltődik (LCP - Largest Contentful Paint optimalizálás)
- `loading="lazy"` - Csak scrollozáskor töltődik be

---

### **8. Image Optimization Service**

- **Fájl**: `app/Services/ImageService.php`

**Csomagfüggőség:**

```bash
composer require intervention/image
```

**Funkciók:**

#### `optimizeForWeb(string $imagePath, int $width = 1200, int $quality = 85): void`

Kép átméretezés és tömörítés:

```php
ImageService::optimizeForWeb($uploadedImagePath, 1200, 85);
```

#### `generateOgImage(string $sourcePath, string $destinationPath, int $width = 1200, int $height = 630, int $quality = 90): string`

1200x630px OG image generálás (Facebook/Twitter):

```php
$ogPath = ImageService::generateOgImage($sourcePath, $destinationPath);
```

#### `generateThumbnails(string $sourcePath, string $destinationDir, string $filename, array $sizes): array`

Különböző méretek generálása:

```php
$thumbnails = ImageService::generateThumbnails($sourcePath, $dir, 'image', [
    'small' => 300,
    'medium' => 600,
    'large' => 1200
]);
// Eredmény: ['small' => 'path/image_small.jpg', 'medium' => ..., 'large' => ...]
```

#### `convertToWebP(string $sourcePath, ?string $destinationPath = null, int $quality = 80): string`

WebP formátumra konvertálás (jobb tömörítés):

```php
$webpPath = ImageService::convertToWebP($jpgPath);
```

**Használat példa Media feltöltésnél:**

```php
// MediaController@store metódusban
$path = $request->file('image')->store('media', 'public');
$fullPath = storage_path('app/public/' . $path);

// Optimalizálás
ImageService::optimizeForWeb($fullPath, 1200, 85);

// OG image generálás
$ogPath = str_replace('.jpg', '_og.jpg', $fullPath);
ImageService::generateOgImage($fullPath, $ogPath);
```

---

### **9. Database Indexek**

- **Migration**: `database/migrations/2026_01_31_120112_add_indexes_for_seo_optimization.php`

**Properties tábla indexek:**

- `slug` - Gyors URL lookup (route model binding)
- `city_id` - Városonkénti szűrés gyorsítása
- `created_at` - Rendezés dátum szerint (legújabb ingatlanok)
- `updated_at` - Sitemap lastmod értékéhez

**Cities tábla indexek:**

- `slug` - Gyors URL lookup
- `updated_at` - Sitemap lastmod értékéhez

**Futtatás:**

```bash
php artisan migrate
```

**Miért fontos?**

- Gyorsabb adatbázis lekérdezések
- Jobb SEO teljesítmény (gyorsabb oldalbetöltés)
- Sitemap generálás gyorsabb

---

### **10. Google Analytics & Search Console Előkészítés**

#### **Config fájl**: `config/services.php`

```php
'google' => [
    // Google Analytics Measurement ID (G-XXXXXXXXXX formátum)
    'analytics_id' => env('GOOGLE_ANALYTICS_ID'),

    // Google Search Console verification kód
    'search_console_verification' => env('GOOGLE_SEARCH_CONSOLE_VERIFICATION'),

    // Google Tag Manager ID (GTM-XXXXXXX formátum) - opcionális
    'tag_manager_id' => env('GOOGLE_TAG_MANAGER_ID'),
],
```

#### **Blade template**: `resources/views/app.blade.php`

Automatikusan beilleszti a `<head>`-be:

- Google Analytics (gtag.js) script - ha `GOOGLE_ANALYTICS_ID` be van állítva
- Google Search Console verification meta tag - ha `GOOGLE_SEARCH_CONSOLE_VERIFICATION` be van állítva
- Google Tag Manager script - ha `GOOGLE_TAG_MANAGER_ID` be van állítva

#### **Environment változók**: `.env`

```env
# Google Services (opcionális, csak éles környezetben)
GOOGLE_ANALYTICS_ID=
GOOGLE_SEARCH_CONSOLE_VERIFICATION=
GOOGLE_TAG_MANAGER_ID=
```

#### **Használat - Amikor élesbe megy:**

**1. Google Analytics beállítása:**

1. Menj a [Google Analytics](https://analytics.google.com/) oldalra
2. Hozz létre új GA4 property-t az "ingatlanvonal.hu" domain-re
3. Másold ki a Measurement ID-t (pl. `G-ABC123XYZ`)
4. Add hozzá a `.env` fájlhoz:
   ```env
   GOOGLE_ANALYTICS_ID=G-ABC123XYZ
   ```
5. Töröld a config cache-t:
   ```bash
   php artisan config:clear
   ```
6. Kész! Az Analytics automatikusan működik minden oldalon

**2. Google Search Console beállítása:**

1. Menj a [Google Search Console](https://search.google.com/search-console/) oldalra
2. Add hozzá az "ingatlanvonal.hu" property-t
3. Válaszd a "HTML tag" verification módszert
4. Másold ki a verification kódot (a `content="..."` részt)
5. Add hozzá a `.env` fájlhoz:
   ```env
   GOOGLE_SEARCH_CONSOLE_VERIFICATION=your-verification-code-here
   ```
6. Töröld a config cache-t:
   ```bash
   php artisan config:clear
   ```
7. Verify the ownership a Search Console-ban
8. Küldd be a sitemap.xml-t: `https://ingatlanvonal.hu/sitemap.xml`

**3. Google Tag Manager (opcionális):**
Ha GTM-et használsz Analytics/más tracking helyett:

1. Hozz létre GTM container-t
2. Másold ki a Container ID-t (pl. `GTM-XXXXXX`)
3. Add hozzá a `.env` fájlhoz:
   ```env
   GOOGLE_TAG_MANAGER_ID=GTM-XXXXXX
   ```
4. Töröld a config cache-t

**Fontos:**

- Lokálisan (localhost) ne állítsd be ezeket, csak éles környezetben
- A kódok automatikusan beillesztődnek, ha be vannak állítva
- Ha nincs beállítva, nem jelennek meg (nincs hiba)

---

## ✅ Implementációs Checklist (Általános)

- ✅ **Server-side meta tagek** (title, description, keywords) - app.blade.php
- ✅ **Open Graph tagek** (Facebook, LinkedIn) - app.blade.php
- ✅ **Twitter Card tagek** - app.blade.php
- ✅ **Canonical URL-ek** (duplikált tartalom elkerülése) - minden oldalon
- ✅ **Structured Data (JSON-LD)** - SeoService metódusok (adaptáld a projekthez)
- ✅ **Sitemap.xml generálás** (automatikus, dinamikus) - SitemapController
- ✅ **robots.txt** (crawler irányítás) - public/robots.txt
- ✅ **Lazy loading képeknél** (`loading="lazy"`, `decoding="async"`)
- ✅ **Image optimization service** (átméretezés, tömörítés, WebP) - ImageService.php
- ✅ **Database indexek** (slug, category_id, created_at, updated_at) - migration
- ✅ **Google Analytics előkészítés** (config/services.php)
- ✅ **Google Search Console előkészítés** (verification meta tag)
- ✅ **Google Tag Manager előkészítés** (opcionális)
- ✅ **XSS védelem** (DOMPurify HTML sanitization)

---

## 📋 Következő lépések (amikor élesbe megy az oldal)

### **1. Google Analytics regisztráció**

- Hozz létre GA4 property-t az ingatlanvonal.hu domain-re
- Másold be a Measurement ID-t a `.env` fájlba:
  ```env
  GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
  ```
- Config cache törlése: `php artisan config:clear`
- Tesztelés: Látogass meg pár oldalt, majd ellenőrizd a GA4 Real-time reportban

### **2. Google Search Console beállítása**

- Add hozzá az oldalt a Search Console-hoz
- Másold be a verification kódot a `.env` fájlba:
  ```env
  GOOGLE_SEARCH_CONSOLE_VERIFICATION=your-code
  ```
- Config cache törlése: `php artisan config:clear`
- Verify ownership
- **Küldd be a sitemap.xml-t**: `https://ingatlanvonal.hu/sitemap.xml`

### **3. Képoptimalizálás automatizálása**

Módosítsd a Media feltöltést (MediaController):

```php
$path = $request->file('image')->store('media', 'public');
$fullPath = storage_path('app/public/' . $path);

// Automatikus optimalizálás
ImageService::optimizeForWeb($fullPath, 1200, 85);

// OG image generálás (opcionális)
$ogPath = str_replace('.jpg', '_og.jpg', $fullPath);
ImageService::generateOgImage($fullPath, $ogPath);
```

### **4. Teljesítmény tesztelés**

- **Google PageSpeed Insights**: https://pagespeed.web.dev/
  - Teszteld a főoldalt, város oldalakat, ingatlan oldalakat
  - Célérték: 90+ Performance score
- **Lighthouse audit** (Chrome DevTools)
  - Performance
  - Accessibility
  - Best Practices
  - SEO
- **Core Web Vitals** ellenőrzése:
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1

### **5. SEO ellenőrzés**

- **Meta tagek tesztelése**:
  - View Page Source - látszódnak a meta tagek?
  - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- **Structured Data tesztelése**:
  - [Google Rich Results Test](https://search.google.com/test/rich-results)
  - [Schema Markup Validator](https://validator.schema.org/)
- **Sitemap tesztelése**:
  - Nyisd meg: `https://ingatlanvonal.hu/sitemap.xml`
  - Ellenőrizd, hogy minden URL benne van

### **6. Folyamatos monitorozás**

- Google Search Console:
  - Index coverage ellenőrzése
  - Search performance követése (impressions, clicks, CTR)
  - Sitemap státusz
- Google Analytics:
  - Forgalom forrásai
  - Legnépszerűbb oldalak
  - Konverziók (ha beállítod)

---

## 🎯 Miért működik ez Node.js/SSR nélkül?

**Gyakori félreértés**: "Inertia.js-hez kell SSR a SEO-hoz"

**Valóság**: Nem kell! Így csináltuk:

1. **Meta tagek server-side (PHP/Blade)**
   - A Google bot látja őket az oldal forrásában
   - Nem kell hozzá JavaScript futtatás

2. **Structured Data JSON-LD formátumban**
   - Egyszerű `<script type="application/ld+json">` tag
   - Statikus, szerver által renderelt

3. **Sitemap.xml tisztán PHP-ban**
   - Blade template generálja
   - Mindig naprakész (dinamikusan lekéri az adatokat)

4. **Lazy loading böngésző natív funkció**
   - `loading="lazy"` attribútum
   - Nem kell JavaScript library

**Ami SSR nélkül NEM látszik a botoknak:**

- React által renderelt HTML tartalom (de ez nem probléma, mert a fontos SEO elemek server-side vannak)

**Amit a botok látnak:**

- Összes meta tag (title, description, OG, Twitter)
- Structured Data (JSON-LD)
- Canonical URL-ek
- Alt szövegek a képeken

**Eredmény**: Teljesen SEO-barát oldal, PHP-only tárhelyen! 🎉

---

## 📚 Hasznos linkek és eszközök

### **Google Eszközök**

- [Google Search Console](https://search.google.com/search-console/)
- [Google Analytics](https://analytics.google.com/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

### **Meta Tag Ellenőrzők**

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### **Schema.org**

- [Schema.org dokumentáció](https://schema.org/)
- [Schema Markup Validator](https://validator.schema.org/)
- [Schema.org Accommodation](https://schema.org/Accommodation)
- [Schema.org RealEstateListing](https://schema.org/RealEstateListing)

### **Teljesítmény**

- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)
- [Core Web Vitals](https://web.dev/vitals/)

### **Egyéb**

- [Can I Use](https://caniuse.com/) - Böngésző kompatibilitás (pl. lazy loading)
- [TinyPNG](https://tinypng.com/) - Kép tömörítés online

---

## 🔧 Troubleshooting

### **Meta tagek nem látszódnak az oldal forrásában**

- Ellenőrizd, hogy a controller-ben használod-e a `SeoService::generate()`-et
- Cache törlése: `php artisan cache:clear`, `php artisan config:clear`, `php artisan view:clear`
- Böngésző cache törlése (Ctrl+Shift+R)

### **Structured Data hiba a Google teszten**

- Ellenőrizd a JSON-LD szintaxist: [JSONLint](https://jsonlint.com/)
- Kötelező mezők megvannak? (pl. `@context`, `@type`, `name`, `url`)
- [Schema.org dokumentáció](https://schema.org/) szerint helyes a típus?

### **Sitemap.xml nem töltődik be**

- Route regisztrálva van? `routes/web.php` → `Route::get('sitemap.xml', ...)`
- Cache törlése: `php artisan route:clear`
- Próbáld meg: `php artisan route:list | grep sitemap`

### **Lazy loading nem működik**

- Régi böngészők nem támogatják → polyfill használata vagy `loading="eager"` fallback
- Ellenőrizd a képek `loading` attribútumát

### **ImageService hibák**

- Intervention/Image telepítve van? `composer require intervention/image`
- GD vagy Imagick extension engedélyezve van a PHP-ban?
- Storage write permissions rendben vannak?

### **Analytics nem jelenít meg adatokat**

- Measurement ID helyesen be van állítva a `.env`-ben?
- Config cache törölve? `php artisan config:clear`
- Ad blocker kikapcsolva a teszteléshez?
- Real-time reportban teszteld (1-2 perc késleltetés)

---

## 🛠️ Projekt Adaptációs Gyorsútmutató

### **1. Blog/Hír oldal projekt**

**Modellek:** `Post`, `Category`, `Tag`, `Author`

**SEO prioritások:**

- ✅ `articleSchema()` használata minden cikknél
- ✅ Szerző információk hozzáadása
- ✅ Publikálási/frissítési dátumok
- ✅ Tag-ek mint keywords
- ✅ Featured image minden cikkhez
- ✅ Rich snippets (FAQ, How-to, ha releváns)

**Példa Controller:**

```php
PostController::show($post) => articleSchema($post)
```

---

### **2. Webshop/E-commerce projekt**

**Modellek:** `Product`, `Category`, `Brand`, `Review`

**SEO prioritások:**

- ✅ `productSchema()` használata minden terméknél
- ✅ Ár, készlet információk
- ✅ Értékelések (aggregateRating)
- ✅ Márka, SKU adatok
- ✅ Több kép (image array)
- ✅ Breadcrumb (Főoldal > Kategória > Alkategória > Termék)

**Példa Controller:**

```php
ProductController::show($product) => productSchema($product)
CategoryController::show($category) => itemListSchema()
```

---

### **3. Portfólió/Fotós oldal**

**Modellek:** `Project`, `Category`, `Client`

**SEO prioritások:**

- ✅ `creativeWorkSchema()` használata projekteknél
- ✅ Magas minőségű képek optimalizálása
- ✅ WebP formátum használata
- ✅ Image lazy loading (sok kép van)
- ✅ Képgalériák SEO-ja
- ✅ Alt textekkel minden képhez

**Példa Controller:**

```php
PortfolioController::show($project) => creativeWorkSchema($project)
```

**Képoptimalizálás extra figyelemmel:**

```php
// Nagyobb képek esetén
ImageService::optimizeForWeb($path, 1920, 90); // magasabb felbontás
ImageService::convertToWebP($path, null, 85); // jobb tömörítés
```

---

### **4. Szolgáltatás/Helyi vállalkozás**

**Modellek:** `Service`, `Location`, `Testimonial`

**SEO prioritások:**

- ✅ `localBusinessSchema()` a főoldalon
- ✅ NAP (Name, Address, Phone) konzisztencia
- ✅ Nyitvatartási idők
- ✅ Google Maps integráció
- ✅ Értékelések megjelenítése
- ✅ Helyi kulcsszavak használata

**Példa Controller:**

```php
HomeController::index() => localBusinessSchema()
ServiceController::show($service) => serviceSchema($service)
```

---

### **5. Esemény/Jegyeladó oldal**

**Modellek:** `Event`, `Venue`, `Ticket`

**SEO prioritások:**

- ✅ `eventSchema()` minden eseményhez
- ✅ Dátumok, helyszínek
- ✅ Jegyárak, elérhetőség
- ✅ Esemény státusz (EventScheduled, EventCancelled, stb.)
- ✅ Venue információk (cím, koordináták)

**Példa Controller:**

```php
EventController::show($event) => eventSchema($event)
```

---

### **📝 Gyors Checklist új projekthez**

1. **☐ SeoService.php létrehozása** - Másold az alábbi sablont
2. **☐ app.blade.php frissítése** - Meta tagek beilllesztése
3. **☐ Schema.org metódusok** - Válaszd ki a relevánsakat (article, product, event, stb.)
4. **☐ Controller-ek frissítése** - `seo` prop hozzáadása minden Inertia render-hez
5. **☐ Sitemap implementálása** - SitemapController + blade template
6. **☐ robots.txt beállítása** - Domain frissítése
7. **☐ Database indexek** - slug, created_at, updated_at
8. **☐ Image optimalizálás** - ImageService integrálása feltöltésnél
9. **☐ Lazy loading** - `loading="lazy"` minden képhez (kivéve hero)
10. **☐ DOMPurify** - HTML tartalmak szanitálása
11. **☐ Google Analytics** - Config beállítás (élesben)
12. **☐ Search Console** - Domain hozzáadás és sitemap benyújtás

---

### **💻 SeoService.php Teljes Sablon (Általános)**

```php
<?php

namespace App\Services;

use Illuminate\Support\Str;

class SeoService
{
    /**
     * SEO meta adatok generálása alapvető default értékekkel
     */
    public static function generate(array $data = []): array
    {
        $defaults = [
            'title' => config('app.name'),
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
        $seo['og_image'] = $seo['og_image'] ?? asset('images/default-og.jpg');

        // Twitter Card defaults
        $seo['twitter_card'] = $seo['twitter_card'] ?? 'summary_large_image';
        $seo['twitter_title'] = $seo['twitter_title'] ?? $seo['title'];
        $seo['twitter_description'] = $seo['twitter_description'] ?? $seo['description'];
        $seo['twitter_image'] = $seo['twitter_image'] ?? $seo['og_image'];

        return $seo;
    }

    /**
     * Organization Schema
     */
    public static function organizationSchema(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => config('app.name'),
            'url' => url('/'),
            'logo' => asset('images/logo.png'),
            'description' => 'Szervezet leírása',
            'address' => [
                '@type' => 'PostalAddress',
                'addressCountry' => 'HU',
            ],
        ];
    }

    /**
     * ItemList Schema - listákhoz
     */
    public static function itemListSchema(string $name, string $description, string $url, array $items): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'ItemList',
            'name' => $name,
            'description' => $description,
            'url' => $url,
            'numberOfItems' => count($items),
            'itemListElement' => $items,
        ];
    }

    /**
     * Breadcrumb Schema
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

    /**
     * Article Schema - blog/hír cikkekhez
     */
    public static function articleSchema(object $article): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Article',
            'headline' => $article->title,
            'description' => Str::limit(strip_tags($article->content), 200),
            'image' => $article->featured_image,
            'datePublished' => $article->published_at->toIso8601String(),
            'dateModified' => $article->updated_at->toIso8601String(),
            'author' => [
                '@type' => 'Person',
                'name' => $article->author->name ?? config('app.name'),
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name' => config('app.name'),
                'logo' => [
                    '@type' => 'ImageObject',
                    'url' => asset('images/logo.png'),
                ],
            ],
        ];
    }

    /**
     * Product Schema - webshop termékekhez
     */
    public static function productSchema(object $product): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Product',
            'name' => $product->name,
            'description' => $product->description,
            'image' => is_array($product->images) ? $product->images : [$product->image],
            'sku' => $product->sku ?? null,
            'brand' => [
                '@type' => 'Brand',
                'name' => $product->brand ?? config('app.name'),
            ],
            'offers' => [
                '@type' => 'Offer',
                'url' => url()->current(),
                'priceCurrency' => 'HUF',
                'price' => $product->price,
                'availability' => $product->in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            ],
        ];
    }

    /**
     * Event Schema - eseményekhez
     */
    public static function eventSchema(object $event): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Event',
            'name' => $event->name,
            'description' => $event->description,
            'image' => $event->image,
            'startDate' => $event->starts_at->toIso8601String(),
            'endDate' => $event->ends_at->toIso8601String(),
            'location' => [
                '@type' => 'Place',
                'name' => $event->venue_name,
                'address' => $event->venue_address,
            ],
        ];
    }

    /**
     * LocalBusiness Schema - helyi vállalkozásokhoz
     */
    public static function localBusinessSchema(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'LocalBusiness',
            'name' => config('app.name'),
            'image' => asset('images/business.jpg'),
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => 'Utca 123',
                'addressLocality' => 'Város',
                'postalCode' => '1234',
                'addressCountry' => 'HU',
            ],
            'telephone' => '+36 1 234 5678',
        ];
    }

    /**
     * CreativeWork Schema - portfólió projektekhez
     */
    public static function creativeWorkSchema(object $project): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'CreativeWork',
            'name' => $project->title,
            'description' => $project->description,
            'image' => $project->thumbnail,
            'url' => url()->current(),
            'creator' => [
                '@type' => 'Person',
                'name' => config('app.name'),
            ],
        ];
    }
}
```

---

## 🎉 Összefoglalás

Egy **általános, újrahasználható SEO keretrendszert** hoztunk létre Laravel + React + Inertia alkalmazásokhoz, **Node.js/SSR nélkül**.

**Fő előnyök:**

- ✅ Minden fontos SEO elem server-side renderelt
- ✅ Google és más botok látják az összes meta adatot
- ✅ Structured Data (Schema.org) támogatás - több típussal
- ✅ Teljesítmény optimalizálás (lazy loading, image optimization)
- ✅ Adatbázis indexek a gyorsaságért
- ✅ Google Analytics és Search Console előkészítve
- ✅ DRY principle (SeoService helper)
- ✅ Biztonságos (XSS védelem DOMPurify-val)
- ✅ **Projektfüggetlen** - adaptálható bármilyen Laravel projekthez

**Használható projektekhez:**

- 📝 Blog/Hír oldalak
- 🛍️ Webshopok/E-commerce
- 📸 Portfólió/Fotós oldalak
- 🏢 Szolgáltatás/Helyi vállalkozások
- 🎫 Esemény/Jegyeladó oldalak
- 🏠 Ingatlan oldalak
- ....és bármi más Laravel + Inertia projekt!

**Most már bármilyen új projekt SEO-ját gyorsan fel tudod építeni ezzel a keretrendszerrel! 🚀**

---

**Utolsó frissítés**: 2026. január 31.  
**Verzió**: 2.0 (Általános, projektfüggetlen)
