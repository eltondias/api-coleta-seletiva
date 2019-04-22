import { Moment } from 'moment';
import { IHorarioPreferencialRetirada } from 'app/shared/model/horario-preferencial-retirada.model';
import { IImagem } from 'app/shared/model/imagem.model';
import { ITipoResiduo } from 'app/shared/model/tipo-residuo.model';
import { IProdutor } from 'app/shared/model/produtor.model';

export interface ISolicitacaoRetirada {
    id?: number;
    descricao?: string;
    dataHora?: Moment;
    horarioPreferencialRetiradas?: IHorarioPreferencialRetirada[];
    imagems?: IImagem[];
    tipoResiduos?: ITipoResiduo[];
    produtor?: IProdutor;
}

export class SolicitacaoRetirada implements ISolicitacaoRetirada {
    constructor(
        public id?: number,
        public descricao?: string,
        public dataHora?: Moment,
        public horarioPreferencialRetiradas?: IHorarioPreferencialRetirada[],
        public imagems?: IImagem[],
        public tipoResiduos?: ITipoResiduo[],
        public produtor?: IProdutor
    ) {}
}
