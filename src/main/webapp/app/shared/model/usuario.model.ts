import { Moment } from 'moment';
import { IParticipante } from 'app/shared/model/participante.model';

export interface IUsuario {
    id?: number;
    login?: string;
    senha?: string;
    dataCadastro?: Moment;
    participante?: IParticipante;
}

export class Usuario implements IUsuario {
    constructor(
        public id?: number,
        public login?: string,
        public senha?: string,
        public dataCadastro?: Moment,
        public participante?: IParticipante
    ) {}
}
