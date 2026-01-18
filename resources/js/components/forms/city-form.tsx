import { store, update } from '@/actions/App/Http/Controllers/CityController';
import AppLayout from '@/layouts/app-layout';
import { City } from '@/types';
import { Form } from '@inertiajs/react';
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
     className="w-3xl space-y-4 overflow-hidden px-4 py-6 shadow-xl sm:rounded-lg"
    >
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
       required
      />
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
     </div>
     <div className="flex justify-center py-4">
      <Button
       type="submit"
       className="py- w-80 rounded-md bg-chart-1 px-8 py-2"
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
