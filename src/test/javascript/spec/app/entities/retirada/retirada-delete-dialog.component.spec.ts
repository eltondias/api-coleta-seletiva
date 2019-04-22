/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ColetaseletivaTestModule } from '../../../test.module';
import { RetiradaDeleteDialogComponent } from 'app/entities/retirada/retirada-delete-dialog.component';
import { RetiradaService } from 'app/entities/retirada/retirada.service';

describe('Component Tests', () => {
    describe('Retirada Management Delete Component', () => {
        let comp: RetiradaDeleteDialogComponent;
        let fixture: ComponentFixture<RetiradaDeleteDialogComponent>;
        let service: RetiradaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [RetiradaDeleteDialogComponent]
            })
                .overrideTemplate(RetiradaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RetiradaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RetiradaService);
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
