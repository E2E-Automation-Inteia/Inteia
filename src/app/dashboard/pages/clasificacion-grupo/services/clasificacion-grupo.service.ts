import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../env/environment';
import { ClasificacionGrupo } from '../../../../interfaces/ClasificacionGrupo';

const URL_API_ClasificacionGrupo = `${environment.apiUrlPrivate}/ClasificacionGrupo`;

@Injectable({
  providedIn: 'root'
})
export class ClasificacionGrupoService {

  private readonly http = inject(HttpClient);

  get(): Observable<ClasificacionGrupo[]> {
    return this.http.get<ClasificacionGrupo[]>(URL_API_ClasificacionGrupo);
  }

  getById(id: string): Observable<ClasificacionGrupo> {
    return this.http.get<ClasificacionGrupo>(`${URL_API_ClasificacionGrupo}/${id}`);
  }

  create(grupo: ClasificacionGrupo): Observable<ClasificacionGrupo> {
    return this.http.post<ClasificacionGrupo>(URL_API_ClasificacionGrupo, grupo);
  }

  update(grupo: ClasificacionGrupo, id: string): Observable<ClasificacionGrupo> {
    return this.http.put<ClasificacionGrupo>(`${URL_API_ClasificacionGrupo}/${id}`, grupo);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${URL_API_ClasificacionGrupo}/${id}`);
  }
}
