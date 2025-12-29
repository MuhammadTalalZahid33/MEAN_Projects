import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LogoutComponent } from '../../Auth/logout/logout.component';
import { ConnectService } from '../../services/connect.service';
import { NgIf } from '@angular/common';
import 'amazon-connect-streams'
import { IncomingCallComponent } from '../../Dialogs/incoming-call/incoming-call.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule, RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isOnCall = false
  agentState = 'LOGGED_OUT';
  private callDialog?: MatDialogRef<IncomingCallComponent> | null = null;


  constructor(
    private dialogRef: MatDialog,
    public connectService: ConnectService
  ) { }

  ngOnInit(): void {
    // connect.agent((agent) => {
    //   const state = agent.getState();
    //    console.log("getting agent state", state);
    // });
    this.connectService.incomingCall$
      .subscribe(contact => {
        if (contact && !this.callDialog) {
          this.callDialog = this.dialogRef.open(IncomingCallComponent, {
            disableClose: true,
            width: '350px'
          })
        }
      })
    this.connectService.onCall$
      .subscribe(onCall => {
        this.isOnCall = onCall;
        if (onCall && this.callDialog) {
          this.callDialog.close();
          this.callDialog = undefined;
        }
      });
  }

  onAgentStateChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const state = select.value;
    this.connectService.setAgentState(state);
  }


  Logout() {
    this.dialogRef.open(LogoutComponent);
  }

  ngOnDestroy(): void {
    this.callDialog?.close();
    this.callDialog = null;
  }
}
