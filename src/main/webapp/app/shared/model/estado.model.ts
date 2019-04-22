import { ICidade } from 'app/shared/model/cidade.model';

export interface IEstado {
    id?: number;
    nome?: string;
    sigla?: string;
    latitude?: string;
    longitude?: string;
    cidades?: ICidade[];
}

export class Estado implements IEstado {
    constructor(
        public id?: number,
        public nome?: string,
        public sigla?: string,
        public latitude?: string,
        public longitude?: string,
        public cidades?: ICidade[]
    ) {}
}
