import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../core/models/note.type';

@Pipe({
  name: 'filternotes',
  standalone: true
})
export class FilternotesPipe implements PipeTransform {

  transform(notes: Note[], searchTerm: string): Note[] {
    if (!notes) return []; 
    if (!searchTerm) {
      return notes;
    }
    const searchText = searchTerm.toLowerCase();
    // return notes.filter(notes => {
    //    let note = notes.title.toLowerCase().includes(searchText) || notes.content.toLowerCase().includes(searchText)
    //    console.log("notes found",note)
    //    if(note){
    //       // console.log(notes)
    //       return note
    //     }else{
    //       return note;
    //     }
    // })

    return notes.filter(notes => {
      // console.log("title, content:", notes.title.toLocaleLowerCase().includes(searchText), notes.content.toLocaleLowerCase().includes(searchText) )
      return notes.title.toLocaleLowerCase().includes(searchText) ||
        notes.content.toLocaleLowerCase().includes(searchText) 
    })
  }
}
