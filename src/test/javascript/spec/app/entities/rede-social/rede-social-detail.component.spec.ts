/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ColetaseletivaTestModule } from '../../../test.module';
import { RedeSocialDetailComponent } from 'app/entities/rede-social/rede-social-detail.component';
import { RedeSocial } from 'app/shared/model/rede-social.model';

describe('Component Tests', () => {
    describe('RedeSocial Management Detail Component', () => {
        let comp: RedeSocialDetailComponent;
        let fixture: ComponentFixture<RedeSocialDetailComponent>;
        const route = ({ data: of({ redeSocial: new RedeSocial(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [RedeSocialDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RedeSocialDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RedeSocialDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.redeSocial).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
