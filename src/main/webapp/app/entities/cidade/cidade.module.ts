import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ColetaseletivaSharedModule } from 'app/shared';
import {
    CidadeComponent,
    CidadeDetailComponent,
    CidadeUpdateComponent,
    CidadeDeletePopupComponent,
    CidadeDeleteDialogComponent,
    cidadeRoute,
    cidadePopupRoute
} from './';

const ENTITY_STATES = [...cidadeRoute, ...cidadePopupRoute];

@NgModule({
    imports: [ColetaseletivaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [CidadeComponent, CidadeDetailComponent, CidadeUpdateComponent, CidadeDeleteDialogComponent, CidadeDeletePopupComponent],
    entryComponents: [CidadeComponent, CidadeUpdateComponent, CidadeDeleteDialogComponent, CidadeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ColetaseletivaCidadeModule {}
