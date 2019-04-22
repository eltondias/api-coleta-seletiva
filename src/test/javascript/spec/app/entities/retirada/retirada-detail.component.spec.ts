/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ColetaseletivaTestModule } from '../../../test.module';
import { RetiradaDetailComponent } from 'app/entities/retirada/retirada-detail.component';
import { Retirada } from 'app/shared/model/retirada.model';

describe('Component Tests', () => {
    describe('Retirada Management Detail Component', () => {
        let comp: RetiradaDetailComponent;
        let fixture: ComponentFixture<RetiradaDetailComponent>;
        const route = ({ data: of({ retirada: new Retirada(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [RetiradaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RetiradaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RetiradaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.retirada).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
