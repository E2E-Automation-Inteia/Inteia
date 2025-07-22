import { BaseEntity } from "./BaseEntity.interface";

export interface Ubicacion extends BaseEntity {
    municipio: string;
    departamento: string;
    region: string;
    pais: string;
    codDane: string;
}