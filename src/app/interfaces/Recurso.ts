import { Portfolio } from "./Portfolio";

export interface Recurso {
    id: number;
    nombre: string;
    portfolioId: number;
    portfolio: Portfolio;
}