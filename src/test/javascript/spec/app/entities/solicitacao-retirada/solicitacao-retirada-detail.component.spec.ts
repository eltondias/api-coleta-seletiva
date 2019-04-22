/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ColetaseletivaTestModule } from '../../../test.module';
import { SolicitacaoRetiradaDetailComponent } from 'app/entities/solicitacao-retirada/solicitacao-retirada-detail.component';
import { SolicitacaoRetirada } from 'app/shared/model/solicitacao-retirada.model';

describe('Component Tests', () => {
    describe('SolicitacaoRetirada Management Detail Component', () => {
        let comp: SolicitacaoRetiradaDetailComponent;
        let fixture: ComponentFixture<SolicitacaoRetiradaDetailComponent>;
        const route = ({ data: of({ solicitacaoRetirada: new SolicitacaoRetirada(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [SolicitacaoRetiradaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SolicitacaoRetiradaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SolicitacaoRetiradaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.solicitacaoRetirada).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
