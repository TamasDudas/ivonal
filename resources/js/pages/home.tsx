import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import mainImage from '../assets/sarosi_halo_nyito.jpg';

interface City {
 id: number;
 name: string;
 slug: string;
 featured_image: string;
 description: string;
}
interface Props {
 cities: {
  data: City[];
 };
}
export default function Home({ cities }: Props) {
 const appUrl = import.meta.env.VITE_APP_URL || 'http://localhost:8000';
 return (
  <AppLayout>
   <Head title="Home" />

   <div className="relative flex justify-center">
    <img
     src={mainImage}
     alt=""
     className="max-h-96 w-full rounded-2xl object-cover"
    />
    <div className="absolute inset-0 rounded-lg bg-chart-4 opacity-10"></div>
   </div>

   <div className="my-7 flex px-6 py-6 md:flex-row">
    <Card className="flex flex-col items-center justify-center px-3 md:flex-[2]">
     <h2 className="text-4xl text-sidebar-accent">
      Kiadó ingatlanok Budapesten és Szegeden.
     </h2>
     <hr className="w-full border-t border-sidebar-accent" />
     <p className="text-lg">
      Weboldalunkon olyan kiadó és eladó lakóingatlanokat talál, amelyeknek
      tulajdonosai régóta baráti társaságot alkotnak. Így az itt kínált lakások
      műszaki állapota és berendezése hasonló színvonalat nyújt, a bérlés
      feltételei szintén hasonlóak. Ez Önnek a személyesség garanciája mellett a
      választás lehetőségét is nyújtja. Személyes, mert nem
      ingatlanközvetítőkkel kell tárgyalnia, de több lehetősége is van, mintha
      egyetlen lakás tulajdonosával lépne kapcsolatba. Elsősorban Szegeden és
      Budapesten találhatóak a lakások. Későbbi terveink között szerepel a
      kínálat szélesítése, ajánlás alapján a tulajdonosi kör bővítésével is.
     </p>
    </Card>
   </div>
   <div className="grid grid-cols-2 gap-6">
    {cities.data.map((city) => (
     <Link key={city.id} href={`properties/city/${city.slug}`}>
      <Card className="mb-4 rounded-3xl pt-0">
       <img
        src={city.featured_image}
        alt=""
        className="h-60 w-full rounded-t-3xl object-cover"
       />
       <h3 className="mt-2 text-center text-4xl font-light text-sidebar-accent">
        {city.name}
       </h3>
      </Card>
     </Link>
    ))}
   </div>
  </AppLayout>
 );
}
