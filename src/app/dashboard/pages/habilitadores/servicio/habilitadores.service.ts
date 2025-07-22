import { Injectable } from '@angular/core';
import { Habilitadores } from '../../../../interfaces/Habilitadores';
import { environment } from '../../../../../env/environment';
import { CrudService } from '../../../../shared/services/crud-service.service';

const URL_API_Habilitadores = `${environment.apiUrlPrivate}/Habilitadores`;

@Injectable({
  providedIn: 'root'
})
export class HabilitadoresService extends CrudService<Habilitadores>  {

  constructor() {
    super(URL_API_Habilitadores);
  }
}
