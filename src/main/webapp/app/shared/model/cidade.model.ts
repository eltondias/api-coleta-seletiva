import { IEndereco } from 'app/shared/model/endereco.model';
import { IEstado } from 'app/shared/model/estado.model';

export interface ICidade {
    id?: number;
    nome?: string;
    latitude?: string;
    longitude?: string;
    enderecos?: IEndereco[];
    estado?: IEstado;
}

export class Cidade implements ICidade {
    constructor(
        public id?: number,
        public nome?: string,
        public latitude?: string,
        public longitude?: string,
        public enderecos?: IEndereco[],
        public estado?: IEstado
    ) {}
}
