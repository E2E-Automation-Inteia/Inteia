import { BaseEntity } from "./BaseEntity.interface";

export interface Consultor extends BaseEntity {
    empresaConsultora: string;
    areasConsultoria: string;
    servicios: string;
    ciudad: string;
    contacto: string;
    paginaWeb: string;
    notas: string;
}