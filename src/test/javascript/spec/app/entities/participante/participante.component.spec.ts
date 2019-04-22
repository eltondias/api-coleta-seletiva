/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ColetaseletivaTestModule } from '../../../test.module';
import { ParticipanteComponent } from 'app/entities/participante/participante.component';
import { ParticipanteService } from 'app/entities/participante/participante.service';
import { Participante } from 'app/shared/model/participante.model';

describe('Component Tests', () => {
    describe('Participante Management Component', () => {
        let comp: ParticipanteComponent;
        let fixture: ComponentFixture<ParticipanteComponent>;
        let service: ParticipanteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [ParticipanteComponent],
                providers: []
            })
                .overrideTemplate(ParticipanteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParticipanteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParticipanteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Participante(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.participantes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
