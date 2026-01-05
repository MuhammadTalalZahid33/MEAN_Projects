import { Component } from '@angular/core';
import { HeaderComponent } from "../../Components/header/header.component";
import { SidebarComponent } from "../../Components/sidebar/sidebar.component";
import { LoaderComponent } from '../../Components/loader/loader.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { SessionService } from '../../services/session.service';
import { ConnectService } from '../../services/connect.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, LoaderComponent, NgIf, AsyncPipe],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  loading$: any;

  constructor(private connectService: ConnectService) {
    this.loading$ = this.connectService.loading$;
  }

}
