import { Injectable } from '@angular/core';
import { TipoDeApoyo } from '../../../../interfaces/TipoDeApoyo';
import { environment } from '../../../../../env/environment';
import { CrudService } from '../../../../shared/services/crud-service.service';

const URL_API_TipoDeApoyo = `${environment.apiUrlPrivate}/TipoDeApoyo`;

@Injectable({
  providedIn: 'root'
})
export class TipoApoyoService extends CrudService<TipoDeApoyo>  {

  constructor() {
    super(URL_API_TipoDeApoyo);
  }
}
