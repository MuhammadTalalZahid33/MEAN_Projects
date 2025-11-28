import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from "@angular/router";
import { NotesListComponent } from "../../components/notes/notes-list/notes-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NotesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
