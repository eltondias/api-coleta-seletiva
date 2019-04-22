/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ColetaseletivaTestModule } from '../../../test.module';
import { ColetorComponent } from 'app/entities/coletor/coletor.component';
import { ColetorService } from 'app/entities/coletor/coletor.service';
import { Coletor } from 'app/shared/model/coletor.model';

describe('Component Tests', () => {
    describe('Coletor Management Component', () => {
        let comp: ColetorComponent;
        let fixture: ComponentFixture<ColetorComponent>;
        let service: ColetorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [ColetorComponent],
                providers: []
            })
                .overrideTemplate(ColetorComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ColetorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColetorService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Coletor(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.coletors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
