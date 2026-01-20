import { Routes } from '@angular/router';
import { loginGuard } from './core/guards/login.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./auth/login/login.component')
            .then(m => m.LoginComponent),
        canActivate: [loginGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./auth/register/register.component')
            .then(m => m.RegisterComponent),
    },
    {
        path: 'confirmRegistered',
        loadComponent: () => import('./auth/confirmed-register/confirmed-register.component')
            .then(m => m.ConfirmedRegisterComponent),
    },
    {
        path: 'main',
        loadComponent: () => {
            return import('./layout/main-layout/main-layout.component')
                .then(m => m.MainLayoutComponent)
        },
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => {
                    return import('./pages/dashboard/dashboard.component')
                        .then(m => m.DashboardComponent)
                }
            },
            {
                path: 'settings',
                loadComponent: () => {
                    return import('./pages/settings/settings.component')
                        .then(m => m.SettingsComponent)
                }
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }

        ]
    }
];
