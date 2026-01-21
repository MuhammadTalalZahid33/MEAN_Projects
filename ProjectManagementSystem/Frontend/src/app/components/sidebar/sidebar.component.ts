import { Component, inject, signal, Signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from "@angular/material/icon";
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatButtonModule, MatSidenavModule, MatIcon, RouterLink, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor() { }
  private authService = inject(AuthService);
  role = this.authService.userRole
}
