/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ColetaseletivaTestModule } from '../../../test.module';
import { TipoResiduoDetailComponent } from 'app/entities/tipo-residuo/tipo-residuo-detail.component';
import { TipoResiduo } from 'app/shared/model/tipo-residuo.model';

describe('Component Tests', () => {
    describe('TipoResiduo Management Detail Component', () => {
        let comp: TipoResiduoDetailComponent;
        let fixture: ComponentFixture<TipoResiduoDetailComponent>;
        const route = ({ data: of({ tipoResiduo: new TipoResiduo(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [TipoResiduoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TipoResiduoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TipoResiduoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tipoResiduo).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
