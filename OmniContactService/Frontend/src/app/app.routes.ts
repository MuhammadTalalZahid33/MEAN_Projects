import { Routes } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { MainLayoutComponent } from './Layout/main-layout/main-layout.component';
import { connectAuthGuard } from './core/guards/connect-auth.guard';

export const routes: Routes = [
    {
        path: 'header',
        component: HeaderComponent,
    },
    {
        path: 'sidebar',
        component: SidebarComponent
    },
    {
        path: 'main',
        component: MainLayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadComponent: () => {
                    return import('./Pages/dashboard/dashboard.component').then(m => m.DashboardComponent);
                }
            },
            {
                path: 'settings',
                loadComponent: () => {
                    return import('./Pages/settings/settings.component').then(m => m.SettingsComponent);
                }
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },

    {
        path: '',
        loadComponent: () => {
            return import('./Auth/login/login.component').then(m => m.LoginComponent);
        },
        canActivate: [connectAuthGuard]
        
    }

];
