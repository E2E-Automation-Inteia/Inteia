import { Injectable } from '@angular/core';
import { Usuario } from '../../../../interfaces/Usuario';
import { environment } from '../../../../../env/environment';
import { CrudService } from '../../../../shared/services/crud-service.service';

const URL_API_Usuario = `${environment.apiUrlPrivate}/Usuarios`;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends CrudService<Usuario>  {

  constructor() {
    super(URL_API_Usuario);
  }
}
