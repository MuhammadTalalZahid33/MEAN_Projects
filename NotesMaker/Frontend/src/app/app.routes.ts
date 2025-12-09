import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => {
            return import('./pages/home/home.component').then(m => m.HomeComponent);
        }
    },
    {
        path: 'nothing',
        loadComponent: () => {
            return import('./components/nothing/nothing.component').then(m => m.NothingComponent);
        }
    },
    {
        path: 'register',
        loadComponent: () => {
            return import('./auth/register/register.component').then(m => m.RegisterComponent);
        }
    },
    {
        path: 'login',
        loadComponent: () => {
            return import('./auth/login/login.component').then(m => m.LoginComponent);
        }
    }

];
