import DeleteConfirmDialog from '@/components/delete-confirm-dialog';
import EditableList from '@/components/editable-list';
import AppLayout from '@/layouts/app-layout';
import { City } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface Props {
 cities: {
  data: City[];
 };
}
export default function Cities({ cities }: Props) {
 const [cityIdToDelete, setCityIdToDelete] = useState<number | null>(null);

 const confirmDeleteCity = () => {
  if (!cityIdToDelete) return;

  router.post(
   route('cities.destroy', { city: cityIdToDelete }),
   {
    _method: 'DELETE',
   },
   {
    preserveScroll: true,
    onSuccess: () => {
     setCityIdToDelete(null);
     toast.success('Város sikeresen törölve!');
    },
    onError: () => {
     toast.error('Város törlése sikertelen', {
      description: 'Ellenőrizd a kapcsolatot, és próbáld újra.',
     });
    },
   },
  );
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
     onEdit={(id) => router.visit(route('cities.edit', { city: id }))}
     setItemsIdToDelete={setCityIdToDelete}
    />
   </AppLayout>
   <DeleteConfirmDialog
    title="Biztosan törölni akarod a várost?"
    description="Ez a művelet nem vonható vissza. A város törlésre kerül, de a képek maradnak a galériában."
    confirmText="Város törlése"
    onConfirm={confirmDeleteCity}
    items={cities}
    itemIdToDelete={cityIdToDelete}
    setItemIdToDelete={setCityIdToDelete}
    displayField="name"
   />
  </>
 );
}
