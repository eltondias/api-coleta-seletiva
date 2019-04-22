import { IParticipante } from 'app/shared/model/participante.model';

export interface ITelefone {
    id?: number;
    ddd?: string;
    numero?: string;
    participante?: IParticipante;
}

export class Telefone implements ITelefone {
    constructor(public id?: number, public ddd?: string, public numero?: string, public participante?: IParticipante) {}
}
