import DeleteConfirmDialog from '@/components/delete-confirm-dialog';
import EditableList from '@/components/editable-list';
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
   <DeleteConfirmDialog
    title="Biztosan törölni akarod az ingatlant?"
    description="Ez a művelet nem vonható vissza. Az ingatlan törlésre kerül, de a képek maradnak a galériában."
    confirmText="Ingatlan törlése"
    onConfirm={confirmDeleteProperty}
    items={properties}
    itemIdToDelete={propertyIdToDelete}
    setItemIdToDelete={setPropertyIdToDelete}
    displayField="street"
   />
  </>
 );
}
