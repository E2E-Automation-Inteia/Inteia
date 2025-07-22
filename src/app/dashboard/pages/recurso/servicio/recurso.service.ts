import { Injectable } from '@angular/core';
import { Recurso } from '../../../../interfaces/Recurso';
import { environment } from '../../../../../env/environment';
import { CrudService } from '../../../../shared/services/crud-service.service';

const URL_API_Recurso = `${environment.apiUrlPrivate}/Recurso`;

@Injectable({
  providedIn: 'root'
})
export class RecursoService extends CrudService<Recurso> {

  constructor() {
    super(URL_API_Recurso);
  }
}
