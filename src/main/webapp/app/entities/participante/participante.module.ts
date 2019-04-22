import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ColetaseletivaSharedModule } from 'app/shared';
import {
    ParticipanteComponent,
    ParticipanteDetailComponent,
    ParticipanteUpdateComponent,
    ParticipanteDeletePopupComponent,
    ParticipanteDeleteDialogComponent,
    participanteRoute,
    participantePopupRoute
} from './';

const ENTITY_STATES = [...participanteRoute, ...participantePopupRoute];

@NgModule({
    imports: [ColetaseletivaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ParticipanteComponent,
        ParticipanteDetailComponent,
        ParticipanteUpdateComponent,
        ParticipanteDeleteDialogComponent,
        ParticipanteDeletePopupComponent
    ],
    entryComponents: [
        ParticipanteComponent,
        ParticipanteUpdateComponent,
        ParticipanteDeleteDialogComponent,
        ParticipanteDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ColetaseletivaParticipanteModule {}
