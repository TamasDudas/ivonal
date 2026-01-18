import PropertyForm from '@/components/forms/property-form';
import { City } from '@/types';

interface Props {
 cities: City[];
}

export default function PropertyCreate({ cities }: Props) {
 return (
  <div>
   <PropertyForm cities={cities} />
  </div>
 );
}
