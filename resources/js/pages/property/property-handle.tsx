import EditableList from '@/components/editable-list';
import AppLayout from '@/layouts/app-layout';
import { Property } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
 properties: {
  data: Property[];
 };
}

export default function Properties({ properties }: Props) {
 const [propertyIdToDelete, setPropertyIdToDelete] = useState<number | null>(
  null,
 );

 return (
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
    onEdit={(id) => router.visit(`/properties/${id}/edit`)}
    setItemsIdToDelete={setPropertyIdToDelete}
   />
  </AppLayout>
 );
}
