import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserRequest } from '../../../interfaces/user.interface';
import { environment } from '../../../../env/environment';

const URL_API_USER = `${environment.apiUrlPrivate}/user`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly http = inject(HttpClient);

  private getHeader() {
    const token = localStorage.getItem('token') ?? '';
    
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  get(): Observable<User[]> {
    return this.http.get<User[]>(URL_API_USER, { headers: this.getHeader() });
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${URL_API_USER}/${id}`, { headers: this.getHeader() });
  }

  create(user: UserRequest): Observable<UserRequest> {
    return this.http.post<UserRequest>(URL_API_USER, user, { headers: this.getHeader() });
  }

  update(user: UserRequest, id: number): Observable<any> {
    return this.http.put(`${URL_API_USER}/${id}`, user, { headers: this.getHeader() });
  }

  delete(id: number) {
    return this.http.delete(`${URL_API_USER}/${id}`, { headers: this.getHeader() });
  }
}
