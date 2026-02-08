import DashboardCard from '@/components/dashboard-card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Cog, Home, Image, PenLine, Upload } from 'lucide-react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
 {
  title: 'Dashboard',
  href: route('dashboard'),
 },
];

export default function Dashboard() {
 return (
  <AppLayout breadcrumbs={breadcrumbs}>
   <Head title="Dashboard" />
   <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
    <div className="grid auto-rows-min gap-12 md:grid-cols-2">
     <DashboardCard
      linkText="Városok Létrehozása"
      linkHref={route('cities.create')}
      icon={PenLine}
     />
     <DashboardCard
      linkText="Városok törlése és szerkesztése"
      linkHref={route('cities.list')}
      icon={Cog}
     />
     <DashboardCard
      linkText="Ingatlan Létrehozása"
      linkHref={route('properties.create')}
      icon={PenLine}
     />
     <DashboardCard
      linkText="Ingatlanok törlése és szerkesztése"
      linkHref={route('properties.index')}
      icon={Home}
     />
     <DashboardCard
      linkText="Kép feltöltése"
      linkHref={route('media.create')}
      icon={Upload}
     />
     <DashboardCard
      linkText="Kép Kezelése"
      linkHref={route('media.index')}
      icon={Image}
     />
    </div>
   </div>
  </AppLayout>
 );
}
