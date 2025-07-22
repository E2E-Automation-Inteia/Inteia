import { Component } from '@angular/core';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  expandedMenus: { [key: string]: boolean } = {};

  toggleMenu(label: string): void {
    this.expandedMenus[label] = !this.expandedMenus[label];
  }

  menuItems = [
    { label: 'Inicio', icon: 'dashboard', route: '/dashboard' },
    {
      label: 'Portfolio', icon: 'folder', children: [
        { label: 'Portfolio', icon: 'folder_open', route: '/dashboard/portfolio' },
        { label: 'Usuarios', icon: 'group', route: '/dashboard/usuarios' },
        { label: 'Tipo Apoyo', icon: 'volunteer_activism', route: '/dashboard/tipoApoyo' },
        { label: 'Objetivo', icon: 'flag', route: '/dashboard/objetivo' },
        { label: 'Obj. Porcentaje', icon: 'percent', route: '/dashboard/objporcentaje' },
        { label: 'Recurso', icon: 'widgets', route: '/dashboard/recurso' },
        { label: 'Instrumento', icon: 'tune', route: '/dashboard/instrumento' },
      ]
    },
    {
      label: 'Com. Tec. Nivel 1', icon: 'school', children: [
        { label: 'Com. Tec. Nivel 1', icon: 'school', route: '/dashboard/comunidadestecnivel1' },
        { label: 'Com. Tec. Nivel 2', icon: 'school', route: '/dashboard/comunidadestecnivel2' },
        { label: 'Com. Tec. Nivel 3', icon: 'school', route: '/dashboard/comunidadestecnivel3' },
      ]
    },
    {
      label: 'Grupo Investigación', icon: 'science', children: [
        { label: 'Grupo Investigación', icon: 'science', route: '/dashboard/grupoinvestigacion' },
        { label: 'Convocatoria', icon: 'campaign', route: '/dashboard/convocatoria' },
        { label: 'Clasificación Grupo', icon: 'groups', route: '/dashboard/clasificaciongrupo' },
        { label: 'Programas Colciencias', icon: 'school', route: '/dashboard/programascolciencias' },
        { label: 'Actores GTI', icon: 'group_work', route: '/dashboard/actoresgti' },
        { label: 'Ubicación', icon: 'location_on', route: '/dashboard/ubicacion' }
      ]
    },
    {
      label: 'Vinculadores', icon: 'person_add', children: [
        { label: 'Vinculadores', icon: 'person_add', route: '/dashboard/vinculadores' },
        { label: 'Agremiaciones', icon: 'apartment', route: '/dashboard/agremiaciones' },
        { label: 'Cámara de Comercio', icon: 'business', route: '/dashboard/camaradecomercio' },
      ]
    },
    { label: 'Eventos', icon: 'calendar_today', route: '/dashboard/events' },
    { label: 'Consultores', icon: 'badge', route: '/dashboard/consultores' },
    { label: 'Habilitadores', icon: 'extension', route: '/dashboard/habilitadores' },
    { label: 'Oportunidad', icon: 'track_changes', route: '/dashboard/oportunidad' },
    { label: 'Promotores', icon: 'campaign', route: '/dashboard/promotores' },
    { label: 'Usuarios Registrados', icon: 'person', route: '/dashboard/users' },
  ];

  settingsItem = { label: 'Ajustes', icon: 'settings', route: '/dashboard/settings' };
}