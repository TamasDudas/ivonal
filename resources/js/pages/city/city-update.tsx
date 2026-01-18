import CityForm from '@/components/forms/city-form';
import { City } from '@/types';

interface Props {
 city?: City;
}

export default function cityUpdate({ city }: Props) {
 return (
  <div>
   <CityForm city={city} />
  </div>
 );
}
