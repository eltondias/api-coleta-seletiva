import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ColetaseletivaSharedModule } from 'app/shared';
import {
    ImagemComponent,
    ImagemDetailComponent,
    ImagemUpdateComponent,
    ImagemDeletePopupComponent,
    ImagemDeleteDialogComponent,
    imagemRoute,
    imagemPopupRoute
} from './';

const ENTITY_STATES = [...imagemRoute, ...imagemPopupRoute];

@NgModule({
    imports: [ColetaseletivaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ImagemComponent, ImagemDetailComponent, ImagemUpdateComponent, ImagemDeleteDialogComponent, ImagemDeletePopupComponent],
    entryComponents: [ImagemComponent, ImagemUpdateComponent, ImagemDeleteDialogComponent, ImagemDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ColetaseletivaImagemModule {}
