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
import { Property } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface Props {
 properties: {
  data: Property[];
 };
}

export default function Properties({ properties }: Props) {
 const [propertyIdToDelete, setPropertyIdToDelete] = useState<number | null>(
  null,
 );

 const confirmDeleteProperty = () => {
  if (!propertyIdToDelete) return;

  router.delete(route('properties.destroy', { property: propertyIdToDelete }), {
   preserveScroll: true,
   onSuccess: () => {
    setPropertyIdToDelete(null);
    toast.success('Ingatlan sikeresen törölve!');
   },
   onError: () => {
    toast.error('Ingatlan törlése sikertelen', {
     description: 'Ellenőrizd a kapcsolatot, és próbáld újra.',
    });
   },
  });
 };

 return (
  <>
   <AppLayout>
    {/* Megjeleníti a listát a szerkesztéshez
     Show the list to edit */}
    <EditableList
     items={properties}
     editText="Szerkesztés"
     deleteText="Törlés"
     title="Tulajdonságok kezelése"
     missingItemsText="Nincs megjelenítendő tulajdonság"
     displayField="street"
     onEdit={(id) => router.visit(route('properties.edit', { property: id }))}
     setItemsIdToDelete={setPropertyIdToDelete}
    />
   </AppLayout>
   {/* Alert dialóg az ingatlan törlésének megerősítésére */}
   <AlertDialog
    open={!!propertyIdToDelete}
    onOpenChange={(open) => !open && setPropertyIdToDelete(null)}
   >
    <AlertDialogContent>
     <AlertDialogHeader>
      <AlertDialogTitle>Biztosan törölni akarod az ingatlant?</AlertDialogTitle>
      <AlertDialogDescription>
       Törlöd ezt az ingatlant:{' '}
       <strong>
        {
         properties.data.find((property) => property.id === propertyIdToDelete)
          ?.street
        }
       </strong>
       <br />
       <br />
       Ez a művelet nem vonható vissza. Az ingatlan törlésre került, de a képek
       maradnak a galériában.
      </AlertDialogDescription>
     </AlertDialogHeader>
     <AlertDialogFooter>
      <AlertDialogCancel>Mégse</AlertDialogCancel>
      <AlertDialogAction onClick={confirmDeleteProperty}>
       Ingatlan törlése
      </AlertDialogAction>
     </AlertDialogFooter>
    </AlertDialogContent>
   </AlertDialog>
  </>
 );
}
