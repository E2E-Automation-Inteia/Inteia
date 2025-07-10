import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; 
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

interface Oportunidad {
  id: string;
  esPostulable: boolean;
  idProceso: string;
  descripcion: string;
  fechaMaximaPostulacion: string;
  departamento: string;
  aspectosImportantes: string[];
  urlConvocatoria: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'descripcion', 'fechaMaximaPostulacion', 'departamento', 'aspectosImportantes', 'urlConvocatoria'];
  dataSource!: MatTableDataSource<Oportunidad>;

  expandedRow: number | null = null;

  oportunidades: Oportunidad[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOportunidades().subscribe((data: Oportunidad[]) => {
      this.oportunidades = data;
      this.dataSource = new MatTableDataSource(this.oportunidades);
    });
  }

  fetchOportunidades(): Observable<Oportunidad[]> {
    return this.http.get<Oportunidad[]>('http://localhost:5234/api/oportunidades');
  }

  toggleExpand(index: number): void {
    this.expandedRow = this.expandedRow === index ? null : index;
  }

  togglePostulable(index: number): void {
    this.oportunidades[index].esPostulable = !this.oportunidades[index].esPostulable;
  }
  
}
