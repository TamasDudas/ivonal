import {
 store,
 update,
} from '@/actions/App/Http/Controllers/PropertyController';
import AppLayout from '@/layouts/app-layout';
import { City, PropertyFormData } from '@/types';
import { Form } from '@inertiajs/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RichTextEditor } from '../ui/rich-text-editor';
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

interface Props {
 property?: PropertyFormData;
 cities: City[];
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
         <Label htmlFor="city_id" className="text-sm font-medium">
          Város *
         </Label>
         <Select name="city_id" defaultValue={property?.city_id?.toString()}>
          <SelectTrigger id="city_id">
           <SelectValue placeholder="Válassz várost..." />
          </SelectTrigger>
          <SelectContent>
           {cities.map((city) => (
            <SelectItem key={city.id} value={city.id.toString()}>
             {city.name}
            </SelectItem>
           ))}
          </SelectContent>
         </Select>
         {errors.city_id && (
          <div className="text-sm text-red-600 dark:text-red-400">
           {errors.city_id}
          </div>
         )}
        </div>

        <div className="space-y-2">
         <Label htmlFor="street" className="text-sm font-medium">
          Utca *
         </Label>
         <Input
          type="text"
          name="street"
          id="street"
          defaultValue={property?.street}
         />
         {errors.street && (
          <div className="text-sm text-red-600 dark:text-red-400">
           {errors.street}
          </div>
         )}
        </div>

        <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <Label htmlFor="latitude" className="text-sm font-medium">
           Földrajzi szélesség
          </Label>
          <Input
           type="number"
           step="any"
           name="latitude"
           id="latitude"
           defaultValue={property?.latitude ?? ''}
          />
         </div>

         <div className="space-y-2">
          <Label htmlFor="longitude" className="text-sm font-medium">
           Földrajzi hosszúság
          </Label>
          <Input
           type="number"
           step="any"
           name="longitude"
           id="longitude"
           defaultValue={property?.longitude ?? ''}
          />
         </div>
        </div>
       </div>

       {/* Árak és méret */}
       <div className="space-y-4">
        <h3 className="text-lg font-medium">Árak és méret</h3>

        <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <Label htmlFor="rental_price" className="text-sm font-medium">
           Bérleti díj
          </Label>
          <Input
           type="text"
           name="rental_price"
           id="rental_price"
           defaultValue={property?.rental_price ?? ''}
          />
          {errors.rental_price && (
           <div className="text-sm text-red-600 dark:text-red-400">
            {errors.rental_price}
           </div>
          )}
         </div>

         <div className="space-y-2">
          <Label htmlFor="sale_price" className="text-sm font-medium">
           Eladási ár
          </Label>
          <Input
           type="text"
           name="sale_price"
           id="sale_price"
           defaultValue={property?.sale_price ?? ''}
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
          <Label htmlFor="size" className="text-sm font-medium">
           Méret
          </Label>
          <Input
           type="text"
           name="size"
           id="size"
           defaultValue={property?.size ?? ''}
          />
         </div>

         <div className="space-y-2">
          <Label htmlFor="floor_area" className="text-sm font-medium">
           Alapterület
          </Label>
          <Input
           type="text"
           name="floor_area"
           id="floor_area"
           defaultValue={property?.floor_area ?? ''}
          />
         </div>
        </div>

        <div className="space-y-2">
         <Label htmlFor="minimum_rental_period" className="text-sm font-medium">
          Minimális bérleti időszak
         </Label>
         <Input
          type="text"
          name="minimum_rental_period"
          id="minimum_rental_period"
          defaultValue={property?.minimum_rental_period ?? ''}
         />
        </div>
       </div>

       {/* Épület adatok */}
       <div className="space-y-4">
        <h3 className="text-lg font-medium">Épület adatok</h3>

        <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <Label htmlFor="year_built" className="block text-sm font-medium">
           Építés éve
          </Label>
          <Input
           type="text"
           name="year_built"
           id="year_built"
           defaultValue={property?.year_built ?? ''}
           className="w-full rounded-md px-3 py-2"
          />
         </div>

