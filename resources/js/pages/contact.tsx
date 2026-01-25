import ContactForm from '@/components/forms/contact-form';
import AppLayout from '@/layouts/app-layout';

export default function Contact() {
 return <AppLayout>
  <div className='text-center my-8'><h3 className='text-2xl font-bold'>Ha bármi kérdésed van, kérlek írj nekünk!</h3></div>
  <ContactForm />
 </AppLayout>;
}
