/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ColetaseletivaTestModule } from '../../../test.module';
import { TipoResiduoComponent } from 'app/entities/tipo-residuo/tipo-residuo.component';
import { TipoResiduoService } from 'app/entities/tipo-residuo/tipo-residuo.service';
import { TipoResiduo } from 'app/shared/model/tipo-residuo.model';

describe('Component Tests', () => {
    describe('TipoResiduo Management Component', () => {
        let comp: TipoResiduoComponent;
        let fixture: ComponentFixture<TipoResiduoComponent>;
        let service: TipoResiduoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColetaseletivaTestModule],
                declarations: [TipoResiduoComponent],
                providers: []
            })
                .overrideTemplate(TipoResiduoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoResiduoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoResiduoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TipoResiduo(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tipoResiduos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
