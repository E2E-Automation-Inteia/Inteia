import { BaseEntity } from "./BaseEntity.interface";

export interface Evento extends BaseEntity {
    nombre: string;
    areaConsultoria: string;
    fecha: string;
    ciudad: string;
    organizador: string;
    paginaWeb: string;
    notas: string;
}