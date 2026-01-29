import DashboardCard from '@/components/dashboard-card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Cog, Home, Image, PenLine, Upload } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
 {
  title: 'Dashboard',
  href: dashboard().url,
 },
];

export default function Dashboard() {
 return (
  <AppLayout breadcrumbs={breadcrumbs}>
   <Head title="Dashboard" />
   <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
    <div className="grid auto-rows-min gap-4 md:grid-cols-2">
     <DashboardCard
      linkText="Városok Létrehozása"
      linkHref="cities/create"
      icon={PenLine}
     />
     <DashboardCard
      linkText="Városok törlése és szerkesztése"
      linkHref="cities"
      icon={Cog}
     />
     <DashboardCard
      linkText="Ingatlan Létrehozása"
      linkHref="properties/create"
      icon={PenLine}
     />
     <DashboardCard
      linkText="Ingatlanok törlése és szerkesztése"
      linkHref="properties"
      icon={Home}
     />
     <DashboardCard
      linkText="Kép feltöltése"
      linkHref="media/create"
      icon={Upload}
     />
     <DashboardCard linkText="Kép Kezelése" linkHref="media" icon={Image} />
    </div>
   </div>
  </AppLayout>
 );
}
