/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ColetaseletivaTestModule } from '../../../test.module';
import { EstadoUpdateComponent } from 'app/entities/estado/estado-update.component';
import { EstadoService } from 'app/entities/estado/estado.service';
import { Estado } from 'app/shared/model/estado.model';

describe('Component Tests', () => {
    describe('Estado Management Update Component', () => {
        let comp: EstadoUpdateComponent;
        let fixture: ComponentFixture<EstadoUpdateComponent>;
        let service: EstadoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [EstadoUpdateComponent]
            })
                .overrideTemplate(EstadoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EstadoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Estado(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.estado = entity;
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
                    const entity = new Estado();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.estado = entity;
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
