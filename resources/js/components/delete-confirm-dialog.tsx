import { DeleteConfirmationDialogProps } from '@/types';
import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
} from './ui/alert-dialog';

export default function DeleteConfirmDialog({
 title,
 description,
 confirmText,
 cancelText = 'Mégse',
 onConfirm,
 variant = 'destructive',
 items,
 itemIdToDelete,
 setItemIdToDelete,
 displayField = 'name',
}: DeleteConfirmationDialogProps) {
 const itemToDelete = items.data.find((item) => item.id === itemIdToDelete);

 return (
  <AlertDialog
   open={!!itemIdToDelete}
   onOpenChange={(open) => !open && setItemIdToDelete(null)}
  >
   <AlertDialogContent>
    <AlertDialogHeader>
     <AlertDialogTitle>{title}</AlertDialogTitle>
     <AlertDialogDescription>
      {itemToDelete && (
       <>
        Törlöd ezt: <strong>{itemToDelete[displayField]}</strong>
        <br />
        <br />
       </>
      )}
      {description}
     </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
     <AlertDialogCancel>{cancelText}</AlertDialogCancel>
     <AlertDialogAction
      onClick={onConfirm}
      className={
       variant === 'destructive' ? 'bg-red-700 text-white hover:bg-red-800' : ''
      }
     >
      {confirmText}
     </AlertDialogAction>
    </AlertDialogFooter>
   </AlertDialogContent>
  </AlertDialog>
 );
}
