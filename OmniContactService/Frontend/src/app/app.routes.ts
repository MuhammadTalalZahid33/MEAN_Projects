import { Routes } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { MainLayoutComponent } from './Layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: 'header',
        component: HeaderComponent,
        // loadChildren: 
    },
    {
        path: 'sidebar',
        component: SidebarComponent
    },
    {
        path:'main',
        component: MainLayoutComponent,
    },
    {
        path: '',
        loadComponent: () => {
            return import('./Auth/login/login.component').then(m => m.LoginComponent);
        }
    }

];
