/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ColetaseletivaTestModule } from '../../../test.module';
import { HorarioPreferencialRetiradaDetailComponent } from 'app/entities/horario-preferencial-retirada/horario-preferencial-retirada-detail.component';
import { HorarioPreferencialRetirada } from 'app/shared/model/horario-preferencial-retirada.model';

describe('Component Tests', () => {
    describe('HorarioPreferencialRetirada Management Detail Component', () => {
        let comp: HorarioPreferencialRetiradaDetailComponent;
        let fixture: ComponentFixture<HorarioPreferencialRetiradaDetailComponent>;
        const route = ({ data: of({ horarioPreferencialRetirada: new HorarioPreferencialRetirada(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [HorarioPreferencialRetiradaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HorarioPreferencialRetiradaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HorarioPreferencialRetiradaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.horarioPreferencialRetirada).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
