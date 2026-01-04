// Ezt használjuk a Properties és a cities kilistázásánál
// Use it to list properties and cities in their components to edit
import { Button } from '@/components/ui/button';

interface Item {
 name: string;
 id: number;
}

interface Props {
 items: {
  data: Item[];
 };
 editText: string;
 deleteText: string;
 missingItemsText: string;
 title: string;
 onEdit: (id: number) => void;
 setItemsIdToDelete: (id: number) => void;
}

export default function ListItems({
 items,
 editText,
 title,
 deleteText,
 onEdit,
 setItemsIdToDelete,
 missingItemsText,
}: Props) {
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
         <div className="text-lg font-medium">{item.name}</div>
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
