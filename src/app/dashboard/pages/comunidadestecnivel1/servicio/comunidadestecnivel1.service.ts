import { Injectable } from '@angular/core';
import { CrudService } from '../../../../shared/services/crud-service.service';
import { ComunidadTecNivel1 } from '../../../../interfaces/ComunidadTecNivel1';
import { environment } from '../../../../../env/environment';

const URL_API_ComunidadTecNivel1 = `${environment.apiUrlPrivate}/ComunidadesTecNivel1`;
@Injectable({
  providedIn: 'root'
})
export class Comunidadestecnivel1Service extends CrudService<ComunidadTecNivel1> {

  constructor() {
    super(URL_API_ComunidadTecNivel1);
  }
}
