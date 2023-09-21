import { Component, Input } from '@angular/core';
import { Note } from '../../interfaces/note.interface';
import { NoteListService } from '../../firebase-services/note-list.service'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {
  @Input() note!: Note;
  edit = false;
  hovered = false;

  constructor(public noteService: NoteListService) { }

  changeMarkedStatus() {
    this.note.marked = !this.note.marked;
  }

  deleteHovered() {
    if (!this.edit) {
      this.hovered = false;
    }
  }

  openEdit() {
    this.edit = true;
  }

  closeEdit() {
    this.edit = false;
    this.saveNote();
  }

  docId;

  moveToTrash() {
    debugger;


    if (this.note.id) {
      debugger;

      if (this.note.type != 'trash') {


        this.note.type = 'trash';

        let docId = this.note.id;
        delete this.note.id;
        debugger;

        this.noteService.addNote(this.note, 'trash');
        debugger;

        this.noteService.deleteNote('notes', docId);
      } else {
        this.noteService.deleteNote('notes', this.docId);
      }
    }
  }

  moveToNotes() {
    debugger;

    this.note.type = 'note';

    this.docId = this.note.id;

    delete this.note.id;

    this.noteService.addNote(this.note, 'notes');

    this.noteService.deleteNote('trash', this.docId);

  }

  deleteNote(type: string) {
    debugger;
    if (type == 'trash') {
      this.noteService.deleteNote(type, this.note.id);

    }
  }

  saveNote() {
    this.noteService.updateNote(this.note);
  }

}
