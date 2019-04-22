import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ColetaseletivaSharedModule } from 'app/shared';
import {
    RedeSocialComponent,
    RedeSocialDetailComponent,
    RedeSocialUpdateComponent,
    RedeSocialDeletePopupComponent,
    RedeSocialDeleteDialogComponent,
    redeSocialRoute,
    redeSocialPopupRoute
} from './';

const ENTITY_STATES = [...redeSocialRoute, ...redeSocialPopupRoute];

@NgModule({
    imports: [ColetaseletivaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RedeSocialComponent,
        RedeSocialDetailComponent,
        RedeSocialUpdateComponent,
        RedeSocialDeleteDialogComponent,
        RedeSocialDeletePopupComponent
    ],
    entryComponents: [RedeSocialComponent, RedeSocialUpdateComponent, RedeSocialDeleteDialogComponent, RedeSocialDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ColetaseletivaRedeSocialModule {}
