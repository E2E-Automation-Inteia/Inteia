export interface UsuarioLogin {
    id: string;
    email: string;
    passwordHash: string;
    rol: Rol;
    isActive: boolean;
    creationDate: string;
}

export enum Rol {
    root,
    admin
}