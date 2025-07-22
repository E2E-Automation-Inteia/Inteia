import { Portfolio } from "./Portfolio";

export interface Instrumento {
    id: number;
    nombre: string;
    portfolioId: number;
    portfolio: Portfolio;
}