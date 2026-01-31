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
        $seo['og_image'] = $seo['og_image'] ?? asset('storage/nemes_halo_4.jpg');

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
            'logo' => asset('storage/nemes_halo_4.jpg'),
            'description' => 'Weboldalunkon baráti társaság által kínált kiadó és eladó lakóingatlanokat talál Budapesten és Szegeden. Személyes szolgáltatás, felújított lakásokkal.',
            'address' => [
                '@type' => 'PostalAddress',
                'addressCountry' => 'HU',
            ],
        ];
    }

    /**
     * Lista (ItemList) Schema.org structured data városok/ingatlanok listájához
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
