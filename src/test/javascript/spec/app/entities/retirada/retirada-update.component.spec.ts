/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ColetaseletivaTestModule } from '../../../test.module';
import { RetiradaUpdateComponent } from 'app/entities/retirada/retirada-update.component';
import { RetiradaService } from 'app/entities/retirada/retirada.service';
import { Retirada } from 'app/shared/model/retirada.model';

describe('Component Tests', () => {
    describe('Retirada Management Update Component', () => {
        let comp: RetiradaUpdateComponent;
        let fixture: ComponentFixture<RetiradaUpdateComponent>;
        let service: RetiradaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [RetiradaUpdateComponent]
            })
                .overrideTemplate(RetiradaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RetiradaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RetiradaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Retirada(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.retirada = entity;
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
                    const entity = new Retirada();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.retirada = entity;
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
