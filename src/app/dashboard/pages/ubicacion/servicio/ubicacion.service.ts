import { Injectable } from '@angular/core';
import { Ubicacion } from '../../../../interfaces/Ubicacion';
import { environment } from '../../../../../env/environment';
import { CrudService } from '../../../../shared/services/crud-service.service';

const URL_API_Ubicacion = `${environment.apiUrlPrivate}/Ubicacion`;

@Injectable({
  providedIn: 'root'
})
export class UbicacionService extends CrudService<Ubicacion>  {

  constructor() {
    super(URL_API_Ubicacion);
  }
}
