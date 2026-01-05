import { store, update } from '@/actions/App/Http/Controllers/CityController';
import AppLayout from '@/layouts/app-layout';
import { Form } from '@inertiajs/react';
import { Button } from '../ui/button';

interface City {
 id: number;
 name: string;
 description: string;
 meta_title: string;
 meta_description: string;
 meta_keywords: string;
}

interface Props {
 city?: City;
}

export default function CityForm({ city }: Props) {
 const isEditing = !!city;
 return (
  <AppLayout>
   <div className="flex min-h-screen items-center justify-center p-4">
    <Form
     action={isEditing ? update.url(city.id) : store.url()}
     method={isEditing ? 'patch' : 'post'}
     resetOnSuccess={!isEditing}
     className="w-3xl space-y-4 overflow-hidden px-4 py-6 shadow-xl sm:rounded-lg"
    >
     <h2 className="mb-6 text-2xl font-semibold">
      {isEditing ? 'Város Szerkesztése' : 'Város Létrehozása'}
     </h2>

     <div className="space-y-2">
      <label htmlFor="name" className="block text-sm font-medium">
       Város neve
      </label>
      <input
       type="text"
       name="name"
       defaultValue={city?.name || ''}
       id="name"
       required
       className="w-full rounded-md border px-3 py-2"
      />
     </div>

     <div className="space-y-2">
      <label htmlFor="description" className="block text-sm font-medium">
       Város leírása
      </label>
      <textarea
       name="description"
       id="description"
       defaultValue={city?.description || ''}
       rows={4}
       className="w-full rounded-md border px-3 py-2"
      ></textarea>
     </div>

     <div className="space-y-2">
      <label htmlFor="meta_title" className="block text-sm font-medium">
       SEO Meta cím
      </label>
      <input
       type="text"
       name="meta_title"
       id="meta_title"
       defaultValue={city?.meta_title || ''}
       className="w-full rounded-md border px-3 py-2"
      />
     </div>

     <div className="space-y-2">
      <label htmlFor="meta_description" className="block text-sm font-medium">
       SEO Meta leírás
      </label>
      <textarea
       name="meta_description"
       id="meta_description"
       defaultValue={city?.meta_description || ''}
       rows={3}
       className="w-full rounded-md border px-3 py-2"
      ></textarea>
     </div>

     <div className="space-y-2">
      <label htmlFor="meta_keywords" className="block text-sm font-medium">
       SEO Meta kulcsszó
      </label>
      <input
       type="text"
       name="meta_keywords"
       id="meta_keywords"
       defaultValue={city?.meta_keywords || ''}
       className="w-full rounded-md border px-3 py-2"
      />
     </div>
     <div className="flex justify-center py-4">
      <Button
       type="submit"
       className="py- bg-chart-1 w-80 rounded-md px-8 py-2"
       variant="outline"
      >
       {isEditing ? 'Frissítés' : 'Létrehozás'}
      </Button>
     </div>
    </Form>
   </div>
  </AppLayout>
 );
}
