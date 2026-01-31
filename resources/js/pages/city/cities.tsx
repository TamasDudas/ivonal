import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { City } from '@/types';
import DOMPurify from 'dompurify';

interface Props {
 cities: {
  data: City[];
 };
}

export default function Cities({ cities }: Props) {
 return (
  <AppLayout>
   <div className="container mx-auto px-4 py-8">
    <h1 className="mb-6 text-3xl font-bold">Cities</h1>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
     {cities.data.map((city) => (
      <Card className="mb-4 rounded-3xl pt-0">
       <img
        src={city.featured_image}
        alt={`${city.name} - Ingatlanvonal`}
        className="h-60 w-full rounded-t-3xl object-cover"
        loading="lazy"
        decoding="async"
       />
       <h3 className="mt-2 text-center text-4xl font-light text-sidebar-accent">
        {city.name}
       </h3>
       <div
        className="px-4"
        dangerouslySetInnerHTML={{
         __html: DOMPurify.sanitize(city.description),
        }}
       ></div>
      </Card>
     ))}
    </div>
   </div>
  </AppLayout>
 );
}
