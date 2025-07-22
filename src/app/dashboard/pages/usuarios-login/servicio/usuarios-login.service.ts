import { Injectable } from '@angular/core';
import { CrudService } from '../../../../shared/services/crud-service.service';
import { UsuarioLogin } from '../../../../interfaces/UsuarioLogin';
import { environment } from '../../../../../env/environment';

const URL_API_UsuarioLogin = `${environment.apiUrlPrivate}/UsuariosLogin`;

@Injectable({
  providedIn: 'root'
})
export class UsuariosLoginService extends CrudService<UsuarioLogin> {

  constructor() {
    super(URL_API_UsuarioLogin);
  }
}
