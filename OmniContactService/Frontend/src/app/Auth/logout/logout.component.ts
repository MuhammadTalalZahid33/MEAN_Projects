import { Component } from '@angular/core';
import { Router } from '@angular/router';
import "amazon-connect-streams";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  constructor(private router: Router) { }
  confirmLogout() {

    connect.core.terminate()
    // Navigate back to login page
    this.router.navigate(['/']);
  }
}
