import { router } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '../ui/select';

interface Property {
 id: number;
 street: string;
}

interface City {
 id: number;
 name: string;
}

interface Props {
 properties: {
  data: Property[];
 };
 cities: {
  data: City[];
 };
}

export default function UploadImageForm({ properties, cities }: Props) {
 const [previews, setPreviews] = useState<string[]>([]);
 const [processing, setProcessing] = useState(false);
 const [images, setImages] = useState<File[]>([]);
 const [altText, setAltText] = useState('');
 const [cityId, setCityId] = useState<number | null>(null);
 const [propertyId, setPropertyId] = useState<number | null>(null);

 //Képek kezelése
 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFiles = Array.from(e.target.files || []);

  if (selectedFiles.length === 0) return;

  setImages((prev) => [...prev, ...selectedFiles]);

  const promises = selectedFiles.map(
   (file) =>
    new Promise<string>((resolve, reject) => {
     const reader = new FileReader();
     reader.onload = () => resolve(reader.result as string);
     reader.onerror = () => reject(new Error('Fájl olvasási hiba'));
     reader.readAsDataURL(file);
    }),
  );

  Promise.all(promises)
   .then((results) => {
    setPreviews((prev) => [...prev, ...results]);
   })
   .catch((error) => {
    console.error('Hiba a képek betöltésekor:', error);
    // Ide egy toast notification kell még
   });

  e.target.value = '';
 };

 //Képek törlése
 const removeImage = (index: number) => {
  setImages((prev) => prev.filter((_, i) => i !== index));
  setPreviews((prev) => prev.filter((_, i) => i !== index));
 };

 //Város kezelése
 const handleCityChange = (selectedCityId: number) => {
  setCityId(selectedCityId);
 };

 //Ingatlan kezelése
 const handlePropertyChange = (selectedPropertyId: number) => {
  setPropertyId(selectedPropertyId);
 };

 //Form elküldése
 const handleSubmit: FormEventHandler = (e) => {
  e.preventDefault();

  if (images.length === 0) {
   alert('Kérlek válassz legalább egy képet');
   return;
  }

  setProcessing(true);

  const formData = new FormData();

  images.forEach((file, index) => {
   formData.append(`images[${index}]`, file);
  });

  if (altText) {
   formData.append('altText', altText);
  }

  if (cityId) {
   formData.append('city_id', cityId.toString());
  }

  if (propertyId) {
   formData.append('property_id', propertyId.toString());
  }

  router.post('/media', formData, {
   onSuccess: () => {
    (setImages([]),
     setAltText(''),
     setCityId(null),
     setPropertyId(null),
     setPreviews([]),
     setProcessing(false));
   },
  });
 };
 return (
  <div className="flex w-full flex-col items-center justify-center py-8">
   <form
    onSubmit={handleSubmit}
    className="flex w-full max-w-xl flex-col gap-4"
   >
    <div>
     <label htmlFor="images">Képek feltöltése</label>
     <Input
      id="images"
      type="file"
      name="images[]"
      accept="image/*"
      multiple
      onChange={handleFileChange}
     />

     {previews.length > 0 && (
      <div className="mt-4">
       <Label>Kiválasztott képek ({previews.length}):</Label>
       <div className="mt-2 grid grid-cols-4 gap-4">
        {previews.map((preview, index) => (
         <div key={index}>
          <img
           src={preview}
           alt={`Előnézet ${index + 1}`}
           className="max-h-32 w-full rounded border object-cover"
          />
          <button onClick={() => removeImage(index)}>x</button>
         </div>
        ))}
       </div>
      </div>
     )}
    </div>
    <div>
     <Label>Város kiválasztása</Label>
     <Select onValueChange={(value) => handleCityChange(Number(value))}>
      <SelectTrigger>
       <SelectValue placeholder="Válassz várost" />
      </SelectTrigger>
      <SelectContent>
       {cities.data.map((city) => (
        <SelectItem key={city.id} value={city.id.toString()}>
         {city.name}
        </SelectItem>
       ))}
      </SelectContent>
     </Select>
     Ingatlan kiválasztása
     <Label>Ingatlan</Label>
     <Select onValueChange={(value) => handlePropertyChange(Number(value))}>
      <SelectTrigger>
       <SelectValue placeholder="Válassz ingatlant" />
      </SelectTrigger>
      <SelectContent>
       {properties.data.map((property) => (
        <SelectItem key={property.id} value={property.id.toString()}>
         {property.street}
        </SelectItem>
       ))}
      </SelectContent>
     </Select>
    </div>
    <Button type="submit" disabled={processing}>
     {processing ? 'Feltöltés...' : 'Feltöltés'}
    </Button>
   </form>
  </div>
 );
}
