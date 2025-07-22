import { Injectable } from '@angular/core';
import { environment } from '../../../../../env/environment';
import { CrudService } from '../../../../shared/services/crud-service.service';
import { ProgramasColciencias } from '../../../../interfaces/ProgramasColciencias';

const URL_API_ProgramasColciencias = `${environment.apiUrlPrivate}/ProgramasColciencias`;

@Injectable({
  providedIn: 'root'
})
export class ProgramascolcienciasService extends CrudService<ProgramasColciencias>  {

  constructor() {
    super(URL_API_ProgramasColciencias);
  }
}
