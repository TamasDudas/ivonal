import {
 store,
 update,
} from '@/actions/App/Http/Controllers/PropertyController';
import AppLayout from '@/layouts/app-layout';
import { Form } from '@inertiajs/react';
import { Button } from '../ui/button';

interface Property {
 id: number;
 city_id: number;
 street: string;
 latitude?: number | null;
 longitude?: number | null;
 rental_price?: string | null;
 sale_price?: string | null;
 size?: string | null;
 floor_area?: string | null;
 minimum_rental_period?: string | null;
 year_built?: string | null;
 building_floors?: string | null;
 floor?: string | null;
 balcony?: string | null;
 view?: string | null;
 heating_type?: string | null;
 parking?: string | null;
 furniture: 'igen' | 'nem';
 appliances: 'igen' | 'nem';
 air_conditioning: 'igen' | 'nem';
 elevator: 'igen' | 'nem';
 smoking: 'igen' | 'nem';
 pets: 'igen' | 'nem';
 is_featured: 'igen' | 'nem';
 short_description?: string | null;
 description?: string | null;
 meta_title?: string | null;
 meta_description?: string | null;
 meta_keywords?: string | null;
}

interface Cities {
 id: number;
 name: string;
}

interface Props {
 property?: Property;
 cities: Cities[]; // Kötelező, mert mindig kell
}

/**
 * PropertyForm komponens
 *
 * @param cities - A városok listája tömb formátumban
 * A cities tömb minden eleme egy objektum id és name property-vel
 */
