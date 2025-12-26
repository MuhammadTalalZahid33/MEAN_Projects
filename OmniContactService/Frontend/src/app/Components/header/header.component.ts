import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from '../../Auth/logout/logout.component';
import { ConnectService } from '../../services/connect.service';
import { NgIf } from '@angular/common';
import 'amazon-connect-streams'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule, RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isOnCall = false
  agentState = 'LOGGED_OUT';

  constructor(
    private dialogRef: MatDialog,
    public connectService: ConnectService
  ) { }

  ngOnInit(): void {
    // connect.agent((agent) => {
    //   const state = agent.getState();
    //    console.log("getting agent state", state);
    // });
    // console.log("agent state: ", this.connectService.getAgentState())
  }
  Logout() {
    this.dialogRef.open(LogoutComponent);
  }
}
