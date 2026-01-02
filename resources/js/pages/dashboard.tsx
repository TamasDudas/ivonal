import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

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
          <div className="flex h-50 items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <Link href="cities/create">Városok Létrehozása</Link>
          </div>
          <div className="flex h-50 items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <Link href="cities">Városok kezelése</Link>
          </div>
          <div className="flex h-50 items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <Link href="properties/create">Ingatlan Létrehozása</Link>
          </div>
          <div className="flex h-50 items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <Link href="properties">Ingatlanok kezelése</Link>
          </div>
          <div className="flex h-50 items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <Link href="media/create">Kép feltöltése</Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
