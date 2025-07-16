import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../env/environment';
import { Evento } from '../../../../interfaces/events.interface';

const URL_API_Eventos = `${environment.apiUrlPrivate}/Eventos`;
@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor() { }




  private readonly http = inject(HttpClient);

  get(): Observable<Evento[]> {
    return this.http.get<Evento[]>(URL_API_Eventos);
  }

  getById(id: string): Observable<Evento> {
    return this.http.get<Evento>(`${URL_API_Eventos}/${id}`);
  }

  create(Eventos: any): Observable<any> {
    return this.http.post<any>(URL_API_Eventos, Eventos);
  }

  update(Eventos: any, id: string): Observable<any> {
    return this.http.put(`${URL_API_Eventos}/${id}`, Eventos);
  }

  delete(id: string) {
    return this.http.delete(`${URL_API_Eventos}/${id}`);
  }
}

