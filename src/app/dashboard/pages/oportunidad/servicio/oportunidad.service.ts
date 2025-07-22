import { Injectable } from '@angular/core';
import { Oportunidad } from '../../../../interfaces/Oportunidad';
import { environment } from '../../../../../env/environment';
import { CrudService } from '../../../../shared/services/crud-service.service';

const URL_API_Oportunidad = `${environment.apiUrlPrivate}/Oportunidades`;

@Injectable({
  providedIn: 'root'
})
export class OportunidadService extends CrudService<Oportunidad>  {

  constructor() {
    super(URL_API_Oportunidad);
  }
}
