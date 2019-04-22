/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ColetaseletivaTestModule } from '../../../test.module';
import { HorarioPreferencialRetiradaDeleteDialogComponent } from 'app/entities/horario-preferencial-retirada/horario-preferencial-retirada-delete-dialog.component';
import { HorarioPreferencialRetiradaService } from 'app/entities/horario-preferencial-retirada/horario-preferencial-retirada.service';

describe('Component Tests', () => {
    describe('HorarioPreferencialRetirada Management Delete Component', () => {
        let comp: HorarioPreferencialRetiradaDeleteDialogComponent;
        let fixture: ComponentFixture<HorarioPreferencialRetiradaDeleteDialogComponent>;
        let service: HorarioPreferencialRetiradaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [HorarioPreferencialRetiradaDeleteDialogComponent]
            })
                .overrideTemplate(HorarioPreferencialRetiradaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HorarioPreferencialRetiradaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HorarioPreferencialRetiradaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
