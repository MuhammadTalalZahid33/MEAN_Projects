import { Component } from '@angular/core';
import { ConnectService } from '../../services/connect.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-incoming-call',
  standalone: true,
  imports: [],
  templateUrl: './incoming-call.component.html',
  styleUrl: './incoming-call.component.scss'
})
export class IncomingCallComponent {
  constructor(
    private connectService: ConnectService, 
    private dialogRef: MatDialogRef<IncomingCallComponent>
  ){}

  accept(){
    this.connectService.acceptCall();
    this.dialogRef.close();
  }

  reject(){
    this.connectService.rejectCall();
    this.dialogRef.close();
  }
}
