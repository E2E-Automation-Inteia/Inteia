import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, // <- ✅ esto es lo que te falta
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterOutlet,
    SidebarComponent,
    ToolbarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  theme = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    this.theme = savedTheme === 'dark';
    this.applyTheme();
  }
  
  toggleDarkMode(): void {
    this.theme = !this.theme;
    localStorage.setItem('theme', this.theme ? 'dark' : 'light');
    this.applyTheme();
  }
  
  applyTheme(): void {
    document.body.classList.toggle('dark', this.theme);
  }
  
}
