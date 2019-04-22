import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'estado',
                loadChildren: './estado/estado.module#ColetaseletivaEstadoModule'
            },
            {
                path: 'cidade',
                loadChildren: './cidade/cidade.module#ColetaseletivaCidadeModule'
            },
            {
                path: 'endereco',
                loadChildren: './endereco/endereco.module#ColetaseletivaEnderecoModule'
            },
            {
                path: 'participante',
                loadChildren: './participante/participante.module#ColetaseletivaParticipanteModule'
            },
            {
                path: 'telefone',
                loadChildren: './telefone/telefone.module#ColetaseletivaTelefoneModule'
            },
            {
                path: 'email',
                loadChildren: './email/email.module#ColetaseletivaEmailModule'
            },
            {
                path: 'rede-social',
                loadChildren: './rede-social/rede-social.module#ColetaseletivaRedeSocialModule'
            },
            {
                path: 'usuario',
                loadChildren: './usuario/usuario.module#ColetaseletivaUsuarioModule'
            },
            {
                path: 'coletor',
                loadChildren: './coletor/coletor.module#ColetaseletivaColetorModule'
            },
            {
                path: 'produtor',
                loadChildren: './produtor/produtor.module#ColetaseletivaProdutorModule'
            },
            {
                path: 'solicitacao-retirada',
                loadChildren: './solicitacao-retirada/solicitacao-retirada.module#ColetaseletivaSolicitacaoRetiradaModule'
            },
            {
                path: 'tipo-residuo',
                loadChildren: './tipo-residuo/tipo-residuo.module#ColetaseletivaTipoResiduoModule'
            },
            {
                path: 'retirada',
                loadChildren: './retirada/retirada.module#ColetaseletivaRetiradaModule'
            },
            {
                path: 'horario-preferencial-retirada',
                loadChildren:
                    './horario-preferencial-retirada/horario-preferencial-retirada.module#ColetaseletivaHorarioPreferencialRetiradaModule'
            },
            {
                path: 'imagem',
                loadChildren: './imagem/imagem.module#ColetaseletivaImagemModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ColetaseletivaEntityModule {}
