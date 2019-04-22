import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ColetaseletivaSharedModule } from 'app/shared';
import {
    RetiradaComponent,
    RetiradaDetailComponent,
    RetiradaUpdateComponent,
    RetiradaDeletePopupComponent,
    RetiradaDeleteDialogComponent,
    retiradaRoute,
    retiradaPopupRoute
} from './';

const ENTITY_STATES = [...retiradaRoute, ...retiradaPopupRoute];

@NgModule({
    imports: [ColetaseletivaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RetiradaComponent,
        RetiradaDetailComponent,
        RetiradaUpdateComponent,
        RetiradaDeleteDialogComponent,
        RetiradaDeletePopupComponent
    ],
    entryComponents: [RetiradaComponent, RetiradaUpdateComponent, RetiradaDeleteDialogComponent, RetiradaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ColetaseletivaRetiradaModule {}
