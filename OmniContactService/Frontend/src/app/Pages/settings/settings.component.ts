import { Component } from '@angular/core';
import { UserApiService } from '../../services/user-api.service';
import { catchError } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';

const USER_DATA = 'ConnectUserData';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  constructor(
    private userApiService: UserApiService,
  ){}

  userName: any;
  userData: any;

  ngOnInit() {

    const cachedUser = localStorage.getItem(USER_DATA);

    if(cachedUser) {
      this.userData = JSON.parse(localStorage.getItem(USER_DATA) || '{}');
      return;
    }

    this.userName = localStorage.getItem('username');
    if(!this.userName) {
      console.error('Username not found in local storage.');
      return;
    }
    
    // this.userApiService.getUser(this.userName)
    // .subscribe((response: any) => {
    //   console.log('User data fetched successfully:', response);
    //   this.userData = response.data;
    //   localStorage.setItem(USER_DATA, JSON.stringify(response.data));
    // })
    this.userApiService.getUser(this.userName)
      .subscribe({
        next: (response: any) => {
          console.log('[Settings] User fetched from API:', response);
          this.userData = response.data;

          localStorage.setItem(
            USER_DATA,
            JSON.stringify(response.data)
          );
        },
        error: (err) => {
          console.error('Error fetching user:', err);
        }
      });
  }
}