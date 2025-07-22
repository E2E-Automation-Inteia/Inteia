import { Instrumento } from "./Instrumento";
import { Objetivo } from "./Objetivo";
import { Recurso } from "./Recurso";
import { Usuario } from "./Usuario";

export interface Portfolio {
    id: number;
    nombre: string;
    fechaApertura: string;
    fechaCierre: string;
    usuarioId: string;
    usuario: Usuario;
    objetivos: Objetivo[];
    recursos: Recurso[];
    instrumentos: Instrumento[];
}