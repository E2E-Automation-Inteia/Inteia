import { BaseEntity } from "./BaseEntity.interface";

export enum TipoVinculador {
    Agremiaciones,
    CamaraDeComercio
}

export interface Vinculador extends BaseEntity {
    tipo: TipoVinculador;
    nombre: string;
    ciudad: string;
    direccion: string;
    telefono: string;
    correo: string;
    web: string;
}