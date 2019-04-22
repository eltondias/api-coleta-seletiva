/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ColetaseletivaTestModule } from '../../../test.module';
import { RedeSocialDeleteDialogComponent } from 'app/entities/rede-social/rede-social-delete-dialog.component';
import { RedeSocialService } from 'app/entities/rede-social/rede-social.service';

describe('Component Tests', () => {
    describe('RedeSocial Management Delete Component', () => {
        let comp: RedeSocialDeleteDialogComponent;
        let fixture: ComponentFixture<RedeSocialDeleteDialogComponent>;
        let service: RedeSocialService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [RedeSocialDeleteDialogComponent]
            })
                .overrideTemplate(RedeSocialDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RedeSocialDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RedeSocialService);
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
