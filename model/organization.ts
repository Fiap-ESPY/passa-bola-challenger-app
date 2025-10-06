import { Team } from "./team";

export interface Organization {
    id: number;
    name: string;
    email: string;
    password?: string;
    cnpj: string;
    phone: string;
    addressStreet: string;
    addressCity?: string;
    addressState?: string;
    addressComplement?: string;
    cep: string;
    team: Team;
}
