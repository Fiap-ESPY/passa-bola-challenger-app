import { Player } from "./player";

export interface Organization {
    id: number;
    email: string;
    cnpj: string;
    phone: string;
    addressStreet: string;
    addressCity?: string;
    addressState?: string;
    addressComplement?: string;

    cep: string;

    teamName: string;
    teamCrestUri: string;

    players: Player[];

    password?: string;
}
