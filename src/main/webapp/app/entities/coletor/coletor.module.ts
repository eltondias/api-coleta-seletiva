import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ColetaseletivaSharedModule } from 'app/shared';
import {
    ColetorComponent,
    ColetorDetailComponent,
    ColetorUpdateComponent,
    ColetorDeletePopupComponent,
    ColetorDeleteDialogComponent,
    coletorRoute,
    coletorPopupRoute
} from './';

const ENTITY_STATES = [...coletorRoute, ...coletorPopupRoute];

@NgModule({
    imports: [ColetaseletivaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ColetorComponent,
        ColetorDetailComponent,
        ColetorUpdateComponent,
        ColetorDeleteDialogComponent,
        ColetorDeletePopupComponent
    ],
    entryComponents: [ColetorComponent, ColetorUpdateComponent, ColetorDeleteDialogComponent, ColetorDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ColetaseletivaColetorModule {}
