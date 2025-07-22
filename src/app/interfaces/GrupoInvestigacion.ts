import { BaseEntity } from "./BaseEntity.interface";

export interface GrupoInvestigacion extends BaseEntity {
    nombre: string;
    codigo: string;
    lider: string;
    institucional: boolean;
    clasificacionGrupoId: string;
    programasColcienciasId: string;
    activo: boolean;
    fechaCreacion: string;
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaModificacion: string | null;
    ubicacionId: string;
    actoresCTIIds: string;
}