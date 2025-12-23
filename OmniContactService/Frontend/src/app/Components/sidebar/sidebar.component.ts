import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from "@angular/material/icon";
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from "@angular/router";
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatLine, MatRipple } from "@angular/material/core";
import { MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { FeedbackComponent } from '../../Dialogs/feedback/feedback.component';

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
    this.dialogRef.open(FeedbackComponent, {})
  }
}
