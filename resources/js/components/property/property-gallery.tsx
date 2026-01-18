import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface Props {
 images: string[];
}

export default function PropertyGallery({ images }: Props) {
 // Melyik képnél nyíljon meg a lightbox (-1 = zárva)
 const [index, setIndex] = useState(-1);

 // Ha nincs kép, ne jelenítsünk meg semmit
 if (!images || images.length === 0) {
  return null;
 }

 // Lightbox-nak szükséges formátum: { src: string }[]
 const slides = images.map((src) => ({ src }));

 return (
  <div className="mt-8">
   <h3 className="mb-4 text-2xl font-semibold text-sidebar-accent">Galéria</h3>

   {/* Thumbnail grid - a kis előnézeti képek */}
   <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    {images.map((image, i) => (
     <button
      key={i}
      type="button"
      onClick={() => setIndex(i)} // Kattintásra megnyitja a lightbox-ot ennél a képnél
      className="overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
     >
      <img
       src={image}
       alt={`Kép ${i + 1}`}
       className="h-40 w-full object-cover transition-transform duration-300 hover:scale-105"
      />
     </button>
    ))}
   </div>

   {/* Lightbox - csak akkor renderelődik, ha index >= 0 */}
   <Lightbox
    open={index >= 0}
    index={index}
    close={() => setIndex(-1)}
    slides={slides}
   />
  </div>
 );
}
