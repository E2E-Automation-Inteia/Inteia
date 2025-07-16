import { Component } from '@angular/core';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems = [
  { label: 'Inicio', icon: 'dashboard', route: '/dashboard' },
  { label: 'Conceptos', icon: 'lightbulb', route: '/dashboard/concepts' },
  { label: 'Usuarios', icon: 'group', route: '/dashboard/usuarios' },
  { label: 'Eventos', icon: 'calendar_today', route: '/dashboard/events' },
  { label: 'Vinculadores', icon: 'person_add', route: '/dashboard/vinculadores' },
  { label: 'Clasificación Grupo', icon: 'groups', route: '/dashboard/clasificaciongrupo' },
  { label: 'Com. Tec. Nivel 1', icon: 'school', route: '/dashboard/comunidadestecnivel1' },
  { label: 'Com. Tec. Nivel 2', icon: 'school', route: '/dashboard/comunidadestecnivel2' },
  { label: 'Com. Tec. Nivel 3', icon: 'school', route: '/dashboard/comunidadestecnivel3' },
  { label: 'Consultores', icon: 'badge', route: '/dashboard/consultores' },
  { label: 'Convocatoria', icon: 'campaign', route: '/dashboard/convocatoria' },
  { label: 'Grupo Investigación', icon: 'science', route: '/dashboard/grupoinvestigacion' },
  { label: 'Instrumento', icon: 'tune', route: '/dashboard/instrumento' },
  { label: 'Objetivo', icon: 'flag', route: '/dashboard/objetivo' },
  { label: 'Obj. Porcentaje', icon: 'percent', route: '/dashboard/objporcentaje' },
  { label: 'Portfolio', icon: 'folder', route: '/dashboard/portfolio' },
  { label: 'Programas Colciencias', icon: 'school', route: '/dashboard/programascolciencias' },
  { label: 'Recurso', icon: 'widgets', route: '/dashboard/recurso' },
  { label: 'Tipo Apoyo', icon: 'volunteer_activism', route: '/dashboard/tipoApoyo' },
];

settingsItem = { label: 'Ajustes', icon: 'settings', route: '/dashboard/settings' };

}
