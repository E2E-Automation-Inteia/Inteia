import { Routes } from '@angular/router';
import { dashboardRoutes } from './dashboard/dashboard.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.component'),
    children: [
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/views/login/login.component'),
      }
    ]
  },
  {
    path: 'concepts',
    loadComponent: () => import('./concepts/concepts.component')
  },
  {
    path: 'public',
    loadComponent: () => import('./pages/landing/landing.component')
  },
  {
    path: 'error404',
    loadComponent: () => import('./pages/error404/error404.component')
  },
  {
    path: 'dashboard',
    children: dashboardRoutes,
  },
  {
    path: '**',
    redirectTo: 'error404',
  },
];
