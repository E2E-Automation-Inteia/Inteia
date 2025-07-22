import { Injectable } from '@angular/core';
import { Portfolio } from '../../../../interfaces/Portfolio';
import { environment } from '../../../../../env/environment';
import { CrudService } from '../../../../shared/services/crud-service.service';

const URL_API_Portfolio = `${environment.apiUrlPrivate}/Portfolio`;

@Injectable({
  providedIn: 'root'
})
export class PortfolioService extends CrudService<Portfolio>  {

  constructor() {
    super(URL_API_Portfolio);
  }
}
