/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ColetaseletivaTestModule } from '../../../test.module';
import { EstadoDetailComponent } from 'app/entities/estado/estado-detail.component';
import { Estado } from 'app/shared/model/estado.model';

describe('Component Tests', () => {
    describe('Estado Management Detail Component', () => {
        let comp: EstadoDetailComponent;
        let fixture: ComponentFixture<EstadoDetailComponent>;
        const route = ({ data: of({ estado: new Estado(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [EstadoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EstadoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EstadoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.estado).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
