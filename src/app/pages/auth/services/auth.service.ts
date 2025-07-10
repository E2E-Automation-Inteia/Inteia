import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../env/environment';
import { Observable } from 'rxjs';
import { UserRequest } from '../../../interfaces/user.interface';

const URL_REGISTER = `${environment.apiUrlAuth}/register`
const URL_LOGIN = `${environment.apiUrlAuth}/login`

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient)

  login(form:{email: string, password: string}): Observable<any> {
    return this.http.post(URL_LOGIN, form)
  }

  register(data:UserRequest){
    return this.http.post(URL_REGISTER, data)
  }
}
