import { store, update } from '@/actions/App/Http/Controllers/CityController';
import AppLayout from '@/layouts/app-layout';
import { City } from '@/types';
import { Form } from '@inertiajs/react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RichTextEditor } from '../ui/rich-text-editor';

interface Props {
 city?: City;
}

export default function CityForm({ city }: Props) {
 const isEditing = !!city;
 return (
  <AppLayout>
   <div className="flex min-h-screen items-center justify-center p-4">
    <Form
     action={isEditing ? update.url(city!.id) : store.url()}
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

       <div className="flex justify-center py-4">
        <Button
         type="submit"
         disabled={processing}
         className="w-80"
         variant="outline"
         size="lg"
        >
         {processing
          ? isEditing
            ? 'Frissítés...'
            : 'Létrehozása...'
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
