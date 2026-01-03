import CityForm from '@/components/forms/city-form';

interface City {
 id: number;
 name: string;
 description: string;
 meta_title: string;
 meta_description: string;
 meta_keywords: string;
}

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
