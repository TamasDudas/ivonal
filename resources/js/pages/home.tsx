import mainPicture from '@/assets/sarosi_halo_nyito.jpg';
import { Card } from '@/components/ui/card';
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

   <div className="flex flex-col gap-6 px-6 py-6 md:flex-row md:items-center">
    <Card className="flex flex-col items-center justify-center px-3 md:flex-1">
     <p className="text-3xl">Elérhető ingatlanok Budapesten és Szegeden.</p>
     <hr className="w-full border-t border-chart-4" />
     <p className="">
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
    <div className="relative flex h-52 w-full items-center justify-center sm:h-44 md:h-80 md:flex-[2] lg:h-[28rem]">
     <img
      src={mainPicture}
      alt="Borító kép"
      className="h-full w-full rounded-2xl object-cover"
     />
     <div className="absolute inset-0 rounded-2xl bg-popover/30"></div>
    </div>
   </div>
   <div className="py-4"></div>
  </AppLayout>
 );
}
