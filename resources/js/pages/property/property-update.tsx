import PropertyForm from '@/components/forms/property-form';
import { City, PropertyFormData } from '@/types';

interface Props {
 property?: PropertyFormData;
 cities: City[];
}

export default function PropertyUpdate({ cities, property }: Props) {
 return (
  <div>
   <PropertyForm cities={cities} property={property} />
  </div>
 );
}
