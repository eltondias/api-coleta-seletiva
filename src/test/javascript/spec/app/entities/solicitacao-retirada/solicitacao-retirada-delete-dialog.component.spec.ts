/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ColetaseletivaTestModule } from '../../../test.module';
import { SolicitacaoRetiradaDeleteDialogComponent } from 'app/entities/solicitacao-retirada/solicitacao-retirada-delete-dialog.component';
import { SolicitacaoRetiradaService } from 'app/entities/solicitacao-retirada/solicitacao-retirada.service';

describe('Component Tests', () => {
    describe('SolicitacaoRetirada Management Delete Component', () => {
        let comp: SolicitacaoRetiradaDeleteDialogComponent;
        let fixture: ComponentFixture<SolicitacaoRetiradaDeleteDialogComponent>;
        let service: SolicitacaoRetiradaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [SolicitacaoRetiradaDeleteDialogComponent]
            })
                .overrideTemplate(SolicitacaoRetiradaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SolicitacaoRetiradaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SolicitacaoRetiradaService);
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
