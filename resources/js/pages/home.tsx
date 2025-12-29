import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Home() {
  const appUrl = import.meta.env.VITE_APP_URL || 'http://localhost:8000';
  return (
    <AppLayout>
      <Head title="Home" />

      <div>Hello</div>
    </AppLayout>
  );
}
