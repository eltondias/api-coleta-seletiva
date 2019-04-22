import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ColetaseletivaSharedModule } from 'app/shared';
import {
    SolicitacaoRetiradaComponent,
    SolicitacaoRetiradaDetailComponent,
    SolicitacaoRetiradaUpdateComponent,
    SolicitacaoRetiradaDeletePopupComponent,
    SolicitacaoRetiradaDeleteDialogComponent,
    solicitacaoRetiradaRoute,
    solicitacaoRetiradaPopupRoute
} from './';

const ENTITY_STATES = [...solicitacaoRetiradaRoute, ...solicitacaoRetiradaPopupRoute];

@NgModule({
    imports: [ColetaseletivaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SolicitacaoRetiradaComponent,
        SolicitacaoRetiradaDetailComponent,
        SolicitacaoRetiradaUpdateComponent,
        SolicitacaoRetiradaDeleteDialogComponent,
        SolicitacaoRetiradaDeletePopupComponent
    ],
    entryComponents: [
        SolicitacaoRetiradaComponent,
        SolicitacaoRetiradaUpdateComponent,
        SolicitacaoRetiradaDeleteDialogComponent,
        SolicitacaoRetiradaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ColetaseletivaSolicitacaoRetiradaModule {}
