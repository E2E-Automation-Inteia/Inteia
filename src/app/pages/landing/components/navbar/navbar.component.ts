import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navLinks = [
    { label: 'Inicio', id: 'inicio' },
    { label: 'Servicios', id: 'servicios' },
    { label: 'Soluciones', id: 'soluciones' },
    { label: 'Clientes', id: 'clientes' },
    { label: 'Equipo', id: 'equipo' },
    { label: 'Contacto', id: 'contacto' }
  ];

    scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
