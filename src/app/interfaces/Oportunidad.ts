import { BaseEntity } from "./BaseEntity.interface";

export interface Oportunidad extends BaseEntity {
    esPostulable: boolean;
    idProceso: string;
    descripcion: string;
    fechaMaximaPostulacion: string;
    departamento: string;
    aspectosImportantes: string[];
    urlConvocatoria: string;
}