import PropertyForm from '@/components/forms/property-form';

interface Property {
 id: number;
 city_id: number;
 street: string;
 latitude?: number | null;
 longitude?: number | null;
 rental_price?: string | null;
 sale_price?: string | null;
 size?: string | null;
 floor_area?: string | null;
 minimum_rental_period?: string | null;
 year_built?: string | null;
 building_floors?: string | null;
 floor?: string | null;
 balcony?: string | null;
 view?: string | null;
 heating_type?: string | null;
 parking?: string | null;
 furniture: 'igen' | 'nem';
 appliances: 'igen' | 'nem';
 air_conditioning: 'igen' | 'nem';
 elevator: 'igen' | 'nem';
 smoking: 'igen' | 'nem';
 pets: 'igen' | 'nem';
 is_featured: 'igen' | 'nem';
 short_description?: string | null;
 description?: string | null;
 meta_title?: string | null;
 meta_description?: string | null;
 meta_keywords?: string | null;
}

interface City {
 id: number;
 name: string;
}

interface Props {
 property?: Property;
 cities: City[];
}

export default function PropertyUpdate({ cities, property }: Props) {
 return (
  <div>
   <PropertyForm cities={cities} property={property} />
  </div>
 );
}
