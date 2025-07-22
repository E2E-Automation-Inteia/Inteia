import { ObjPorcentaje } from "./ObjPorcentaje";
import { Portfolio } from "./Portfolio";

export interface Objetivo {
    id: number;
    descripcion: string;
    portfolioId: number;
    portfolio: Portfolio;
    objPorcentaje: ObjPorcentaje | null;
}