import { Injectable } from '@angular/core';
import { ObjPorcentaje } from '../../../../interfaces/ObjPorcentaje';
import { environment } from '../../../../../env/environment';
import { CrudService } from '../../../../shared/services/crud-service.service';

const URL_API_ObjPorcentaje = `${environment.apiUrlPrivate}/ObjPorcentaje`;

@Injectable({
  providedIn: 'root'
})
export class ObjporcentajeService extends CrudService<ObjPorcentaje>  {

  constructor() {
    super(URL_API_ObjPorcentaje);
  }
}
