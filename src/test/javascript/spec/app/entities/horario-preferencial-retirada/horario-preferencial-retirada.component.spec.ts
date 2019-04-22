/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ColetaseletivaTestModule } from '../../../test.module';
import { HorarioPreferencialRetiradaComponent } from 'app/entities/horario-preferencial-retirada/horario-preferencial-retirada.component';
import { HorarioPreferencialRetiradaService } from 'app/entities/horario-preferencial-retirada/horario-preferencial-retirada.service';
import { HorarioPreferencialRetirada } from 'app/shared/model/horario-preferencial-retirada.model';

describe('Component Tests', () => {
    describe('HorarioPreferencialRetirada Management Component', () => {
        let comp: HorarioPreferencialRetiradaComponent;
        let fixture: ComponentFixture<HorarioPreferencialRetiradaComponent>;
        let service: HorarioPreferencialRetiradaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [HorarioPreferencialRetiradaComponent],
                providers: []
            })
                .overrideTemplate(HorarioPreferencialRetiradaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HorarioPreferencialRetiradaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HorarioPreferencialRetiradaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HorarioPreferencialRetirada(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.horarioPreferencialRetiradas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