export default function PropertyForm({ cities, property }: Props) {
 const isEditing = !!property;
 return (
  <AppLayout>
   <div className="flex min-h-screen items-center justify-center p-4">
    <Form
     action={isEditing ? update.url(property.id) : store.url()}
     method={isEditing ? 'patch' : 'post'}
     resetOnSuccess={!isEditing}
     options={{
      preserveScroll: true,
     }}
     className="w-4xl"
    >
     {({ errors, processing, wasSuccessful }) => (
      <div className="bg- w-full space-y-4 overflow-hidden px-4 py-6 shadow-xl sm:rounded-lg">
       <h2 className="mb-6 text-2xl font-semibold">
        {isEditing ? 'Ingatlan szerkesztése' : 'Új ingatlan létrehozása'}
       </h2>

       {wasSuccessful && (
        <div className="rounded-md bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-400">
         {isEditing
          ? 'Ingatlan sikeresen frissítve!'
          : 'Ingatlan sikeresen létrehozva!'}
        </div>
       )}

       {/* Alapadatok */}
       <div className="space-y-4">
        <h3 className="text-lg font-medium">Alapadatok</h3>

        <div className="space-y-2">
         <label htmlFor="city_id" className="block text-sm font-medium">
          Város *
         </label>
         <select
          name="city_id"
          id="city_id"
          defaultValue={property?.city_id}
          className="w-full rounded-md border-3 px-3 py-2"
         >
          <option value="">Válassz várost...</option>
          {cities.map((city) => (
           <option key={city.id} value={city.id}>
            {city.name}
           </option>
          ))}
         </select>
         {errors.city_id && (
          <div className="text-sm text-red-600 dark:text-red-400">
           {errors.city_id}
          </div>
         )}
        </div>

        <div className="space-y-2">
         <label htmlFor="street" className="block text-sm font-medium">
          Utca *
         </label>
         <input
          type="text"
          name="street"
          id="street"
          defaultValue={property?.street}
          className="w-full rounded-md border-3 px-3 py-2"
         />
         {errors.street && (
          <div className="text-sm text-red-600 dark:text-red-400">
           {errors.street}
          </div>
         )}
        </div>

        <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <label htmlFor="latitude" className="block text-sm font-medium">
           Földrajzi szélesség
          </label>
          <input
           type="number"
           step="any"
           name="latitude"
           id="latitude"
           defaultValue={property?.latitude ?? ''}
           className="w-full rounded-md border-3 px-3 py-2"
          />
         </div>

         <div className="space-y-2">
          <label htmlFor="longitude" className="block text-sm font-medium">
           Földrajzi hosszúság
          </label>
          <input
           type="number"
           step="any"
           name="longitude"
           id="longitude"
           defaultValue={property?.longitude ?? ''}
           className="w-full rounded-md border-3 px-3 py-2"
          />
         </div>
        </div>
       </div>

       {/* Árak és méret */}
       <div className="space-y-4">
        <h3 className="text-lg font-medium">Árak és méret</h3>

        <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <label htmlFor="rental_price" className="block text-sm font-medium">
           Bérleti díj
          </label>
          <input
           type="text"
           name="rental_price"
           id="rental_price"
           defaultValue={property?.rental_price ?? ''}
           className="w-full rounded-md border-3 px-3 py-2"
          />
          {errors.rental_price && (
           <div className="text-sm text-red-600 dark:text-red-400">
            {errors.rental_price}
           </div>
          )}
         </div>

         <div className="space-y-2">
          <label htmlFor="sale_price" className="block text-sm font-medium">
           Eladási ár
          </label>
          <input
           type="text"
           name="sale_price"
           id="sale_price"
           defaultValue={property?.sale_price ?? ''}
           className="w-full rounded-md border-3 px-3 py-2"
          />
          {errors.sale_price && (
           <div className="text-sm text-red-600 dark:text-red-400">
            {errors.sale_price}
           </div>
          )}
         </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <label htmlFor="size" className="block text-sm font-medium">
           Méret
          </label>
          <input
           type="text"
           name="size"
           id="size"
           defaultValue={property?.size ?? ''}
           className="w-full rounded-md border-3 px-3 py-2"
          />
         </div>

         <div className="space-y-2">
          <label htmlFor="floor_area" className="block text-sm font-medium">
           Alapterület
          </label>
          <input
           type="text"
           name="floor_area"
           id="floor_area"
           defaultValue={property?.floor_area ?? ''}
           className="w-full rounded-md border-3 px-3 py-2"
          />
         </div>
        </div>

        <div className="space-y-2">
         <label
          htmlFor="minimum_rental_period"
          className="block text-sm font-medium"
         >
          Minimális bérleti időszak
         </label>
         <input
          type="text"
          name="minimum_rental_period"
          id="minimum_rental_period"
          defaultValue={property?.minimum_rental_period ?? ''}
          className="w-full rounded-md border-3 px-3 py-2"
         />
        </div>
       </div>

       {/* Épület adatok */}
       <div className="space-y-4">
        <h3 className="text-lg font-medium">Épület adatok</h3>

        <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <label htmlFor="year_built" className="block text-sm font-medium">
           Építés éve
          </label>
          <input
           type="text"
           name="year_built"
           id="year_built"
           defaultValue={property?.year_built ?? ''}
           className="w-full rounded-md border-3 px-3 py-2"
          />
         </div>

         <div className="space-y-2">
          <label
           htmlFor="building_floors"
           className="block text-sm font-medium"
          >
           Épület szintjei
          </label>
          <input
           type="text"
           name="building_floors"
           id="building_floors"
           defaultValue={property?.building_floors ?? ''}
           className="w-full rounded-md border-3 px-3 py-2"
          />
         </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <label htmlFor="floor" className="block text-sm font-medium">
           Emelet
          </label>
          <input
           type="text"
           name="floor"
           id="floor"
           defaultValue={property?.floor ?? ''}
           className="w-full rounded-md border-3 px-3 py-2"
          />
         </div>

         <div className="space-y-2">
          <label htmlFor="balcony" className="block text-sm font-medium">
           Erkély
          </label>
          <input
           type="text"
           name="balcony"
           id="balcony"
           defaultValue={property?.balcony ?? ''}
           className="w-full rounded-md border-3 px-3 py-2"
          />
         </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <label htmlFor="view" className="block text-sm font-medium">
           Kilátás
          </label>
          <input
           type="text"
           name="view"
           id="view"
           defaultValue={property?.view ?? ''}
           className="w-full rounded-md border-3 px-3 py-2"
          />
         </div>

         <div className="space-y-2">
          <label htmlFor="heating_type" className="block text-sm font-medium">
           Fűtés típusa
          </label>
          <input
           type="text"
           name="heating_type"
           id="heating_type"
           defaultValue={property?.heating_type ?? ''}
           className="w-full rounded-md border-3 px-3 py-2"
          />
         </div>
        </div>

        <div className="space-y-2">
         <label htmlFor="parking" className="block text-sm font-medium">
          Parkolás
         </label>
         <input
          type="text"
          name="parking"
          id="parking"
          defaultValue={property?.parking ?? ''}
          className="w-full rounded-md border-3 px-3 py-2"
         />
        </div>
       </div>

       {/* Felszereltség */}
       <div className="space-y-4">
        <h3 className="text-lg font-medium">Felszereltség és szabályok</h3>

        <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <label htmlFor="furniture" className="block text-sm font-medium">
           Bútorozott
          </label>
          <select
           name="furniture"
           id="furniture"
           defaultValue={property?.furniture ?? 'nem'}
           className="w-full rounded-md border-3 px-3 py-2"
          >
           <option value="igen">Igen</option>
           <option value="nem">Nem</option>
          </select>
          {errors.furniture && (
           <div className="text-sm text-red-600 dark:text-red-400">
            {errors.furniture}
           </div>
          )}
         </div>

         <div className="space-y-2">
          <label htmlFor="appliances" className="block text-sm font-medium">
           Gépesített
          </label>
          <select
           name="appliances"
           id="appliances"
           defaultValue={property?.appliances ?? 'nem'}
           className="w-full rounded-md border-3 px-3 py-2"
          >
           <option value="igen">Igen</option>
           <option value="nem">Nem</option>
          </select>
          {errors.appliances && (
           <div className="text-sm text-red-600 dark:text-red-400">
            {errors.appliances}
           </div>
          )}
         </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <label
           htmlFor="air_conditioning"
           className="block text-sm font-medium"
          >
           Légkondicionáló
          </label>
          <select
           name="air_conditioning"
           id="air_conditioning"
           defaultValue={property?.air_conditioning ?? 'nem'}
           className="w-full rounded-md border-3 px-3 py-2"
          >
           <option value="igen">Igen</option>
           <option value="nem">Nem</option>
          </select>
          {errors.air_conditioning && (
           <div className="text-sm text-red-600 dark:text-red-400">
            {errors.air_conditioning}
           </div>
          )}
         </div>

         <div className="space-y-2">
          <label htmlFor="elevator" className="block text-sm font-medium">
           Lift
          </label>
          <select
           name="elevator"
           id="elevator"
           defaultValue={property?.elevator ?? 'nem'}
           className="w-full rounded-md border-3 px-3 py-2"
          >
           <option value="igen">Igen</option>
           <option value="nem">Nem</option>
          </select>
          {errors.elevator && (
           <div className="text-sm text-red-600 dark:text-red-400">
            {errors.elevator}
           </div>
          )}
         </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <label htmlFor="smoking" className="block text-sm font-medium">
           Dohányzás engedélyezett
          </label>
          <select
           name="smoking"
           id="smoking"
           defaultValue={property?.smoking ?? 'nem'}
           className="w-full rounded-md border-3 px-3 py-2"
          >
           <option value="nem">Nem</option>
           <option value="igen">Igen</option>
          </select>
          {errors.smoking && (
           <div className="text-sm text-red-600 dark:text-red-400">
            {errors.smoking}
           </div>
          )}
         </div>

         <div className="space-y-2">
          <label htmlFor="pets" className="block text-sm font-medium">
           Háziállat engedélyezett
          </label>
          <select
           name="pets"
           id="pets"
           defaultValue={property?.pets ?? 'nem'}
           className="w-full rounded-md border-3 px-3 py-2"
          >
           <option value="nem">Nem</option>
           <option value="igen">Igen</option>
          </select>
          {errors.pets && (
           <div className="text-sm text-red-600 dark:text-red-400">
            {errors.pets}
           </div>
          )}
         </div>
        </div>

        <div className="space-y-2">
         <label htmlFor="is_featured" className="block text-sm font-medium">
          Kiemelt hirdetés
         </label>
         <select
          name="is_featured"
          id="is_featured"
          defaultValue={property?.is_featured ?? 'nem'}
          className="w-full rounded-md border-3 px-3 py-2"
         >
          <option value="igen">Igen</option>
          <option value="nem">Nem</option>
         </select>
         {errors.is_featured && (
          <div className="text-sm text-red-600 dark:text-red-400">
           {errors.is_featured}
          </div>
         )}
        </div>
       </div>

       {/* Leírások */}
       <div className="space-y-4">
        <h3 className="text-lg font-medium">Leírások</h3>

        <div className="space-y-2">
         <label
          htmlFor="short_description"
          className="block text-sm font-medium"
         >
          Rövid leírás
         </label>
         <textarea
          name="short_description"
          id="short_description"
          rows={3}
          maxLength={500}
          defaultValue={property?.short_description ?? ''}
          className="w-full rounded-md border-3 px-3 py-2"
         />
        </div>

        <div className="space-y-2">
         <label htmlFor="description" className="block text-sm font-medium">
          Részletes leírás
         </label>
         <textarea
          name="description"
          id="description"
          rows={6}
          defaultValue={property?.description ?? ''}
          className="w-full rounded-md border-3 px-3 py-2"
         />
        </div>
       </div>

       {/* SEO */}
       <div className="space-y-4">
        <h3 className="text-lg font-medium">SEO</h3>

        <div className="space-y-2">
         <label htmlFor="meta_title" className="block text-sm font-medium">
          Meta cím
         </label>
         <input
          type="text"
          name="meta_title"
          id="meta_title"
          maxLength={255}
          defaultValue={property?.meta_title ?? ''}
          className="w-full rounded-md border-3 px-3 py-2"
         />
        </div>

        <div className="space-y-2">
         <label
          htmlFor="meta_description"
          className="block text-sm font-medium"
         >
          Meta leírás
         </label>
         <textarea
          name="meta_description"
          id="meta_description"
          rows={3}
          maxLength={500}
          defaultValue={property?.meta_description ?? ''}
          className="w-full rounded-md border-3 px-3 py-2"
         />
        </div>

        <div className="space-y-2">
         <label htmlFor="meta_keywords" className="block text-sm font-medium">
          Meta kulcsszavak
         </label>
         <input
          type="text"
          name="meta_keywords"
          id="meta_keywords"
          maxLength={500}
          defaultValue={property?.meta_keywords ?? ''}
          className="w-full rounded-md border-3 px-3 py-2"
         />
        </div>
       </div>

       <div className="flex justify-center py-4">
        <Button
         type="submit"
         disabled={processing}
         className="w-80 rounded-md bg-chart-1 px-8 py-2"
         variant="outline"
        >
         {processing
          ? isEditing
            ? 'Mentés...'
            : 'Létrehozás...'
          : isEditing
            ? 'Szerkesztés mentése'
            : 'Létrehozás'}
        </Button>
       </div>
      </div>
     )}
    </Form>
   </div>
  </AppLayout>
 );
}
