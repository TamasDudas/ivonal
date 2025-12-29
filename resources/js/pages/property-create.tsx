import PropertyForm from '@/components/forms/property-form';

interface City {
  id: number;
  name: string;
}

interface Props {
  cities: City[] | { data: City[] };
}

export default function PropertyCreate({ cities }: Props) {
  // A page felelős az adat normalizálásért - itt kezeljük a különböző formátumokat
  const cityList = Array.isArray(cities) ? cities : cities?.data || [];

  return (
    <div>
      {/* A komponensnek már csak egyszerű tömböt adunk át */}
      <PropertyForm cities={cityList} />
    </div>
  );
}
