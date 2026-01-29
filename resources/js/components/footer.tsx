import { Link } from '@inertiajs/react';
export default function Footer() {
 return (
  <div className="border-t border-t-chart-4">
   <div className="flex flex-col items-center justify-evenly gap-6 px-2 py-6 text-center md:flex-row md:px-12 md:text-left">
    <div className="flex flex-col gap-2 md:pt-4">
     <Link className="text-lg">Ingatlanjaink</Link>
     <Link href="/contact" className="text-lg">
      Kapcsolat
     </Link>
     <Link href="/adatvedelmi-tajekoztato" className="text-lg">
      Adatvédelmi tájékoztató
     </Link>
    </div>
    <div className="flex flex-col gap-4">
     <h3 className="text-2xl">Elérhetőségek:</h3>
     <p>Tel: +36 30 549-6209</p>
     <p>Email: ingatlanvonal@gmial.com</p>
    </div>
   </div>
  </div>
 );
}
