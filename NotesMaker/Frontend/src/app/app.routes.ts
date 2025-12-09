import { Routes } from '@angular/router';

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
        }
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
        }
    }

];
