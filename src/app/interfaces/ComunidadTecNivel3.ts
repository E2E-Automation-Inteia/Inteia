import { BaseEntity } from "./BaseEntity.interface";
import { ComunidadTecNivel2 } from "./ComunidadTecNivel2";

export interface ComunidadTecNivel3 extends BaseEntity {
    sector: string;
    ubicacion1: string;
    ubicacion2: string;
    tweetPitch: string;
    linkedIn: string;
    web: string;
    telefono: string;
    interesObservaciones: string;
    areaRelacionamiento: string;
    estrategiaNetworking: string;
    contacto1: string;
    contacto2: string;
    ctte: string;
    startupId: string;
    startup: ComunidadTecNivel2 | null;
}