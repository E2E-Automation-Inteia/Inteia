import { BaseEntity } from "./BaseEntity.interface";

export interface ComunidadTecNivel1 extends BaseEntity {
    nombre: string;
    gratuitaOPagada: string;
    actividad: string;
    lugar: string;
    contactos: string;
}