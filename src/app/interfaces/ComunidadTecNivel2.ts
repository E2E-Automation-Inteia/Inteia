import { BaseEntity } from "./BaseEntity.interface";
import { ComunidadTecNivel1 } from "./ComunidadTecNivel1";
import { ComunidadTecNivel3 } from "./ComunidadTecNivel3";



export interface ComunidadTecNivel2 extends BaseEntity {
    nombre: string;
    descripcion: string;
    link: string;
    pais: string;
    industria: string;
    comunidadId: string;
    comunidad: ComunidadTecNivel1 | null;
    startups: ComunidadTecNivel3[];
}