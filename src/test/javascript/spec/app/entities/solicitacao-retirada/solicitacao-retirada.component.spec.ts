/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ColetaseletivaTestModule } from '../../../test.module';
import { SolicitacaoRetiradaComponent } from 'app/entities/solicitacao-retirada/solicitacao-retirada.component';
import { SolicitacaoRetiradaService } from 'app/entities/solicitacao-retirada/solicitacao-retirada.service';
import { SolicitacaoRetirada } from 'app/shared/model/solicitacao-retirada.model';

describe('Component Tests', () => {
    describe('SolicitacaoRetirada Management Component', () => {
        let comp: SolicitacaoRetiradaComponent;
        let fixture: ComponentFixture<SolicitacaoRetiradaComponent>;
        let service: SolicitacaoRetiradaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [SolicitacaoRetiradaComponent],
                providers: []
            })
                .overrideTemplate(SolicitacaoRetiradaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SolicitacaoRetiradaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SolicitacaoRetiradaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SolicitacaoRetirada(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.solicitacaoRetiradas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
