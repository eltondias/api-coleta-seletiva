import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ColetaseletivaSharedModule } from 'app/shared';
import {
    EmailComponent,
    EmailDetailComponent,
    EmailUpdateComponent,
    EmailDeletePopupComponent,
    EmailDeleteDialogComponent,
    emailRoute,
    emailPopupRoute
} from './';

const ENTITY_STATES = [...emailRoute, ...emailPopupRoute];

@NgModule({
    imports: [ColetaseletivaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [EmailComponent, EmailDetailComponent, EmailUpdateComponent, EmailDeleteDialogComponent, EmailDeletePopupComponent],
    entryComponents: [EmailComponent, EmailUpdateComponent, EmailDeleteDialogComponent, EmailDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ColetaseletivaEmailModule {}
