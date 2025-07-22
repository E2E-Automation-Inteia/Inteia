import { Injectable } from '@angular/core';
import { Objetivo } from '../../../../interfaces/Objetivo';
import { environment } from '../../../../../env/environment';
import { CrudService } from '../../../../shared/services/crud-service.service';

const URL_API_Objetivo = `${environment.apiUrlPrivate}/Objetivo`;

@Injectable({
  providedIn: 'root'
})
export class ObjetivoService extends CrudService<Objetivo>  {

  constructor() {
    super(URL_API_Objetivo);
  }
}
