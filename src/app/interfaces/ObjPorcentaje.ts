import { Objetivo } from "./Objetivo";

export interface ObjPorcentaje {
    id: number;
    porcentaje: number;
    objetivoId: number;
    objetivo: Objetivo;
}