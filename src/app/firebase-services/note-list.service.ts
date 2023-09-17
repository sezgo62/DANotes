import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  firestore: Firestore = inject(Firestore);
  item$ ;
  item;

  constructor() {
    this.item$ = collectionData(this.getNotesRef());
    this.item = this.item$.subscribe( (list) => {
      list.forEach(element => {
      console.log(element);
      });
    });
    this.item.unsubscribe();
   }

   //const itemCollection = collection(this.firestore, 'items');
getNotesRef() {
  return collection(this.firestore, 'notes');
}


getTrashRef() {
  return collection(this.firestore, 'trash');
}



getSingleDocRef(colId: string, docId: string) {
return doc(collection(this.firestore, colId), docId);
}

}
