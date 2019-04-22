/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ColetaseletivaTestModule } from '../../../test.module';
import { TipoResiduoUpdateComponent } from 'app/entities/tipo-residuo/tipo-residuo-update.component';
import { TipoResiduoService } from 'app/entities/tipo-residuo/tipo-residuo.service';
import { TipoResiduo } from 'app/shared/model/tipo-residuo.model';

describe('Component Tests', () => {
    describe('TipoResiduo Management Update Component', () => {
        let comp: TipoResiduoUpdateComponent;
        let fixture: ComponentFixture<TipoResiduoUpdateComponent>;
        let service: TipoResiduoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [TipoResiduoUpdateComponent]
            })
                .overrideTemplate(TipoResiduoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoResiduoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoResiduoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TipoResiduo(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tipoResiduo = entity;
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
                    const entity = new TipoResiduo();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tipoResiduo = entity;
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
