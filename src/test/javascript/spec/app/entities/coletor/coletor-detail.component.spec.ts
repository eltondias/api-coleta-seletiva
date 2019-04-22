/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ColetaseletivaTestModule } from '../../../test.module';
import { ColetorDetailComponent } from 'app/entities/coletor/coletor-detail.component';
import { Coletor } from 'app/shared/model/coletor.model';

describe('Component Tests', () => {
    describe('Coletor Management Detail Component', () => {
        let comp: ColetorDetailComponent;
        let fixture: ComponentFixture<ColetorDetailComponent>;
        const route = ({ data: of({ coletor: new Coletor(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [ColetorDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ColetorDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ColetorDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.coletor).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
