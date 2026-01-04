import AppLayout from '@/layouts/app-layout';
interface Property {
 name: string;
 id: number;
}

interface Props {
 properties: {
  data: Property[];
 };
}

export default function Properties({ properties }: Props) {
 return <AppLayout>P</AppLayout>;
}
