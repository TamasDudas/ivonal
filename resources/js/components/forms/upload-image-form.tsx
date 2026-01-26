import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function UploadImageForm() {
 const [previews, setPreviews] = useState<string[]>([]);
 const [images, setImages] = useState<File[]>([]);
 const [altTexts, setAltTexts] = useState<string[]>([]);
 const [processing, setProcessing] = useState(false);
 const [errors, setErrors] = useState<Record<string, string>>({});

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFiles = Array.from(e.target.files || []);
  if (selectedFiles.length === 0) return;

  setImages((prev) => [...prev, ...selectedFiles]);
  setAltTexts((prev) => [...prev, ...selectedFiles.map(() => '')]);

  Promise.all(
   selectedFiles.map(
    (file) =>
     new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Fájl olvasási hiba'));
      reader.readAsDataURL(file);
     }),
   ),
  ).then((results) => setPreviews((prev) => [...prev, ...results]));

  e.target.value = '';
 };

 const removeImage = (index: number) => {
  setImages((prev) => prev.filter((_, i) => i !== index));
  setAltTexts((prev) => prev.filter((_, i) => i !== index));
  setPreviews((prev) => prev.filter((_, i) => i !== index));
 };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (images.length === 0) return;

  setProcessing(true);
  setErrors({});

  const formData = new FormData();
  images.forEach((file, i) => formData.append(`images[${i}]`, file));
  altTexts.forEach((alt, i) => formData.append(`alt_texts[${i}]`, alt));

  router.post('/media', formData, {
   onSuccess: () => {
    setImages([]);
    setAltTexts([]);
    setPreviews([]);
    toast.success('Képek sikeresen feltöltve!');
   },
   onError: (err) => {
    setErrors(err);
    toast.error('Feltöltés sikertelen', {
     description: err.error || 'Ellenőrizd a mezőket, és próbáld újra.',
    });
   },
   onFinish: () => setProcessing(false),
  });
 };

 return (
  <div className="flex w-full flex-col items-center justify-center py-8">
   <form
    onSubmit={handleSubmit}
    className="flex w-full max-w-xl flex-col gap-4"
   >
    {errors.error && (
     <div className="text-sm text-red-600 dark:text-red-400">
      {errors.error}
     </div>
    )}

    <div>
     <Label htmlFor="images">Képek feltöltése</Label>
     <Input
      id="images"
      type="file"
      accept="image/*"
      multiple
      onChange={handleFileChange}
     />

     {errors.images && (
      <div className="text-sm text-red-600 dark:text-red-400">
       {errors.images}
      </div>
     )}

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
    <Button type="submit" disabled={processing || images.length === 0}>
     {processing ? 'Feltöltés...' : 'Feltöltés'}
    </Button>
   </form>
  </div>
 );
}
