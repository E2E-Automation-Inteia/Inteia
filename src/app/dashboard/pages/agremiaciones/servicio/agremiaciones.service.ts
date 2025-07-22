import { Injectable } from '@angular/core';
import { environment } from '../../../../../env/environment';
import { CrudService } from '../../../../shared/services/crud-service.service';
import { Agremiaciones } from '../../../../interfaces/Agremiaciones';

const URL_API_Agremiaciones = `${environment.apiUrlPrivate}/Agremiaciones`;

@Injectable({
  providedIn: 'root'
})
export class AgremiacionesService extends CrudService<Agremiaciones>  {

  constructor() {
    super(URL_API_Agremiaciones);
  }
}
