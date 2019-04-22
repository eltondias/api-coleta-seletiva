/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ColetaseletivaTestModule } from '../../../test.module';
import { RedeSocialUpdateComponent } from 'app/entities/rede-social/rede-social-update.component';
import { RedeSocialService } from 'app/entities/rede-social/rede-social.service';
import { RedeSocial } from 'app/shared/model/rede-social.model';

describe('Component Tests', () => {
    describe('RedeSocial Management Update Component', () => {
        let comp: RedeSocialUpdateComponent;
        let fixture: ComponentFixture<RedeSocialUpdateComponent>;
        let service: RedeSocialService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [RedeSocialUpdateComponent]
            })
                .overrideTemplate(RedeSocialUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RedeSocialUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RedeSocialService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RedeSocial(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.redeSocial = entity;
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
                    const entity = new RedeSocial();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.redeSocial = entity;
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
