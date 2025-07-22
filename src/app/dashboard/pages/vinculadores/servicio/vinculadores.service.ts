import { Injectable } from '@angular/core';
import { Vinculador } from '../../../../interfaces/Vinculador';
import { environment } from '../../../../../env/environment';
import { CrudService } from '../../../../shared/services/crud-service.service';

const URL_API_Vinculador = `${environment.apiUrlPrivate}/Vinculadores`;

@Injectable({
  providedIn: 'root'
})
export class VinculadoresService extends CrudService<Vinculador>  {

  constructor() {
    super(URL_API_Vinculador);
  }
}
