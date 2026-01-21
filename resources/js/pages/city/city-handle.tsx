import EditableList from '@/components/editable-list';
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
import AppLayout from '@/layouts/app-layout';
import { City } from '@/types';
import { router } from '@inertiajs/react';

import { useState } from 'react';

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
    {/* Megjeleníti a listát a szerkesztéshez
    Show the list to edit */}
    <EditableList
     items={cities}
     editText="Szerkesztés"
     deleteText="Törlés"
     title="Városok kezelése"
     displayField="name"
     missingItemsText="Nincs  megjelenítendő város"
     onEdit={(slug) => router.visit(`/cities/${slug}/edit`)}
     setItemsIdToDelete={setCityIdToDelete}
    />
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
