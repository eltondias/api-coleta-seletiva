import { Moment } from 'moment';
import { IParticipante } from 'app/shared/model/participante.model';
import { IRetirada } from 'app/shared/model/retirada.model';
import { ITipoResiduo } from 'app/shared/model/tipo-residuo.model';

export const enum TipoColetor {
    PESSOA = 'PESSOA',
    EMPRESA = 'EMPRESA',
    COOPERATIVA = 'COOPERATIVA'
}

export interface IColetor {
    id?: number;
    nome?: string;
    dataCadastro?: Moment;
    tipo?: TipoColetor;
    participante?: IParticipante;
    retiradas?: IRetirada[];
    tipoResiduos?: ITipoResiduo[];
}

export class Coletor implements IColetor {
    constructor(
        public id?: number,
        public nome?: string,
        public dataCadastro?: Moment,
        public tipo?: TipoColetor,
        public participante?: IParticipante,
        public retiradas?: IRetirada[],
        public tipoResiduos?: ITipoResiduo[]
    ) {}
}
