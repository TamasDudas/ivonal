import PropertyForm from '@/components/forms/property-form';

interface City {
 id: number;
 name: string;
}

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
