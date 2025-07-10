import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import * as AOS from 'aos';


@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements AfterViewInit, OnInit {
[x: string]: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        once: false,
        mirror: true
      });
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  section2Info = [
    {
      number: '01',
      title: 'Movilidad',
      description: 'Transformamos el transporte con tecnología inteligente que mejora la movilidad urbana y reduce emisiones.',
      image:'assets/movilidad.jpg'
    },
    {
      number: '02',
      title: 'Medio Ambiente',
      description: 'Reducimos la huella de carbono con herramientas que garantizan sostenibilidad y cumplimiento normativo.',
      image:'assets/medio-ambiente.jpg'
    },
    {
      number: '03',
      title: 'Energía',
      description: 'Aceleramos la transición energética mediante soluciones digitales que generan valor sostenible',
      image:'assets/energia.jpg'
    },
  ]

  currentIndex = 0;

  cards = [
    {
      title: 'Centros de gestión inteligente de movilidad',
      description:
        'Planea la movilidad de los territorios, gestiona y mitiga los incidentes y toma decisiones fundadas en información relevante. Ayudamos a salvaguardar la vida de las personas en la vía.',
      icon: 'cloud',
      features: [
        'Monitoreo en tiempo real',
        'Gestión de incidentes',
        'Análisis de datos para toma de decisiones'
      ]
    },
    {
      title: 'IA de analítica de imágenes',
      description:
        'Posibilita la generación de alertas, captura de datos y optimización de recursos en infraestructura, sin necesidad de adquirir un nuevo hardware.',
      icon: 'ai',
      features: [
        'Alertas automáticas',
        'Captura inteligente de datos',
        'Optimización de recursos existentes'
      ]
    },
    {
      title: 'Movilidad como servicio - MaaS - Appimotion',
      description:
        'Ofrece un ecosistema de movilidad integrado y sostenible para empresas y territorios.',
      icon: 'data',
      features: [
        'Integración de servicios de movilidad',
        'Sostenibilidad y eficiencia',
        'Soluciones personalizadas para empresas y territorios'
      ]
    }
  ];

  nextCard() {
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
  }

  prevCard() {
    this.currentIndex =
      (this.currentIndex - 1 + this.cards.length) % this.cards.length;
  }
  

}


