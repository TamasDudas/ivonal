import { router } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function UploadImageForm() {
 const [previews, setPreviews] = useState<string[]>([]);
 const [processing, setProcessing] = useState(false);
 const [images, setImages] = useState<File[]>([]);
 const [altTexts, setAltTexts] = useState<string[]>([]);

 //Képek kezelése
 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFiles = Array.from(e.target.files || []);

  if (selectedFiles.length === 0) return;

  setImages((prev) => [...prev, ...selectedFiles]);

  const newAltTexts = selectedFiles.map(() => '');
  setAltTexts((prev) => [...prev, ...newAltTexts]);

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
  setAltTexts((prev) => prev.filter((_, i) => i !== index));
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

  altTexts.forEach((alt, index) => {
   formData.append(`alt_texts[${index}]`, alt);
  });

  router.post('/media', formData, {
   onSuccess: () => {
    setProcessing(false);
    setImages([]);
    setAltTexts([]);
    setPreviews([]);
   },
   onError: () => {
    setProcessing(false);
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
         <div key={index} className="flex flex-col gap-2">
          <img
           src={preview}
           alt={`Előnézet ${index + 1}`}
           className="max-h-32 w-full rounded border object-cover"
          />
          <Input
           type="text"
           value={altTexts[index] || ''}
           onChange={(e) => {
            const newAltTexts = [...altTexts];
            newAltTexts[index] = e.target.value;
            setAltTexts(newAltTexts);
           }}
           placeholder="Alt szöveg"
           className="text-xs"
          />
          <button
           type="button"
           onClick={() => removeImage(index)}
           className="text-red-500"
          >
           Eltávolít
          </button>
         </div>
        ))}
       </div>
      </div>
     )}
    </div>
    <Button type="submit" disabled={processing}>
     {processing ? 'Feltöltés...' : 'Feltöltés'}
    </Button>
   </form>
  </div>
 );
}
