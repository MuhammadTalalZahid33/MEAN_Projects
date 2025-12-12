import { Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    {
        path: 'home',
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
        path: 'allNotes',
        loadComponent: () => {
            return import('./components/notes/notes-list/notes-list.component').then(m => m.NotesListComponent);
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        loadComponent: () => {
            return import('./auth/register/register.component').then(m => m.RegisterComponent);
        }
    },
    {
        path: '',
        loadComponent: () => {
            return import('./auth/login/login.component').then(m => m.LoginComponent);
        },
        canActivate: [LoginGuard]
        
    },
    {
        path: 'confirmRegistered',
        loadComponent: () => {
            return import('./auth/confirmed-register/confirmed-register.component').then(m => m.ConfirmedRegisterComponent);
        }
    },
    {
        path: 'users',
        loadComponent: () => {
            return import('./pages/users/users.component').then(m => m.UsersComponent);
        },
        canActivate: [AdminGuard]
    }
];
