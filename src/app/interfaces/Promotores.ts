import { BaseEntity } from "./BaseEntity.interface";

export interface Promotores extends BaseEntity {
    medio: string;
    descripcion: string;
    direccion: string;
}