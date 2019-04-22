/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ColetaseletivaTestModule } from '../../../test.module';
import { SolicitacaoRetiradaUpdateComponent } from 'app/entities/solicitacao-retirada/solicitacao-retirada-update.component';
import { SolicitacaoRetiradaService } from 'app/entities/solicitacao-retirada/solicitacao-retirada.service';
import { SolicitacaoRetirada } from 'app/shared/model/solicitacao-retirada.model';

describe('Component Tests', () => {
    describe('SolicitacaoRetirada Management Update Component', () => {
        let comp: SolicitacaoRetiradaUpdateComponent;
        let fixture: ComponentFixture<SolicitacaoRetiradaUpdateComponent>;
        let service: SolicitacaoRetiradaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [SolicitacaoRetiradaUpdateComponent]
            })
                .overrideTemplate(SolicitacaoRetiradaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SolicitacaoRetiradaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SolicitacaoRetiradaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SolicitacaoRetirada(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.solicitacaoRetirada = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SolicitacaoRetirada();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.solicitacaoRetirada = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
