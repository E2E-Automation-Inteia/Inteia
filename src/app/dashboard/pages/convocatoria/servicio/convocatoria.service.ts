import { Injectable } from '@angular/core';
import { Convocatoria } from '../../../../interfaces/Convocatoria';
import { environment } from '../../../../../env/environment';
import { CrudService } from '../../../../shared/services/crud-service.service';

const URL_API_Convocatoria = `${environment.apiUrlPrivate}/Convocatoria`;

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService extends CrudService<Convocatoria> {

  constructor() {
    super(URL_API_Convocatoria);
  }
}
