import { Injectable } from '@angular/core';
import { Promotores } from '../../../../interfaces/Promotores';
import { environment } from '../../../../../env/environment';
import { CrudService } from '../../../../shared/services/crud-service.service';

const URL_API_Promotores = `${environment.apiUrlPrivate}/Promotores`;

@Injectable({
  providedIn: 'root'
})
export class PromotoresService extends CrudService<Promotores>  {

  constructor() {
    super(URL_API_Promotores);
  }
}
