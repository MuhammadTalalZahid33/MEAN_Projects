import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../core/models/note.type';

@Pipe({
  name: 'filternotes',
  standalone: true
})
export class FilternotesPipe implements PipeTransform {

  transform(notes: Note[], searchTerm: string): Note[] {
    if (!searchTerm) {
      return notes;
    }
    const searchText = searchTerm.toLowerCase();
    debugger
    return notes.filter(notes => {
      console.log(notes.title)
      return notes.title.toLowerCase().includes(searchText) ||
        notes.content.toLowerCase().includes(searchText);
    })
  }
}
