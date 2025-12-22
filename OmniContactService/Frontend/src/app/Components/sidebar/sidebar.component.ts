import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatLine, MatRipple } from "@angular/material/core";
import { MatMenuItem, MatMenuTrigger } from "@angular/material/menu";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatButtonModule, MatSidenavModule, MatIcon],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  showFiller = false;
}