         <div className="space-y-2">
          <Label
           htmlFor="building_floors"
           className="block text-sm font-medium"
          >
           Épület szintjei
          </Label>
          <Input
           type="text"
           name="building_floors"
           id="building_floors"
           defaultValue={property?.building_floors ?? ''}
           className="w-full rounded-md px-3 py-2"
          />
         </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <Label htmlFor="floor" className="block text-sm font-medium">
           Emelet
          </Label>
          <Input
           type="text"
           name="floor"
           id="floor"
           defaultValue={property?.floor ?? ''}
           className="w-full rounded-md px-3 py-2"
          />
         </div>

         <div className="space-y-2">
          <Label htmlFor="balcony" className="block text-sm font-medium">
           Erkély
          </Label>
          <Input
           type="text"
           name="balcony"
           id="balcony"
           defaultValue={property?.balcony ?? ''}
           className="w-full rounded-md px-3 py-2"
          />
         </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <Label htmlFor="view" className="block text-sm font-medium">
           Kilátás
          </Label>
          <Input
           type="text"
           name="view"
           id="view"
           defaultValue={property?.view ?? ''}
           className="w-full rounded-md px-3 py-2"
          />
         </div>

         <div className="space-y-2">
          <Label htmlFor="heating_type" className="block text-sm font-medium">
           Fűtés típusa
          </Label>
          <Input
           type="text"
           name="heating_type"
           id="heating_type"
           defaultValue={property?.heating_type ?? ''}
           className="w-full rounded-md px-3 py-2"
          />
         </div>
        </div>

        <div className="space-y-2">
         <Label htmlFor="parking" className="block text-sm font-medium">
          Parkolás
         </Label>
         <Input
          type="text"
          name="parking"
          id="parking"
          defaultValue={property?.parking ?? ''}
          className="w-full rounded-md px-3 py-2"
         />
        </div>
       </div>

       {/* Felszereltség */}
       <div className="space-y-4">
        <h3 className="text-lg font-medium">Felszereltség és szabályok</h3>

        <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <Label htmlFor="furniture" className="block text-sm font-medium">
           Bútorozott
          </Label>
          <Select name="furniture" defaultValue={property?.furniture ?? 'nem'}>
           <SelectTrigger id="furniture">
            <SelectValue />
           </SelectTrigger>
           <SelectContent>
            <SelectItem value="igen">Igen</SelectItem>
            <SelectItem value="nem">Nem</SelectItem>
           </SelectContent>
          </Select>
          {errors.furniture && (
           <div className="text-sm text-red-600 dark:text-red-400">
            {errors.furniture}
           </div>
          )}
         </div>

         <div className="space-y-2">
          <Label htmlFor="appliances" className="block text-sm font-medium">
           Gépesített
          </Label>
          <Select
           name="appliances"
           defaultValue={property?.appliances ?? 'nem'}
          >
           <SelectTrigger id="appliances">
            <SelectValue />
           </SelectTrigger>
           <SelectContent>
            <SelectItem value="igen">Igen</SelectItem>
            <SelectItem value="nem">Nem</SelectItem>
           </SelectContent>
          </Select>
          {errors.appliances && (
           <div className="text-sm text-red-600 dark:text-red-400">
            {errors.appliances}
           </div>
          )}
         </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <Label
           htmlFor="air_conditioning"
           className="block text-sm font-medium"
          >
           Légkondicionáló
          </Label>
          <Select
           name="air_conditioning"
           defaultValue={property?.air_conditioning ?? 'nem'}
          >
           <SelectTrigger id="air_conditioning">
            <SelectValue />
           </SelectTrigger>
           <SelectContent>
            <SelectItem value="igen">Igen</SelectItem>
            <SelectItem value="nem">Nem</SelectItem>
           </SelectContent>
          </Select>
          {errors.air_conditioning && (
           <div className="text-sm text-red-600 dark:text-red-400">
            {errors.air_conditioning}
           </div>
          )}
         </div>

