<?php

namespace App\Services;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageService
{
    /**
     * Optimalizálja a képet SEO és teljesítmény szempontjából
     * 
     * @param string $imagePath Az optimalizálandó kép elérési útja
     * @param int $width Maximális szélesség (alapértelmezett: 1200px)
     * @param int $quality Minőség 0-100 között (alapértelmezett: 85)
     * @return void
     */
    public static function optimizeForWeb(string $imagePath, int $width = 1200, int $quality = 85): void
    {
        $manager = new ImageManager(new Driver());
        $image = $manager->read($imagePath);
        
        // Arány megtartásával átméretezés csak ha nagyobb a kép
        if ($image->width() > $width) {
            $image->scale(width: $width);
        }
        
        // Mentés optimalizált minőséggel
        $image->save($imagePath, quality: $quality);
    }

    /**
     * Generál thumbnail-t Open Graph image-hez (1200x630px - Facebook/Twitter ajánlott méret)
     * 
     * @param string $sourcePath Forrás kép elérési útja
     * @param string $destinationPath Cél kép elérési útja
     * @param int $width OG image szélessége (alapértelmezett: 1200px)
     * @param int $height OG image magassága (alapértelmezett: 630px)
     * @param int $quality Minőség 0-100 között (alapértelmezett: 90)
     * @return string A generált kép elérési útja
     */
    public static function generateOgImage(
        string $sourcePath, 
        string $destinationPath, 
        int $width = 1200, 
        int $height = 630,
        int $quality = 90
    ): string {
        $manager = new ImageManager(new Driver());
        $image = $manager->read($sourcePath);
        
        // Képarány megtartásával vágás középről
        $image->cover($width, $height);
        
        // Mentés
        $image->save($destinationPath, quality: $quality);
        
        return $destinationPath;
    }

    /**
     * Generál különböző méretű thumbnail-öket (pl. small, medium, large)
     * 
     * @param string $sourcePath Forrás kép elérési útja
     * @param string $destinationDir Cél mappa
     * @param string $filename Fájlnév (kiterjesztés nélkül)
     * @param array $sizes Méretek tömbje pl. ['small' => 300, 'medium' => 600, 'large' => 1200]
     * @return array A generált képek elérési útjai
     */
    public static function generateThumbnails(
        string $sourcePath, 
        string $destinationDir, 
        string $filename,
        array $sizes = ['small' => 300, 'medium' => 600, 'large' => 1200]
    ): array {
        $manager = new ImageManager(new Driver());
        $image = $manager->read($sourcePath);
        
        $extension = pathinfo($sourcePath, PATHINFO_EXTENSION);
        $thumbnails = [];
        
        foreach ($sizes as $sizeName => $width) {
            $thumbnailPath = "{$destinationDir}/{$filename}_{$sizeName}.{$extension}";
            
            $thumbnail = clone $image;
            $thumbnail->scale(width: $width);
            $thumbnail->save($thumbnailPath, quality: 85);
            
            $thumbnails[$sizeName] = $thumbnailPath;
        }
        
        return $thumbnails;
    }

    /**
     * WebP formátumra konvertálás (modern böngészőkhöz, jobb tömörítés)
     * 
     * @param string $sourcePath Forrás kép elérési útja
     * @param string|null $destinationPath Cél kép elérési útja (null esetén ugyanaz .webp kiterjesztéssel)
     * @param int $quality Minőség 0-100 között (alapértelmezett: 80)
     * @return string A generált WebP kép elérési útja
     */
    public static function convertToWebP(string $sourcePath, ?string $destinationPath = null, int $quality = 80): string
    {
        if (!$destinationPath) {
            $destinationPath = preg_replace('/\.[^.]+$/', '.webp', $sourcePath);
        }
        
        $manager = new ImageManager(new Driver());
        $image = $manager->read($sourcePath);
        
        $image->toWebp(quality: $quality)->save($destinationPath);
        
        return $destinationPath;
    }
}
