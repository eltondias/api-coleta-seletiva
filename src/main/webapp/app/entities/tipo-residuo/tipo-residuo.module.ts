import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ColetaseletivaSharedModule } from 'app/shared';
import {
    TipoResiduoComponent,
    TipoResiduoDetailComponent,
    TipoResiduoUpdateComponent,
    TipoResiduoDeletePopupComponent,
    TipoResiduoDeleteDialogComponent,
    tipoResiduoRoute,
    tipoResiduoPopupRoute
} from './';

const ENTITY_STATES = [...tipoResiduoRoute, ...tipoResiduoPopupRoute];

@NgModule({
    imports: [ColetaseletivaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoResiduoComponent,
        TipoResiduoDetailComponent,
        TipoResiduoUpdateComponent,
        TipoResiduoDeleteDialogComponent,
        TipoResiduoDeletePopupComponent
    ],
    entryComponents: [TipoResiduoComponent, TipoResiduoUpdateComponent, TipoResiduoDeleteDialogComponent, TipoResiduoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ColetaseletivaTipoResiduoModule {}
