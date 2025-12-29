import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

interface City {
  id: number;
  name: string;
  slug: string;
  description: string;
}
interface Props {
  cities: {
    data: City[];
  };
}
export default function Home({ cities }: Props) {
  console.log(cities);
  const appUrl = import.meta.env.VITE_APP_URL || 'http://localhost:8000';
  return (
    <AppLayout>
      <Head title="Home" />

      <div>Hello</div>
    </AppLayout>
  );
}
