import { Injectable } from '@angular/core';
import { CrudService } from '../../../../shared/services/crud-service.service';
import { ComunidadTecNivel2 } from '../../../../interfaces/ComunidadTecNivel2';
import { environment } from '../../../../../env/environment';

const URL_API_ComunidadTecNivel2 = `${environment.apiUrlPrivate}/ComunidadesTecNivel2`;
@Injectable({
  providedIn: 'root'
})
export class Comunidadestecnivel2Service extends CrudService<ComunidadTecNivel2> {

  constructor() {
    super(URL_API_ComunidadTecNivel2);
  }
}
