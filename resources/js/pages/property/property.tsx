import AppLayout from '@/layouts/app-layout';

export interface Property {
 id: number;
 city_id: number;
 featured_img_id: number;
 street: string;
 slug: string;
 rental_price: number;
 size: number;
 sale_price: number;
 minimum_rental_period: number;
 year_built: number;
 building_floors: number;
 floor: number;
 balcony: boolean;
 furniture: boolean;
 appliances: boolean;
 view: string;
 heating_type: string;
 parking: boolean;
 air_conditioning: boolean;
 smoking: boolean;
 pets: boolean;
 elevator: boolean;
 is_featured: boolean;
 floor_area: number;
 short_description: string;
 description: string;
 meta_title: string;
 meta_description: string;
 meta_keywords: string;
 city_name?: string;
 featured_image?: string;
 images?: string[];
 created_at: string;
 updated_at: string;
}

interface Props {
 property: {
  data: Property;
 };
}

export default function Property({ property }: Props) {
 const proprtyData = property.data;
 return <AppLayout>{proprtyData.city_name}</AppLayout>;
}
