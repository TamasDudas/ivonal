import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface Media {
 image_url: string;
 id: number;
 alt_text?: string;
}

interface City {
 id: number;
 name: string;
}
interface Property {
 id: number;
 street: string;
}

interface Props {
 images: {
  data: Media[];
 };
 cities: City[];
 properties: Property[];
}

export default function Media({ images, cities, properties }: Props) {
 const [selectedType, setSelectedType] = useState<'city' | 'property'>('city');
 const [selectedEntity, setSelectedEntity] = useState<number | null>(null);
 const [isFeatured, setIsFeatured] = useState(true);
 const [selectedImages, setSelectedImages] = useState<number[]>([]);

 const toggleImageSelection = (imageId: number) => {
  setSelectedImages((prev) =>
   prev.includes(imageId)
    ? prev.filter((id) => id !== imageId)
    : [...prev, imageId],
  );
 };

 const handleAssignSelected = () => {
  if (!selectedEntity || selectedImages.length === 0) return;

  selectedImages.forEach((mediaId) => {
   if (selectedType === 'city') {
    router.patch(`/media/${mediaId}/assign-city`, { city_id: selectedEntity });
   } else {
    if (isFeatured) {
     router.patch(`/media/${mediaId}/assign-property`, {
      property_id: selectedEntity,
     });
    } else {
     router.patch(`/media/${mediaId}/assign-gallery`, {
      property_id: selectedEntity,
     });
    }
   }
  });

  setSelectedImages([]); // Reset selection after assignment
 };

 return (
  <AppLayout>
   <Head title="Galéria" />
   <div className="my-6">
    <h2 className="text-center text-5xl">Galléria</h2>
   </div>
   <div className="mb-6 flex flex-col gap-4 rounded border border-ring p-4">
    <RadioGroup
     value={selectedType}
     onValueChange={(value) => setSelectedType(value as 'city' | 'property')}
     className="flex items-center gap-4"
    >
     <div className="flex items-center gap-2">
      <RadioGroupItem value="city" id="city" />
      <Label htmlFor="city">Város</Label>
     </div>
     <div className="flex items-center gap-2">
      <RadioGroupItem value="property" id="property" />
      <Label htmlFor="property">Ingatlan</Label>
     </div>
    </RadioGroup>
    <Select onValueChange={(value) => setSelectedEntity(Number(value))}>
     <SelectTrigger className="w-64">
      <SelectValue
       placeholder={`Válassz ${selectedType === 'city' ? 'várost' : 'ingatlant'}`}
      />
     </SelectTrigger>
     <SelectContent>
      {(selectedType === 'city' ? cities : properties).map((entity) => (
       <SelectItem key={entity.id} value={entity.id.toString()}>
        {selectedType === 'city'
         ? (entity as City).name
         : (entity as Property).street}
       </SelectItem>
      ))}
     </SelectContent>
    </Select>
    {selectedType === 'property' && (
     <label className="flex items-center gap-2">
      <Checkbox
       checked={isFeatured}
       onCheckedChange={(checked) => setIsFeatured(checked === true)}
      />
      Featured kép
     </label>
    )}
    <Button
     onClick={handleAssignSelected}
     disabled={selectedImages.length === 0}
    >
     Hozzáadás{' '}
     {selectedType === 'city'
      ? 'város featured-ként'
      : isFeatured
        ? 'ingatlan featured-ként'
        : 'ingatlan galériájához'}{' '}
     ({selectedImages.length} kiválasztva)
    </Button>
   </div>
   <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
    {images.data.map((img) => (
     <div key={img.id} className="relative rounded border border-ring p-6">
      <div className="absolute top-2 left-2">
       <Checkbox
        checked={selectedImages.includes(img.id)}
        onCheckedChange={() => toggleImageSelection(img.id)}
        className="border border-ring"
       />
      </div>
      <img
       src={img.image_url}
       alt={img.alt_text || ''}
       className="w-full rounded-3xl"
      />
      <div className="mt-2 text-center text-sm">
       {selectedImages.includes(img.id)
        ? 'Kiválasztva'
        : 'Kattints a kiválasztáshoz'}
      </div>
     </div>
    ))}
   </div>
  </AppLayout>
 );
}
