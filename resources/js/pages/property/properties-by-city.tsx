import AppLayout from '@/layouts/app-layout';
import { City, Property } from '@/types';
import { Link } from '@inertiajs/react';

interface Props {
 properties: {
  data: Property[];
 };
 city: City;
}

export default function PropertiesByCity({ properties, city }: Props) {
 console.log(properties.data);
 return (
  <AppLayout>
   <h1 className="mb-6 text-4xl font-bold text-sidebar-accent">{city.name}</h1>
   {properties.data.map((property) => (
    <div
     key={property.id}
     className="border- mb-6 grid grid-cols-1 gap-8 border-b border-sidebar-accent pb-6 md:grid-cols-2"
    >
     <img
      src={property.featured_image}
      alt=""
      className="h-85 w-full rounded-3xl object-cover"
     />
     <div className="flex flex-col justify-center gap-6">
      <h2 className="mb-2 text-center text-3xl font-semibold text-sidebar-accent">
       {property.street}
      </h2>
      <div
       className="prose max-w-none text-xl dark:prose-invert"
       dangerouslySetInnerHTML={{ __html: property.short_description }}
      />
      <div className="flex items-center justify-center">
       <Link
        href={`/properties/${property.id}`}
        className="inline-block w-50 rounded-3xl bg-destructive px-3 py-2 text-center hover:bg-accent"
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
