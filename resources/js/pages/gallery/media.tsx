import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
import { City, Media, PaginatedData, Property } from '@/types';
import { Head, InfiniteScroll, router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
 images: PaginatedData<Media>;
 cities: City[];
 properties: Property[];
}

export default function MediaGallery({ images, cities, properties }: Props) {
 const [selectedType, setSelectedType] = useState<'city' | 'property'>('city');
 const [selectedEntity, setSelectedEntity] = useState<number | null>(null);
 const [isFeatured, setIsFeatured] = useState(false);
 const [selectedImages, setSelectedImages] = useState<number[]>([]);
 const [imageToDelete, setImageToDelete] = useState<Media | null>(null);

 const toggleImageSelection = (imageId: number) => {
  setSelectedImages((prev) => {
   // Featured esetén (város vagy ingatlan) csak egy képet engedünk
   if (selectedType === 'city' || (selectedType === 'property' && isFeatured)) {
    return prev.includes(imageId) ? [] : [imageId];
   }

   // Galéria esetén több képet is lehet választani
   return prev.includes(imageId)
    ? prev.filter((id) => id !== imageId)
    : [...prev, imageId];
  });
 };

 const handleAssignSelected = () => {
  if (!selectedEntity || selectedImages.length === 0) return;

  // Galéria: egy kérésben küldjük
  if (selectedType === 'property' && !isFeatured) {
   router.post('/media/assign-gallery', {
    property_id: selectedEntity,
    media_ids: selectedImages,
   });
   setSelectedImages([]);
   return;
  }

  // Város vagy featured: sorban küldés
  const sendImages = (index = 0) => {
   if (index >= selectedImages.length) {
    setSelectedImages([]);
    router.reload();
    return;
   }

   const url =
    selectedType === 'city'
     ? `/media/${selectedImages[index]}/assign-city`
     : `/media/${selectedImages[index]}/assign-property`;

   const data =
    selectedType === 'city'
     ? { city_id: selectedEntity }
     : { property_id: selectedEntity };

   router.patch(url, data, {
    preserveState: true,
    onSuccess: () => sendImages(index + 1),
   });
  };

  sendImages();
 };

 const confirmImageToDelete = () => {
  if (!imageToDelete) return;

  router.delete(`/media/${imageToDelete.id}`, {
   preserveScroll: true,
   onSuccess: () => {
    setImageToDelete(null);
   },
  });
 };

 return (
  <AppLayout>
   <Head title="Galéria" />
   <div className="my-6">
    <h2 className="text-center text-5xl">Galléria</h2>
   </div>
   <div className="mb-6 flex flex-col gap-4 rounded border border-ring p-4 lg:flex-row lg:items-end">
    <div className="lg:items-centerö flex flex-1 flex-col gap-4 lg:flex-row">
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
        onCheckedChange={(checked) => {
         setIsFeatured(checked === true);
         // Featured váltáskor töröljük a kiválasztást
         if (checked) {
          setSelectedImages([]);
         }
        }}
       />
       Featured kép
      </label>
     )}
    </div>
    <div className="flex-shrink-0">
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
   </div>
   <div className="max-h-[70vh] overflow-y-auto">
    <InfiniteScroll
     data="images"
     className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4"
     loading={<div className="col-span-full mt-4 text-center">Betöltés...</div>}
    >
     {images.data.map((img) => (
      <div key={img.id} className="relative rounded border border-ring p-3">
       <div className="mb-6">
        <Checkbox
         checked={selectedImages.includes(img.id)}
         onCheckedChange={() => toggleImageSelection(img.id)}
         className="absolute top-2 left-2 border border-ring"
        />
       </div>
       <img
        src={img.url}
        alt={img.alt_text || ''}
        className="max-h-40 w-full rounded-3xl object-cover"
       />
       <div className="mt-2 text-center text-sm">
        {selectedImages.includes(img.id)
         ? 'Kiválasztva'
         : 'Kattints a kiválasztáshoz'}
       </div>
       <div className="mt-6 flex items-center justify-center">
        <Button
         onClick={() => setImageToDelete(img)}
         className="bg-red-700 text-white"
        >
         Kép törlése
        </Button>
       </div>
      </div>
     ))}
    </InfiniteScroll>
   </div>
   {/* AlertDialog a kép törlésének megerősítéséhez */}
   <AlertDialog
    open={!!imageToDelete}
    onOpenChange={(open) => !open && setImageToDelete(null)}
   >
    <AlertDialogContent>
     <AlertDialogHeader>
      <AlertDialogTitle>Biztosan törölni szeretnéd?</AlertDialogTitle>
      <AlertDialogDescription>
       Véglegesen törlöd ezt a képet:{' '}
       <strong>{imageToDelete?.original_filename}</strong>
       <br />
       <br />
       Ez a művelet nem vonható vissza, és a kép törlődik minden kategóriából
       is!
      </AlertDialogDescription>
     </AlertDialogHeader>
     <AlertDialogFooter>
      <AlertDialogCancel>Mégse</AlertDialogCancel>
      <AlertDialogAction onClick={confirmImageToDelete}>
       Törlés
      </AlertDialogAction>
     </AlertDialogFooter>
    </AlertDialogContent>
   </AlertDialog>
  </AppLayout>
 );
}
