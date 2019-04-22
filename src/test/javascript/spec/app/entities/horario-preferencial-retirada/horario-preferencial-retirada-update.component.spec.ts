/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ColetaseletivaTestModule } from '../../../test.module';
import { HorarioPreferencialRetiradaUpdateComponent } from 'app/entities/horario-preferencial-retirada/horario-preferencial-retirada-update.component';
import { HorarioPreferencialRetiradaService } from 'app/entities/horario-preferencial-retirada/horario-preferencial-retirada.service';
import { HorarioPreferencialRetirada } from 'app/shared/model/horario-preferencial-retirada.model';

describe('Component Tests', () => {
    describe('HorarioPreferencialRetirada Management Update Component', () => {
        let comp: HorarioPreferencialRetiradaUpdateComponent;
        let fixture: ComponentFixture<HorarioPreferencialRetiradaUpdateComponent>;
        let service: HorarioPreferencialRetiradaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [HorarioPreferencialRetiradaUpdateComponent]
            })
                .overrideTemplate(HorarioPreferencialRetiradaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HorarioPreferencialRetiradaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HorarioPreferencialRetiradaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HorarioPreferencialRetirada(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.horarioPreferencialRetirada = entity;
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
                    const entity = new HorarioPreferencialRetirada();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.horarioPreferencialRetirada = entity;
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
