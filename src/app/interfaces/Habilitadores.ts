import { BaseEntity } from "./BaseEntity.interface";

export interface Habilitadores extends BaseEntity {
    contenido: string;
    basesDeDatos: string;
    fondosRedesFamilyOffices: string;
    redesAgremiaciones: string;
}