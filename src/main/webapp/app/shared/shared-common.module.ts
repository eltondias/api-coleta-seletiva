import { NgModule } from '@angular/core';

import { ColetaseletivaSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [ColetaseletivaSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [ColetaseletivaSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ColetaseletivaSharedCommonModule {}
