/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ColetaseletivaTestModule } from '../../../test.module';
import { ColetorDeleteDialogComponent } from 'app/entities/coletor/coletor-delete-dialog.component';
import { ColetorService } from 'app/entities/coletor/coletor.service';

describe('Component Tests', () => {
    describe('Coletor Management Delete Component', () => {
        let comp: ColetorDeleteDialogComponent;
        let fixture: ComponentFixture<ColetorDeleteDialogComponent>;
        let service: ColetorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [ColetorDeleteDialogComponent]
            })
                .overrideTemplate(ColetorDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ColetorDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColetorService);
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
