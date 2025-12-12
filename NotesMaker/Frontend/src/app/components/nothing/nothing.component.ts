import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-nothing',
  standalone: true,
  imports: [],
  templateUrl: './nothing.component.html',
  styleUrl: './nothing.component.scss'
})
export class NothingComponent {
  constructor(private router: Router){}
  toNotes(){
    this.router.navigate(['/'])
  }
}
