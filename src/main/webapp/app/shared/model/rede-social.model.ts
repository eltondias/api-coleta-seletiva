import { IParticipante } from 'app/shared/model/participante.model';

export const enum TipoRedeSocial {
    FACEBOOK = 'FACEBOOK',
    TWITER = 'TWITER',
    LINKEDIN = 'LINKEDIN',
    INSTAGRAN = 'INSTAGRAN',
    YOUTUBE = 'YOUTUBE'
}

export interface IRedeSocial {
    id?: number;
    tipoRedeSocial?: TipoRedeSocial;
    url?: string;
    participante?: IParticipante;
}

export class RedeSocial implements IRedeSocial {
    constructor(public id?: number, public tipoRedeSocial?: TipoRedeSocial, public url?: string, public participante?: IParticipante) {}
}
