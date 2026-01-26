import { store, update } from '@/actions/App/Http/Controllers/CityController';
import AppLayout from '@/layouts/app-layout';
import { City } from '@/types';
import { Form } from '@inertiajs/react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RichTextEditor } from '../ui/rich-text-editor';
import { Textarea } from '../ui/textarea';

interface Props {
 city?: City;
}

export default function CityForm({ city }: Props) {
 const isEditing = !!city;
 return (
  <AppLayout>
   <div className="flex min-h-screen items-center justify-center p-4">
    <Form
     action={isEditing ? update.url(city!.slug) : store.url()}
     method={isEditing ? 'patch' : 'post'}
     resetOnSuccess={!isEditing}
     onSuccess={() => {
      toast.success(
       isEditing ? 'Város sikeresen frissítve' : 'Város sikeresen létrehozva',
      );
     }}
     onError={() => {
      toast.error('Mentés sikertelen', {
       description: 'Ellenőrizd a mezőket, és próbáld újra.',
      });
     }}
     className="w-3xl space-y-4 overflow-hidden px-4 py-6 shadow-xl sm:rounded-lg"
    >
     {({ errors, processing }) => (
      <>
       <h2 className="mb-6 text-2xl font-semibold">
        {isEditing ? 'Város Szerkesztése' : 'Város Létrehozása'}
       </h2>

       {errors.error && (
        <div className="text-sm text-red-600 dark:text-red-400">
         {errors.error}
        </div>
       )}

       <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
         Város neve
        </Label>
        <Input
         type="text"
         name="name"
         defaultValue={city?.name || ''}
         id="name"
        />
        {errors.name && (
         <div className="text-sm text-red-600 dark:text-red-400">
          {errors.name}
         </div>
        )}
       </div>

       <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
         Város leírása
        </Label>
        <RichTextEditor
         name="description"
         id="description"
         defaultValue={city?.description ?? ''}
         minHeight="200px"
        />
        {errors.description && (
         <div className="text-sm text-red-600 dark:text-red-400">
          {errors.description}
         </div>
        )}
       </div>

       <div className="space-y-2">
        <Label htmlFor="meta_title" className="text-sm font-medium">
         SEO Meta cím
        </Label>
        <Input
         type="text"
         name="meta_title"
         id="meta_title"
         defaultValue={city?.meta_title || ''}
        />
        {errors.meta_title && (
         <div className="text-sm text-red-600 dark:text-red-400">
          {errors.meta_title}
         </div>
        )}
       </div>

       <div className="space-y-2">
        <Label htmlFor="meta_description" className="text-sm font-medium">
         SEO Meta leírás
        </Label>
        <Textarea
         name="meta_description"
         id="meta_description"
         defaultValue={city?.meta_description || ''}
         rows={3}
        />
        {errors.meta_description && (
         <div className="text-sm text-red-600 dark:text-red-400">
          {errors.meta_description}
         </div>
        )}
       </div>

       <div className="space-y-2">
        <Label htmlFor="meta_keywords" className="text-sm font-medium">
         SEO Meta kulcsszó
        </Label>
        <Input
         type="text"
         name="meta_keywords"
         id="meta_keywords"
         defaultValue={city?.meta_keywords || ''}
        />
        {errors.meta_keywords && (
         <div className="text-sm text-red-600 dark:text-red-400">
          {errors.meta_keywords}
         </div>
        )}
       </div>
       <div className="flex justify-center py-4">
        <Button
         type="submit"
         disabled={processing}
         className="py- w-80 rounded-md bg-chart-1 px-8 py-2"
         variant="outline"
        >
         {processing
          ? isEditing
            ? 'Frissítés...'
            : 'Létrehozás...'
          : isEditing
            ? 'Frissítés'
            : 'Létrehozás'}
        </Button>
       </div>
      </>
     )}
    </Form>
   </div>
  </AppLayout>
 );
}
