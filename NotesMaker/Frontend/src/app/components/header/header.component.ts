import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  isLoggedOut:boolean = false
  userObj: any
  constructor(
    public router: Router,
    public auth: AuthService
  ) {}
  
  toggleAuth(){
      this.auth.logoutUser();
  }
}
