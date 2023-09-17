import { Component } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { NoteListService } from '../firebase-services/note-list.service'
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent {
  noteList: Note[] = [];
  favFilter: "all" | "fav" = "all";
  status: "notes" | "trash" = "notes";

  constructor(private noteService: FirebaseService) {
    this.noteList = this.getDummyData()
  }

  changeFavFilter(filter:"all" | "fav"){
    this.favFilter = filter;
  }

  changeTrashStatus(){
    debugger;

    if(this.status == "trash"){
      this.status = "notes";
    } else {
      this.status = "trash";
      this.favFilter = "all";
    }
  }




  getDummyData(): Note[] {
    return [
      {
        id: "21sasd561dd4sdf",
        type: "note",
        titel: "Block, Inline, and Inline-Block",
        content: "https://www.youtube.com/watch?v=x_i2gga-sYg",
        marked: true,
      },
      {
        id: "25sd4f561w54sdf",
        type: "note",
        titel: "css selector",
        content: `kind p > b   (direktes kind) 
        nachfahren p b  (alle nachfahren)
        geschwister p ~ b (auf gleicher ebene ist VOR dem p ein b)`,
        marked: true,
      },
      {
        id: "54a4s6d546ff",
        type: "note",
        titel: "aufräumen",
        content: "Wohnzimmer saugen",
        marked: false,
      },
      {
        id: "2a35s4d654a6s4d",
        type: "note",
        titel: "links",
        content: `Reihenfolge: a:visited 
        a:focus 
        a:hover 
        a:active
        merkspruch: LoVe HAte`,
        marked: true,
      }
    ];
  }

}
