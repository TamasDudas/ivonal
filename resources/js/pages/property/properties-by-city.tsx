import AppLayout from '@/layouts/app-layout';

interface Property {
 id: number;
 title: string;
 street: string;
 short_description: string;
 featured_image: string;
}

interface City {
 id: number;
 name: string;
}

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
     <div className="flex flex-col justify-center gap-4">
      <h2 className="mb-2 text-center text-3xl font-semibold text-sidebar-accent">
       {property.street}
      </h2>
      <p className="text-xl">{property.short_description}</p>
     </div>
    </div>
   ))}
  </AppLayout>
 );
}
