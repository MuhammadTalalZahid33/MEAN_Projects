import { Component, inject, NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { GetNotesService } from '../../../core/services/get-notes.service';

@Component({
  selector: 'app-addeditnote',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addeditnote.component.html',
  styleUrl: './addeditnote.component.scss'
})
export class AddeditnoteComponent {
  note ={
    title: '',
    content: ''
  }

  noteObj = inject(GetNotesService);

  onSave(form:any){
    if (form.valid) {
      this.noteObj.saveNotes(this.note);    
      console.log('Form submitted:', this.note);
    } else {
      alert('Please fill all required fields correctly.');
    }
  }
}
