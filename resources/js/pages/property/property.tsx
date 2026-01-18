import AppLayout from '@/layouts/app-layout';
import { Property } from '@/types';

interface Props {
 property: {
  data: Property;
 };
}

export default function PropertyPage({ property }: Props) {
 const propertyData = property.data;
 return <AppLayout>{propertyData.city_name}</AppLayout>;
}
