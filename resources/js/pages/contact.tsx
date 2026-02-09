import ContactForm from '@/components/forms/contact-form';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Contact() {
 return (
  <AppLayout>
   <Head title="Kapcsolat" />
   <div className="my-8 text-center">
    <h3 className="text-2xl font-bold">
     Ha bármi kérdésed van, kérlek írj nekünk!
    </h3>
   </div>
   <ContactForm />
  </AppLayout>
 );
}
