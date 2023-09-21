import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc, DocumentReference, updateDoc, deleteDoc, where, limit } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Note } from '../interfaces/note.interface';
import { query } from '@angular/fire/firestore';
import { orderBy } from "firebase/firestore";  


@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  firestore: Firestore = inject(Firestore);

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];


  unsubNotes;
  unsubTrash;

  constructor() {
    this.unsubTrash = this.subTrashList();
    this.unsubNotes = this.subNotesList();
  } 

  async updateNote(note: Note) {
    if(note.id) {
      let colRef = this.getSingleDocRef(this.getColIdFromNote(note), note.id);
      await updateDoc(colRef, this.getCleanJson(note)).catch(
        (err) => { console.log(err) }
      );
    }  
  }

  getCleanJson(note: Note) {
    return {
      type: note.type,
      title: note.title,
      content: note.content,
      marked: note.marked
    }
  }

  getColIdFromNote(note: Note) {
    if(note.type == 'note') {
      return 'notes';
    } else {
      return 'trash'
    }
  }

  async addNote(item: Note, colId: 'notes' | 'trash') {
    debugger;
    await addDoc(this.getRef(colId), item).catch( 
      (err) => { console.log(err) }
    ).then(
      (docRef) => { console.log('Document writen with ID: ', docRef);
       })
  }

async deleteNote(colId: 'notes' | 'trash', docId: string) {
  debugger;
  await deleteDoc(this.getSingleDocRef(colId, docId)).catch (
    (err)  => {console.log(err);
    }
  )
}

  ngOnDestroy() {
    this.unsubTrash(); //Wir unsubscriben hier wieder
    this.unsubNotes(); //Wir unsubscriben hier wieder
  }

  //Der Unterschied zwichen onSnapshot() und collectionData() ist dass wir die Schritte mit dem Observable item$ und dem subscribe sparen können.
  subNotesList() {
    const q = query(this.getNotesRef(), where("marked", "==", true), limit(4));
    return onSnapshot(q, (list) => { //Die onSnapshot-Methode aus dem Firebase Firestore SDK ist dazu da, um Änderungen in einer Firestore-Sammlung zu überwachen und eine Funktion auszuführen, wenn Änderungen auftreten.
      this.normalNotes = [];
      list.forEach(element => {

        this.normalNotes.push(this.setNodeObject(element.data(), element.id));
      });
    });
  }

  subTrashList() {
    onSnapshot(this.getTrashRef(), (list) => { //Die onSnapshot-Methode aus dem Firebase Firestore SDK ist dazu da, um Änderungen in einer Firestore-Sammlung zu überwachen und eine Funktion auszuführen, wenn Änderungen auftreten.
      this.trashNotes = [];
      list.forEach(element => {
        this.trashNotes.push(this.setNodeObject(element.data(), element.id));
      });
    });
  }

  //const itemCollection = collection(this.firestore, 'items');
  getNotesRef() {
    return collection(this.firestore, 'notes');
  }

getRef(colId) {
  if(colId == 'trash' || 'notes') {
    return collection(this.firestore, colId);
  } else {
    
    return null;
}
}

  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  setNodeObject(obj: any, id: string): Note {  //In dieser Funktion stellen wir sicher das auch jedes Feld einen Wert hat, auch wenn der user z.B. den Note speichern konnte ohne einen Titel einzugeben, wie auch immer.
    return {
      id: id,
      type: obj.type || 'note',
      title: obj.title || '',
      content: obj.content || '',
      marked: obj.marked || false,
    }
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }



}
