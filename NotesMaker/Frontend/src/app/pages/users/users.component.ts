import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  constructor(){}
  auth = inject(AuthService);
  userObj: Array<any> = []

  ngOnInit(): void {
    this.displayUsers();
  }

  displayUsers(){
    this.auth.getUsers().subscribe(user => {
      this.userObj = user.data;
      console.log("user obj: ", this.userObj);
    })
  }

  Delete(){
    
  }
}
