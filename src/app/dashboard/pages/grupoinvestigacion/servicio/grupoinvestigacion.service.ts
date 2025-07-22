import { Injectable } from '@angular/core';
import { GrupoInvestigacion } from '../../../../interfaces/GrupoInvestigacion';
import { CrudService } from '../../../../shared/services/crud-service.service';
import { environment } from '../../../../../env/environment';

const URL_API_GrupoInvestigacion = `${environment.apiUrlPrivate}/GrupoInvestigacion`;

@Injectable({
  providedIn: 'root'
})
export class GrupoinvestigacionService extends CrudService<GrupoInvestigacion>  {

  constructor() {
    super(URL_API_GrupoInvestigacion);
  }
}
