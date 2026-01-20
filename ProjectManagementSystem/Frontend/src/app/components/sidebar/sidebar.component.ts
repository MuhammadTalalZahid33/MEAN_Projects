import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from "@angular/material/icon";
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatButtonModule, MatSidenavModule, MatIcon, RouterLink, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private dialogRef: MatDialog) { }

  openFeedbackDialog() {

  }
}
