import { Injectable } from '@angular/core';
import { Instrumento } from '../../../../interfaces/Instrumento';
import { environment } from '../../../../../env/environment';
import { CrudService } from '../../../../shared/services/crud-service.service';
const URL_API_Instrumento = `${environment.apiUrlPrivate}/Instrumento`;

@Injectable({
  providedIn: 'root'
})
export class InstrumentoService extends CrudService<Instrumento>  {

  constructor() {
    super(URL_API_Instrumento);
  }
}
