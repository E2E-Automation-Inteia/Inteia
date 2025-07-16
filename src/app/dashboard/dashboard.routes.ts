import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { VinculadoresComponent } from './pages/vinculadores/vinculadores.component';
import { Comunidadestecnivel1Component } from './pages/comunidadestecnivel1/comunidadestecnivel1.component';
import { Comunidadestecnivel2Component } from './pages/comunidadestecnivel2/comunidadestecnivel2.component';
import { Comunidadestecnivel3Component } from './pages/comunidadestecnivel3/comunidadestecnivel3.component';
import { ConsultoresComponent } from './pages/consultores/consultores.component';
import { ConvocatoriaComponent } from './pages/convocatoria/convocatoria.component';
import { GrupoinvestigacionComponent } from './pages/grupoinvestigacion/grupoinvestigacion.component';
import { InstrumentoComponent } from './pages/instrumento/instrumento.component';
import { ObjetivoComponent } from './pages/objetivo/objetivo.component';
import { ObjporcentajeComponent } from './pages/objporcentaje/objporcentaje.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ProgramascolcienciasComponent } from './pages/programascolciencias/programascolciencias.component';
import { RecursoComponent } from './pages/recurso/recurso.component';
import { TipoApoyoComponent } from './pages/tipo-apoyo/tipo-apoyo.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ClasificacionGrupoComponent } from './pages/clasificacion-grupo/clasificacion-grupo.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'events', component: EventosComponent },
      { path: 'vinculadores', component: VinculadoresComponent },
      { path: 'clasificaciongrupo', component: ClasificacionGrupoComponent  },
      { path: 'comunidadestecnivel1', component: Comunidadestecnivel1Component },
      { path: 'comunidadestecnivel2', component: Comunidadestecnivel2Component },
      { path: 'comunidadestecnivel3', component: Comunidadestecnivel3Component },
      { path: 'consultores', component: ConsultoresComponent },
      { path: 'convocatoria', component: ConvocatoriaComponent },
      { path: 'grupoinvestigacion', component: GrupoinvestigacionComponent },
      { path: 'instrumento', component: InstrumentoComponent },
      { path: 'objetivo', component: ObjetivoComponent },
      { path: 'objporcentaje', component: ObjporcentajeComponent },
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'programascolciencias', component: ProgramascolcienciasComponent },
      { path: 'recurso', component: RecursoComponent },
      { path: 'tipoApoyo', component: TipoApoyoComponent },
      { path: 'usuarios', component: UsuariosComponent },
    ]
  },

];
