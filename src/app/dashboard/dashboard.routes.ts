import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { VinculadoresComponent } from './pages/vinculadores/vinculadores.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'events', component: EventosComponent },      
      { path: 'vinculadores', component: VinculadoresComponent }

    ]
  },

];
