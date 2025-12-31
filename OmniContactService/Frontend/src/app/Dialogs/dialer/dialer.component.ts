import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConnectService } from '../../services/connect.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dialer',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, NgFor, MatIcon],
  templateUrl: './dialer.component.html',
  styleUrl: './dialer.component.scss'
})
export class DialerComponent {

  keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '0', '#'];

  constructor(
    private dialogRef: MatDialogRef<DialerComponent>,
    public connectService: ConnectService
  ) { }

  phoneNumber = '';

  pressKey(key: string) {
    this.phoneNumber += key;
  }

  backspace() {
    this.phoneNumber = this.phoneNumber.slice(0, -1);
  }


  call() {
    if (!this.phoneNumber) return;
    this.dialogRef.close(this.phoneNumber);
  }

  cancel() {
    this.dialogRef.close();
  }
}
