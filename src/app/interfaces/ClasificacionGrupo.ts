import { BaseEntity } from "./BaseEntity.interface";

export interface ClasificacionGrupo extends BaseEntity {
    nombreClasificacion: string;
    descripcion: string;
}
