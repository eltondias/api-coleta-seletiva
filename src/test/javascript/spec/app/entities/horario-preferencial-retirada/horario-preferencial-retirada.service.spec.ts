/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { HorarioPreferencialRetiradaService } from 'app/entities/horario-preferencial-retirada/horario-preferencial-retirada.service';
import { IHorarioPreferencialRetirada, HorarioPreferencialRetirada } from 'app/shared/model/horario-preferencial-retirada.model';

describe('Service Tests', () => {
    describe('HorarioPreferencialRetirada Service', () => {
        let injector: TestBed;
        let service: HorarioPreferencialRetiradaService;
        let httpMock: HttpTestingController;
        let elemDefault: IHorarioPreferencialRetirada;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(HorarioPreferencialRetiradaService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new HorarioPreferencialRetirada(0, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataHora: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a HorarioPreferencialRetirada', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dataHora: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataHora: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new HorarioPreferencialRetirada(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a HorarioPreferencialRetirada', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataHora: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dataHora: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of HorarioPreferencialRetirada', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataHora: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataHora: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a HorarioPreferencialRetirada', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
