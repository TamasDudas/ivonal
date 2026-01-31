import { Property } from '@/types';
import DOMPurify from 'dompurify';
import { Card } from '../ui/card';

interface Props {
 property: Property;
}

export default function PropertyDetails({ property }: Props) {
 return (
  <>
   <div className="mt-8 grid grid-cols-1 gap-x-36 gap-y-4 md:grid-cols-2 md:px-24">
    {property.heating_type && (
     <div className="flex justify-between border-b border-chart-4 py-2">
      <span>Fűtés</span>
      <span className="font-medium">{property.heating_type}</span>
     </div>
    )}
    {property.year_built && (
     <div className="flex justify-between border-b border-chart-4 py-2">
      <span>Építés éve</span>
      <span className="font-medium">{property.year_built}</span>
     </div>
    )}
    {property.floor !== undefined && (
     <div className="flex justify-between border-b border-chart-4 py-2">
      <span>Emelet</span>
      <span className="font-medium">
       {property.floor === 0 ? 'Földszint' : `${property.floor}. emelet`}
      </span>
     </div>
    )}
    {property.building_floors > 0 && (
     <div className="flex justify-between border-b border-chart-4 py-2">
      <span>Épület szintjei</span>
      <span className="font-medium">{property.building_floors}</span>
     </div>
    )}
    {property.view && (
     <div className="flex justify-between border-b border-chart-4 py-2">
      <span>Kilátás</span>
      <span className="font-medium">{property.view}</span>
     </div>
    )}
    {property.minimum_rental_period && (
     <div className="flex justify-between border-b border-chart-4 py-2">
      <span>Minimum bérleti idő</span>
      <span className="font-medium">{property.minimum_rental_period}</span>
     </div>
    )}
    <div className="flex justify-between border-b border-chart-4 py-2">
     <span>Erkély</span>
     <span className="font-medium">{property.balcony ? 'Van' : 'Nincs'}</span>
    </div>
    <div className="flex justify-between border-b border-chart-4 py-2">
     <span>Lift</span>
     <span className="font-medium">{property.elevator ? 'Van' : 'Nincs'}</span>
    </div>
    <div className="flex justify-between border-b border-chart-4 py-2">
     <span>Bútorozva</span>
     <span className="font-medium">{property.furniture ? 'Igen' : 'Nem'}</span>
    </div>
    <div className="flex justify-between border-b border-chart-4 py-2">
     <span>Gépesítve</span>
     <span className="font-medium">{property.appliances ? 'Igen' : 'Nem'}</span>
    </div>
    <div className="flex justify-between border-b border-chart-4 py-2">
     <span>Légkondicionáló</span>
     <span className="font-medium">
      {property.air_conditioning ? 'Van' : 'Nincs'}
     </span>
    </div>
    <div className="flex justify-between border-b border-chart-4 py-2">
     <span>Parkolás</span>
     <span className="font-medium">{property.parking ? 'Van' : 'Nincs'}</span>
    </div>
    <div className="flex justify-between border-b border-chart-4 py-2">
     <span>Dohányzás</span>
     <span className="font-medium">
      {property.smoking === 'igen' ? 'Engedélyezett' : 'Tilos'}
     </span>
    </div>
    <div className="flex justify-between border-b border-chart-4 py-2">
     <span>Kisállat</span>
     <span className="font-medium">
      {property.pets === 'igen' ? 'Engedélyezett' : 'Tilos'}
     </span>
    </div>
   </div>
   <div className="mt-8 grid grid-cols-1 gap-x-36 gap-y-4 md:px-24">
    <Card className="px-6">
     <div
      className="prose max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{
       __html: DOMPurify.sanitize(property.description),
      }}
     ></div>
    </Card>
   </div>
  </>
 );
}
