/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ColetaseletivaTestModule } from '../../../test.module';
import { RetiradaComponent } from 'app/entities/retirada/retirada.component';
import { RetiradaService } from 'app/entities/retirada/retirada.service';
import { Retirada } from 'app/shared/model/retirada.model';

describe('Component Tests', () => {
    describe('Retirada Management Component', () => {
        let comp: RetiradaComponent;
        let fixture: ComponentFixture<RetiradaComponent>;
        let service: RetiradaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [RetiradaComponent],
                providers: []
            })
                .overrideTemplate(RetiradaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RetiradaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RetiradaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Retirada(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.retiradas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
