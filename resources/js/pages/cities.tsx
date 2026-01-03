import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { router } from '@inertiajs/react';

import { useState } from 'react';

interface City {
 name: string;
 id: number;
}

interface Props {
 cities: {
  data: City[];
 };
}
export default function cities({ cities }: Props) {
 const [cityIdToDelete, setCityIdToDelete] = useState<number | null>(null);

 const confirmDeleteCity = () => {
  if (!cityIdToDelete) return;

  router.delete(`/cities/${cityIdToDelete}`, {
   preserveScroll: true,
   onSuccess: () => {
    setCityIdToDelete(null);
   },
  });
 };

 return (
  <>
   <AppLayout>
    <div className="py-12">
     <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="overflow-hidden shadow-xl sm:rounded-lg">
       <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold">Városok kezelése</h2>
        <div className="space-y-4">
         {cities.data.map((city) => (
          <div
           key={city.id}
           className="flex items-center justify-between rounded-lg border bg-card p-4"
          >
           <div className="text-lg font-medium">{city.name}</div>
           <div className="space-x-4">
            <Button
             onClick={() => router.visit(`/cities/${city.id}/edit`)}
             variant={'outline'}
            >
             Szerkesztés
            </Button>
            <Button
             onClick={() => setCityIdToDelete(city.id)}
             variant={'outline'}
            >
             Törlés
            </Button>
           </div>
          </div>
         ))}
         {cities.data.length === 0 && (
          <p className="text-center text-muted-foreground">
           Még nincs Város létrehozva
          </p>
         )}
        </div>
       </div>
      </div>
     </div>
    </div>
   </AppLayout>
   {/* Alert dialóg a város törlésének megerősítésére */}
   <AlertDialog
    open={!!cityIdToDelete}
    onOpenChange={(open) => !open && setCityIdToDelete(null)}
   >
    <AlertDialogContent>
     <AlertDialogHeader>
      <AlertDialogTitle>Biztosan törölni akarod a várost?</AlertDialogTitle>
      <AlertDialogDescription>
       Törlöd ezt a várost:{' '}
       <strong>
        {cities.data.find((city) => city.id === cityIdToDelete)?.name}
       </strong>
       <br />
       <br />
       Ez a művelet nem vonható vissza. A város törlésre került, de a képek
       maradnak a galériában.
      </AlertDialogDescription>
     </AlertDialogHeader>
     <AlertDialogFooter>
      <AlertDialogCancel>Mégse</AlertDialogCancel>
      <AlertDialogAction onClick={confirmDeleteCity}>
       Város törlése
      </AlertDialogAction>
     </AlertDialogFooter>
    </AlertDialogContent>
   </AlertDialog>
  </>
 );
}
