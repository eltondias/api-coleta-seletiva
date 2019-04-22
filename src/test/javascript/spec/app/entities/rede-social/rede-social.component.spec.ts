/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ColetaseletivaTestModule } from '../../../test.module';
import { RedeSocialComponent } from 'app/entities/rede-social/rede-social.component';
import { RedeSocialService } from 'app/entities/rede-social/rede-social.service';
import { RedeSocial } from 'app/shared/model/rede-social.model';

describe('Component Tests', () => {
    describe('RedeSocial Management Component', () => {
        let comp: RedeSocialComponent;
        let fixture: ComponentFixture<RedeSocialComponent>;
        let service: RedeSocialService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [RedeSocialComponent],
                providers: []
            })
                .overrideTemplate(RedeSocialComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RedeSocialComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RedeSocialService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new RedeSocial(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.redeSocials[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
