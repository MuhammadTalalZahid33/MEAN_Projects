import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmed-register',
  standalone: true,
  imports: [],
  templateUrl: './confirmed-register.component.html',
  styleUrl: './confirmed-register.component.scss'
})
export class ConfirmedRegisterComponent {
  constructor(private router: Router){}
  
  toLogin(){
    this.router.navigate(['/'])
  }
}