         <div className="space-y-2">
          <Label htmlFor="elevator" className="block text-sm font-medium">
           Lift
          </Label>
          <Select name="elevator" defaultValue={property?.elevator ?? 'nem'}>
           <SelectTrigger id="elevator">
            <SelectValue />
           </SelectTrigger>
           <SelectContent>
            <SelectItem value="igen">Igen</SelectItem>
            <SelectItem value="nem">Nem</SelectItem>
           </SelectContent>
          </Select>
          {errors.elevator && (
           <div className="text-sm text-red-600 dark:text-red-400">
            {errors.elevator}
           </div>
          )}
         </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <Label htmlFor="smoking" className="block text-sm font-medium">
           Dohányzás engedélyezett
          </Label>
          <Select name="smoking" defaultValue={property?.smoking ?? 'nem'}>
           <SelectTrigger id="smoking">
            <SelectValue />
           </SelectTrigger>
           <SelectContent>
            <SelectItem value="nem">Nem</SelectItem>
            <SelectItem value="igen">Igen</SelectItem>
           </SelectContent>
          </Select>
          {errors.smoking && (
           <div className="text-sm text-red-600 dark:text-red-400">
            {errors.smoking}
           </div>
          )}
         </div>

         <div className="space-y-2">
          <Label htmlFor="pets" className="block text-sm font-medium">
           Háziállat engedélyezett
          </Label>
          <Select name="pets" defaultValue={property?.pets ?? 'nem'}>
           <SelectTrigger id="pets">
            <SelectValue />
           </SelectTrigger>
           <SelectContent>
            <SelectItem value="nem">Nem</SelectItem>
            <SelectItem value="igen">Igen</SelectItem>
           </SelectContent>
          </Select>
          {errors.pets && (
           <div className="text-sm text-red-600 dark:text-red-400">
            {errors.pets}
           </div>
          )}
         </div>
        </div>

        <div className="space-y-2">
         <Label htmlFor="is_featured" className="block text-sm font-medium">
          Kiemelt hirdetés
         </Label>
         <Select
          name="is_featured"
          defaultValue={property?.is_featured ?? 'nem'}
         >
          <SelectTrigger id="is_featured">
           <SelectValue />
          </SelectTrigger>
          <SelectContent>
           <SelectItem value="igen">Igen</SelectItem>
           <SelectItem value="nem">Nem</SelectItem>
          </SelectContent>
         </Select>
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
         <Label
          htmlFor="short_description"
          className="block text-sm font-medium"
         >
          Rövid leírás
         </Label>
         <RichTextEditor
          name="short_description"
          id="short_description"
          defaultValue={property?.short_description ?? ''}
          minHeight="100px"
         />
        </div>

        <div className="space-y-2">
         <Label htmlFor="description" className="block text-sm font-medium">
          Részletes leírás
         </Label>
         <RichTextEditor
          name="description"
          id="description"
          defaultValue={property?.description ?? ''}
          minHeight="200px"
         />
        </div>
       </div>

       {/* SEO */}
       <div className="space-y-4">
        <h3 className="text-lg font-medium">SEO</h3>

        <div className="space-y-2">
         <Label htmlFor="meta_title" className="block text-sm font-medium">
          Meta cím
         </Label>
         <Input
          type="text"
          name="meta_title"
          id="meta_title"
          maxLength={255}
          defaultValue={property?.meta_title ?? ''}
          className="w-full rounded-md px-3 py-2"
         />
        </div>

        <div className="space-y-2">
         <Label
          htmlFor="meta_description"
          className="block text-sm font-medium"
         >
          Meta leírás
         </Label>
         <Textarea
          name="meta_description"
          id="meta_description"
          rows={3}
          maxLength={500}
          defaultValue={property?.meta_description ?? ''}
          className="w-full rounded-md px-3 py-2"
         />
        </div>

        <div className="space-y-2">
         <Label htmlFor="meta_keywords" className="block text-sm font-medium">
          Meta kulcsszavak
         </Label>
         <Input
          type="text"
          name="meta_keywords"
          id="meta_keywords"
          maxLength={500}
          defaultValue={property?.meta_keywords ?? ''}
          className="w-full rounded-md px-3 py-2"
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
