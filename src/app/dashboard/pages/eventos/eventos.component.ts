import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Evento } from '../../../interfaces/events.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



const ELEMENT_DATA: Evento[] = [
  {
    id: '1',
    nombre: 'Evento de Innovación',
    areaConsultoria: 'Tecnología',
    fecha: '2023-10-01',
    ciudad: 'Madrid',
    organizador: 'Organización Innovadora',
    paginaWeb: 'https://evento-innovacion.com',
    notas: 'Evento sobre las últimas tendencias en innovación tecnológica.'
  },
  {
    id: '2',
    nombre: 'Conferencia de Desarrollo Sostenible',
    areaConsultoria: 'Sostenibilidad',
    fecha: '2023-11-15',
    ciudad: 'Barcelona',
    organizador: 'EcoEventos',
    paginaWeb: 'https://conferencia-sostenible.com',
    notas: 'Conferencia centrada en el desarrollo sostenible y la economía circular.'
  },
  {
    id: '3',
    nombre: 'Cumbre de Transformación Digital',
    areaConsultoria: 'Transformación Digital',
    fecha: '2024-01-20',
    ciudad: 'Bogotá',
    organizador: 'TechLatam',
    paginaWeb: 'https://cumbredigital.com',
    notas: 'Exploración de soluciones digitales para empresas modernas.'
  },
  {
    id: '4',
    nombre: 'Feria de Energías Renovables',
    areaConsultoria: 'Energía',
    fecha: '2024-02-10',
    ciudad: 'Medellín',
    organizador: 'Energía Limpia',
    paginaWeb: 'https://energiasrenovables.com',
    notas: 'Evento enfocado en energía solar, eólica y biocombustibles.'
  },
  {
    id: '5',
    nombre: 'Seminario de Big Data',
    areaConsultoria: 'Análisis de Datos',
    fecha: '2024-03-05',
    ciudad: 'Ciudad de México',
    organizador: 'DataMasters',
    paginaWeb: 'https://seminariobigdata.mx',
    notas: 'Conferencias y talleres sobre análisis y visualización de datos.'
  },
  {
    id: '6',
    nombre: 'Congreso de Ciberseguridad',
    areaConsultoria: 'Seguridad Informática',
    fecha: '2024-04-18',
    ciudad: 'Santiago de Chile',
    organizador: 'CyberSecure LATAM',
    paginaWeb: 'https://cybercongreso.cl',
    notas: 'Prevención de ciberataques y buenas prácticas de seguridad.'
  },
  {
    id: '7',
    nombre: 'Jornada de Smart Cities',
    areaConsultoria: 'Urbanismo y Tecnología',
    fecha: '2024-05-22',
    ciudad: 'Buenos Aires',
    organizador: 'SmartCities Network',
    paginaWeb: 'https://smartcitiesarg.com',
    notas: 'Desarrollo de ciudades inteligentes y sostenibles.'
  },
  {
    id: '8',
    nombre: 'Hackathon Latinoamérica',
    areaConsultoria: 'Innovación Abierta',
    fecha: '2024-06-14',
    ciudad: 'Lima',
    organizador: 'Innovadores LATAM',
    paginaWeb: 'https://hackathonlatam.com',
    notas: 'Competencia intensiva de programación para resolver retos sociales.'
  },
  {
    id: '9',
    nombre: 'Encuentro de Emprendimiento Social',
    areaConsultoria: 'Emprendimiento',
    fecha: '2024-07-03',
    ciudad: 'Quito',
    organizador: 'Red Emprende',
    paginaWeb: 'https://emprendesocial.org',
    notas: 'Historias de impacto y networking para emprendedores sociales.'
  },
  {
    id: '10',
    nombre: 'Simposio de Inteligencia Artificial',
    areaConsultoria: 'IA y Automatización',
    fecha: '2024-08-10',
    ciudad: 'San José',
    organizador: 'AI Hub',
    paginaWeb: 'https://simposioia.org',
    notas: 'Aplicaciones prácticas de IA en el sector público y privado.'
  },
  {
    id: '11',
    nombre: 'Taller de Blockchain para Negocios',
    areaConsultoria: 'Fintech',
    fecha: '2024-09-08',
    ciudad: 'Panamá',
    organizador: 'BlockBusiness',
    paginaWeb: 'https://blockbusiness.com',
    notas: 'Casos de uso de blockchain en logística y finanzas.'
  }
];


@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, CommonModule, FormsModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent {
  displayedColumns: string[] = ['select', 'id', 'nombre', 'areaConsultoria', 'fecha', 'ciudad', 'organizador', 'paginaWeb', 'notas'];
  data: Evento[] = ELEMENT_DATA;
  isEditing = false;
  selectedRows = new Set<string>();

  addRow() {
    const newId = (this.data.length + 1).toString();
    this.data = [
      ...this.data,
      {
        id: newId,
        nombre: '',
        areaConsultoria: '',
        fecha: '',
        ciudad: '',
        organizador: '',
        paginaWeb: '',
        notas: ''
      }
    ];
  }

  removeSelectedRows() {
    this.data = this.data.filter(e => !this.selectedRows.has(e.id ?? ''));
    this.selectedRows.clear();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  toggleSelection(id: string) {
    if (this.selectedRows.has(id)) {
      this.selectedRows.delete(id);
    } else {
      this.selectedRows.add(id);
    }
  }
}
