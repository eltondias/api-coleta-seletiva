/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ColetaseletivaTestModule } from '../../../test.module';
import { ColetorUpdateComponent } from 'app/entities/coletor/coletor-update.component';
import { ColetorService } from 'app/entities/coletor/coletor.service';
import { Coletor } from 'app/shared/model/coletor.model';

describe('Component Tests', () => {
    describe('Coletor Management Update Component', () => {
        let comp: ColetorUpdateComponent;
        let fixture: ComponentFixture<ColetorUpdateComponent>;
        let service: ColetorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [ColetorUpdateComponent]
            })
                .overrideTemplate(ColetorUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ColetorUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColetorService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Coletor(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.coletor = entity;
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
                    const entity = new Coletor();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.coletor = entity;
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
