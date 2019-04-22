import { Moment } from 'moment';
import { IEndereco } from 'app/shared/model/endereco.model';
import { ITelefone } from 'app/shared/model/telefone.model';
import { IEmail } from 'app/shared/model/email.model';
import { IRedeSocial } from 'app/shared/model/rede-social.model';
import { IUsuario } from 'app/shared/model/usuario.model';

export const enum EstadoParticipante {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO',
    SUSPENSO = 'SUSPENSO'
}

export interface IParticipante {
    id?: number;
    nome?: string;
    urlFotoPerfil?: string;
    cpfCnpj?: string;
    dataCadastro?: Moment;
    ranking?: number;
    estado?: EstadoParticipante;
    enderecos?: IEndereco[];
    telefones?: ITelefone[];
    emails?: IEmail[];
    redeSocials?: IRedeSocial[];
    usuario?: IUsuario;
}

export class Participante implements IParticipante {
    constructor(
        public id?: number,
        public nome?: string,
        public urlFotoPerfil?: string,
        public cpfCnpj?: string,
        public dataCadastro?: Moment,
        public ranking?: number,
        public estado?: EstadoParticipante,
        public enderecos?: IEndereco[],
        public telefones?: ITelefone[],
        public emails?: IEmail[],
        public redeSocials?: IRedeSocial[],
        public usuario?: IUsuario
    ) {}
}
