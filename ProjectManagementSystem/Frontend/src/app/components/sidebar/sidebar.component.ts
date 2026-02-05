import { Component, inject, signal, Signal, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from "@angular/material/icon";
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatButtonModule, MatSidenavModule, MatIcon, RouterLink, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private authService = inject(AuthService);
  role = this.authService.userRole
  isMobile = signal(false);

  //Sidebar Auto Close
  private breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.breakpointObserver
      .observe(['(max-width: 850px)'])
      .subscribe(result => {
        this.isMobile.set(result.matches);
      });
  }
}
