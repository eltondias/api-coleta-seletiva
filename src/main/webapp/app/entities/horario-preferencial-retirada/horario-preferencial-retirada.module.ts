import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ColetaseletivaSharedModule } from 'app/shared';
import {
    HorarioPreferencialRetiradaComponent,
    HorarioPreferencialRetiradaDetailComponent,
    HorarioPreferencialRetiradaUpdateComponent,
    HorarioPreferencialRetiradaDeletePopupComponent,
    HorarioPreferencialRetiradaDeleteDialogComponent,
    horarioPreferencialRetiradaRoute,
    horarioPreferencialRetiradaPopupRoute
} from './';

const ENTITY_STATES = [...horarioPreferencialRetiradaRoute, ...horarioPreferencialRetiradaPopupRoute];

@NgModule({
    imports: [ColetaseletivaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HorarioPreferencialRetiradaComponent,
        HorarioPreferencialRetiradaDetailComponent,
        HorarioPreferencialRetiradaUpdateComponent,
        HorarioPreferencialRetiradaDeleteDialogComponent,
        HorarioPreferencialRetiradaDeletePopupComponent
    ],
    entryComponents: [
        HorarioPreferencialRetiradaComponent,
        HorarioPreferencialRetiradaUpdateComponent,
        HorarioPreferencialRetiradaDeleteDialogComponent,
        HorarioPreferencialRetiradaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ColetaseletivaHorarioPreferencialRetiradaModule {}
