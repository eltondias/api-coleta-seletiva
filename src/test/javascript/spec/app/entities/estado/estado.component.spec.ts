/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ColetaseletivaTestModule } from '../../../test.module';
import { EstadoComponent } from 'app/entities/estado/estado.component';
import { EstadoService } from 'app/entities/estado/estado.service';
import { Estado } from 'app/shared/model/estado.model';

describe('Component Tests', () => {
    describe('Estado Management Component', () => {
        let comp: EstadoComponent;
        let fixture: ComponentFixture<EstadoComponent>;
        let service: EstadoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [EstadoComponent],
                providers: []
            })
                .overrideTemplate(EstadoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EstadoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Estado(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.estados[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
