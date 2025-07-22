import { Injectable } from '@angular/core';
import { CrudService } from '../../../../shared/services/crud-service.service';
import { CamaraDeComercio } from '../../../../interfaces/CamaraDeComercio';
import { environment } from '../../../../../env/environment';

const URL_API_CamaraDeComercio = `${environment.apiUrlPrivate}/CamaraDeComercio`;

@Injectable({
  providedIn: 'root'
})
export class CamaradecomercioService extends CrudService<CamaraDeComercio> {

  constructor() {
    super(URL_API_CamaraDeComercio);
  }
}
