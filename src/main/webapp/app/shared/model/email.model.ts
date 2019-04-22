import { IParticipante } from 'app/shared/model/participante.model';

export interface IEmail {
    id?: number;
    email?: string;
    participante?: IParticipante;
}

export class Email implements IEmail {
    constructor(public id?: number, public email?: string, public participante?: IParticipante) {}
}
