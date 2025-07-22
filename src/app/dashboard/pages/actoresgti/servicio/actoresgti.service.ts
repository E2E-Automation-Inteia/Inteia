import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../env/environment';
import { ActoresCTI } from '../../../../interfaces/ActorGTI';

const URL_API_ActoresGTI = `${environment.apiUrlPrivate}/ActoresCTI`;

@Injectable({
  providedIn: 'root'
})
export class ActoresgtiService {

  constructor() { }

  private readonly http = inject(HttpClient);

  get(): Observable<ActoresCTI[]> {
    return this.http.get<ActoresCTI[]>(URL_API_ActoresGTI);
  }

  getById(id: string): Observable<ActoresCTI> {
    return this.http.get<ActoresCTI>(`${URL_API_ActoresGTI}/${id}`);
  }

  create(actor: any): Observable<any> {
    return this.http.post<any>(URL_API_ActoresGTI, actor);
  }

  update(actor: any, id: string): Observable<any> {
    return this.http.put(`${URL_API_ActoresGTI}/${id}`, actor);
  }

  delete(id: string) {
    return this.http.delete(`${URL_API_ActoresGTI}/${id}`);
  }
}
