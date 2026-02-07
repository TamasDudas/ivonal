import Map from '@/components/map';
import PropertyDetails from '@/components/property/property-details';
import PropertyGallery from '@/components/property/property-gallery';
import AppLayout from '@/layouts/app-layout';
import { Property } from '@/types';

interface Props {
 property: {
  data: Property;
 };
}

export default function PropertyPage({ property }: Props) {
 const propertyData = property.data;

 const formatPrice = (price: number) => {
  return new Intl.NumberFormat('hu-HU').format(price);
 };

 return (
  <AppLayout>
   <div className="py-6">
    <h2 className="text-4xl font-extrabold text-sidebar-accent">
     {propertyData.street}
    </h2>
   </div>
   {/* Featured Image */}
   <div className="relative flex justify-center">
    <img
     src={propertyData.featured_image}
     alt={propertyData.street}
     className="max-h-96 w-full rounded-2xl object-cover"
     loading="eager"
     decoding="async"
    />
    <div className="absolute inset-0 rounded-2xl bg-chart-4 opacity-10"></div>
   </div>

   {/* Price and Size */}
   <div className="mt-6 flex flex-col items-center justify-center gap-4 py-8 md:flex-row md:gap-12">
    {propertyData.rental_price > 0 && (
     <div className="text-center">
      <p className="text-sm text-muted-foreground">Bérleti díj</p>
      <p className="text-3xl font-medium text-sidebar-accent">
       {formatPrice(propertyData.rental_price)} Ft/hó
      </p>
     </div>
    )}
    {propertyData.sale_price > 0 && (
     <div className="text-center">
      <p className="text-sm text-muted-foreground">Eladási ár</p>
      <p className="text-3xl font-medium text-sidebar-accent">
       {formatPrice(propertyData.sale_price)} Ft
      </p>
     </div>
    )}
    <div className="text-center">
     <p className="text-sm text-muted-foreground">Alapterület</p>
     <p className="text-3xl font-medium text-sidebar-accent">
      {propertyData.size} m²
     </p>
    </div>
   </div>

   {/* Property Details */}
   <PropertyDetails property={propertyData} />
   {/* Property Gallery */}
   <PropertyGallery images={propertyData.images ?? []} />

   {/* Property Map */}
   {propertyData.latitude && propertyData.longitude && (
    <div className="mt-8">
     <h3 className="mb-4 text-2xl font-semibold text-sidebar-accent">Hely</h3>
     <Map
      latitude={propertyData.latitude}
      longitude={propertyData.longitude}
      height="400px"
     />
    </div>
   )}
  </AppLayout>
 );
}
