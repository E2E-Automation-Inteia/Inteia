import { Injectable } from '@angular/core';
import { ComunidadTecNivel3 } from '../../../../interfaces/ComunidadTecNivel3';
import { environment } from '../../../../../env/environment';
import { CrudService } from '../../../../shared/services/crud-service.service';

const URL_API_ComunidadTecNivel3 = `${environment.apiUrlPrivate}/ComunidadesTecNivel3`;

@Injectable({
  providedIn: 'root'
})
export class Comunidadestecnivel3Service extends CrudService<ComunidadTecNivel3> {

  constructor() {
    super(URL_API_ComunidadTecNivel3);
  }
}
