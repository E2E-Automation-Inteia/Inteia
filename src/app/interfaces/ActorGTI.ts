import { BaseEntity } from "./BaseEntity.interface";

export interface ActoresCTI extends BaseEntity {
    interesInteia: string;
    nombreEntidad: string;
    nombreActor: string;
    reconocidoComo: string;
    ciudadDepartamento: string;
    paginaWeb: string;
    sector: string;
    resolucion: string;
    fechaExpedicion: string | null;
    fechaNotificacion: string | null;
    vigenciaHasta: string | null;
    grupoInvestigacionId: string;
}