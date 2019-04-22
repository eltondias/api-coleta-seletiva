import { Moment } from 'moment';
import { IParticipante } from 'app/shared/model/participante.model';
import { ISolicitacaoRetirada } from 'app/shared/model/solicitacao-retirada.model';

export const enum TipoProdutor {
    RESIDENCIAL = 'RESIDENCIAL',
    COMERCIAL = 'COMERCIAL',
    INDUSTRIAL = 'INDUSTRIAL',
    GOVERNAMENTAL = 'GOVERNAMENTAL',
    EDUCACIONAL = 'EDUCACIONAL',
    CONDOMINIAL = 'CONDOMINIAL'
}

export interface IProdutor {
    id?: number;
    nome?: string;
    dataCadastro?: Moment;
    tipo?: TipoProdutor;
    participante?: IParticipante;
    solicitacaoRetiradas?: ISolicitacaoRetirada[];
}

export class Produtor implements IProdutor {
    constructor(
        public id?: number,
        public nome?: string,
        public dataCadastro?: Moment,
        public tipo?: TipoProdutor,
        public participante?: IParticipante,
        public solicitacaoRetiradas?: ISolicitacaoRetirada[]
    ) {}
}
