import { BaseEntity } from "./BaseEntity.interface";

export interface Convocatoria extends BaseEntity {
    nombre: string;
    a: number;
}