import AppLayout from '@/layouts/app-layout';
import { City, Property } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface Props {
 properties: {
  data: Property[];
 };
 city: City;
}

export default function PropertiesByCity({ properties, city }: Props) {
 return (
  <AppLayout>
   <Head title={city.name} />
   <h1 className="mb-6 text-4xl font-bold text-sidebar-accent">{city.name}</h1>
   {properties.data.map((property) => (
    <div
     key={property.id}
     className="mb-6 grid grid-cols-1 gap-4 border-b border-sidebar-accent pb-6 md:grid-cols-2 md:gap-12"
    >
     <img
      src={property.featured_image}
      alt={`${property.street} - Ingatlanvonal`}
      className="max-h-60 w-full rounded-3xl object-cover md:max-h-80"
      loading="lazy"
      decoding="async"
     />

     <div className="flex flex-col justify-center gap-4 md:gap-6">
      <h2 className="text-center text-2xl font-semibold text-sidebar-accent md:text-3xl">
       {property.street}
      </h2>
      <div
       className="text-base leading-relaxed md:text-xl [&_li]:m-0 [&_ol]:m-0 [&_p]:m-0 [&_ul]:m-0"
       dangerouslySetInnerHTML={{ __html: property.short_description }}
      />
      <div className="flex items-center justify-center">
       <Link
        href={route('properties.show', { property: property.slug })}
        className="inline-block w-50 rounded-3xl border border-input bg-input/30 px-3 py-2 text-center shadow-xs hover:bg-input/50"
       >
        Megnézem
       </Link>
      </div>
     </div>
    </div>
   ))}
  </AppLayout>
 );
}
