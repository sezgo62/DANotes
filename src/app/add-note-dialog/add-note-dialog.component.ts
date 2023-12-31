import { Component, Output, EventEmitter } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { NoteListService } from '../firebase-services/note-list.service'

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.scss']
})
export class AddNoteDialogComponent {
  @Output() addDialogClosed: EventEmitter<boolean> = new EventEmitter();
  title = "";
  content = "";

  constructor(private noteService: NoteListService){}

  closeDialog() {
    this.title = "";
    this.content = "";
    this.addDialogClosed.emit(false);
  }

  async addNote(){
    //beachte das closeDialog() zum Schluss kommt, denn es leert die Variablen
    let colId: 'notes' | 'trash' = 'notes';
    let note = {
      type: 'note',
      title: this.title,
      content: this.content,
      marked: false
    } as Note
    debugger;
    await this.noteService.addNote(note, colId);
    this.closeDialog();
  }
}
