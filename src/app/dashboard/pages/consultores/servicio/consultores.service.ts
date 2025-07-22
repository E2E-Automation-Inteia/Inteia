import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../env/environment';
import { Consultor } from '../../../../interfaces/Consultor';

const URL_API_Consultores = `${environment.apiUrlPrivate}/Consultores`;

@Injectable({
  providedIn: 'root'
})
export class ConsultoresService {

  constructor() { }

  private readonly http = inject(HttpClient);

  get(): Observable<Consultor[]> {
    return this.http.get<Consultor[]>(URL_API_Consultores);
  }

  getById(id: string): Observable<Consultor> {
    return this.http.get<Consultor>(`${URL_API_Consultores}/${id}`);
  }

  create(consultor: any): Observable<any> {
    return this.http.post<any>(URL_API_Consultores, consultor);
  }

  update(consultor: any, id: string): Observable<any> {
    return this.http.put(`${URL_API_Consultores}/${id}`, consultor);
  }

  delete(id: string) {
    return this.http.delete(`${URL_API_Consultores}/${id}`);
  }
}
