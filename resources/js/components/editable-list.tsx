// Ezt használjuk a Properties és a cities kilistázásánál
// Use it to list properties and cities to edit in their components
import { Button } from '@/components/ui/button';

interface Props<T extends { id: number }> {
 items: {
  data: T[];
 };
 editText: string;
 deleteText: string;
 missingItemsText: string;
 title: string;
 displayField?: keyof T;
 onEdit: (id: number) => void;
 setItemsIdToDelete: (id: number) => void;
}

export default function EditableList<T extends { id: number }>({
 items,
 editText,
 title,
 deleteText,
 onEdit,
 setItemsIdToDelete,
 missingItemsText,
 displayField = 'name' as keyof T,
}: Props<T>) {
 return (
  <div className="py-12">
   <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div className="overflow-hidden shadow-xl sm:rounded-lg">
     <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      <div className="space-y-4">
       {items.data.map((item) => (
        <div
         key={item.id}
         className="flex items-center justify-between rounded-lg border bg-card p-4"
        >
         <div className="text-lg font-medium">
          {String(item[displayField] ?? '')}
         </div>
         <div className="space-x-4">
          <Button onClick={() => onEdit(item.id)} variant={'outline'}>
           {editText}
          </Button>
          <Button
           onClick={() => setItemsIdToDelete(item.id)}
           variant={'outline'}
          >
           {deleteText}
          </Button>
         </div>
        </div>
       ))}
       {items.data.length === 0 && (
        <p className="text-center text-muted-foreground">{missingItemsText}</p>
       )}
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
