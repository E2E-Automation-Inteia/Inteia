import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
      { path: 'events', loadComponent: () => import('./pages/eventos/eventos.component').then(m => m.EventosComponent) },
      { path: 'vinculadores', loadComponent: () => import('./pages/vinculadores/vinculadores.component').then(m => m.VinculadoresComponent) },
      { path: 'clasificaciongrupo', loadComponent: () => import('./pages/clasificacion-grupo/clasificacion-grupo.component').then(m => m.ClasificacionGrupoComponent) },
      { path: 'comunidadestecnivel1', loadComponent: () => import('./pages/comunidadestecnivel1/comunidadestecnivel1.component').then(m => m.Comunidadestecnivel1Component) },
      { path: 'comunidadestecnivel2', loadComponent: () => import('./pages/comunidadestecnivel2/comunidadestecnivel2.component').then(m => m.Comunidadestecnivel2Component) },
      { path: 'comunidadestecnivel3', loadComponent: () => import('./pages/comunidadestecnivel3/comunidadestecnivel3.component').then(m => m.Comunidadestecnivel3Component) },
      { path: 'consultores', loadComponent: () => import('./pages/consultores/consultores.component').then(m => m.ConsultoresComponent) },
      { path: 'convocatoria', loadComponent: () => import('./pages/convocatoria/convocatoria.component').then(m => m.ConvocatoriaComponent) },
      { path: 'grupoinvestigacion', loadComponent: () => import('./pages/grupoinvestigacion/grupoinvestigacion.component').then(m => m.GrupoinvestigacionComponent) },
      { path: 'instrumento', loadComponent: () => import('./pages/instrumento/instrumento.component').then(m => m.InstrumentoComponent) },
      { path: 'objetivo', loadComponent: () => import('./pages/objetivo/objetivo.component').then(m => m.ObjetivoComponent) },
      { path: 'objporcentaje', loadComponent: () => import('./pages/objporcentaje/objporcentaje.component').then(m => m.ObjporcentajeComponent) },
      { path: 'portfolio', loadComponent: () => import('./pages/portfolio/portfolio.component').then(m => m.PortfolioComponent) },
      { path: 'programascolciencias', loadComponent: () => import('./pages/programascolciencias/programascolciencias.component').then(m => m.ProgramascolcienciasComponent) },
      { path: 'recurso', loadComponent: () => import('./pages/recurso/recurso.component').then(m => m.RecursoComponent) },
      { path: 'tipoApoyo', loadComponent: () => import('./pages/tipo-apoyo/tipo-apoyo.component').then(m => m.TipoApoyoComponent) },
      { path: 'usuarios', loadComponent: () => import('./pages/usuarios/usuarios.component').then(m => m.UsuariosComponent) },
      { path: 'actoresgti', loadComponent: () => import('./pages//actoresgti/actoresgti.component').then(m => m.ActoresgtiComponent) },
      { path: 'agremiaciones', loadComponent: () => import('./pages//agremiaciones/agremiaciones.component').then(m => m.AgremiacionesComponent) },
      { path: 'camaradecomercio', loadComponent: () => import('./pages//camaradecomercio/camaradecomercio.component').then(m => m.CamaradecomercioComponent) },
      { path: 'habilitadores', loadComponent: () => import('./pages//habilitadores/habilitadores.component').then(m => m.HabilitadoresComponent) },
      { path: 'oportunidad', loadComponent: () => import('./pages//oportunidad/oportunidad.component').then(m => m.OportunidadComponent) },
      { path: 'promotores', loadComponent: () => import('./pages//promotores/promotores.component').then(m => m.PromotoresComponent) },
      { path: 'ubicacion', loadComponent: () => import('./pages//ubicacion/ubicacion.component').then(m => m.UbicacionComponent) },
      { path: 'users', loadComponent: () => import('./pages/usuarios-login/usuarios-login.component').then(m => m.UsuariosLoginComponent) },
    ]
  }
];
