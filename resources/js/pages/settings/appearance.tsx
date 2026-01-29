import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/appearance';

const breadcrumbs: BreadcrumbItem[] = [
 {
  title: 'Megjelenés',
  href: editAppearance().url,
 },
];

export default function Appearance() {
 return (
  <AppLayout breadcrumbs={breadcrumbs}>
   <Head title="Megjelenés" />

   <SettingsLayout>
    <div className="space-y-6">
     <HeadingSmall
      title="Megjelenés"
      description="Frissítse fiókja megjelenési beállításait"
     />
     <AppearanceTabs />
    </div>
   </SettingsLayout>
  </AppLayout>
 );
}
