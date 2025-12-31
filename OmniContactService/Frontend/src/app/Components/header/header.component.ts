import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { DialerComponent } from '../../Dialogs/dialer/dialer.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule, RouterLink, NgIf, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isOnCall = false
  agentState!: any
  selectValue!: any
  private callDialog?: MatDialogRef<IncomingCallComponent> | null = null;

  constructor(
    private dialogRef: MatDialog,
    public connectService: ConnectService
  ) { }

  ngOnInit(): void {
    this.connectService.agentState$.subscribe(state => {
      this.agentState = state;
      if (state === 'Offline' || state === 'Available') {
        this.selectValue = state
      }

      console.log("header agent state: ", this.agentState);
    })

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

  onAgentStateChange(event: string) {
    // const select = event.target as HTMLSelectElement;
    // console.log("select :", event);
    // const state = select.value;
    // console.log("changing state: ", state);
    // this.connectService.setAgentState(state);
    if (event) {
      this.selectValue = event
      this.connectService.setAgentState(event);
    }
  }

  mapStateLabel(state: string): string {
    switch (state) {
      case 'PendingBusy':
        return 'Incoming Call';
      case 'Busy':
        return 'On Call';
      case 'AfterCallWork':
        return 'Wrap Up';
      case 'FailedConnectAgent':
        return 'Call Failed';
      default:
        return state;
    }
  }

  openDialer() {
    const dialogref = this.dialogRef.open(DialerComponent);
    dialogref.afterClosed().subscribe((phoneNum) => {
      if (phoneNum)
        this.connectService.makeOutboundCall(phoneNum);
    })
  }

  Logout() {
    this.dialogRef.open(LogoutComponent);
  }

  ngOnDestroy(): void {
    this.callDialog?.close();
    this.callDialog = null;
  }
}
