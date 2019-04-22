/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { RetiradaService } from 'app/entities/retirada/retirada.service';
import { IRetirada, Retirada } from 'app/shared/model/retirada.model';

describe('Service Tests', () => {
    describe('Retirada Service', () => {
        let injector: TestBed;
        let service: RetiradaService;
        let httpMock: HttpTestingController;
        let elemDefault: IRetirada;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(RetiradaService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Retirada(0, currentDate, currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataHoraAgendada: currentDate.format(DATE_TIME_FORMAT),
                        dataHoraRealizada: currentDate.format(DATE_TIME_FORMAT),
                        dataHoraConfirmacao: currentDate.format(DATE_TIME_FORMAT)
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

            it('should create a Retirada', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dataHoraAgendada: currentDate.format(DATE_TIME_FORMAT),
                        dataHoraRealizada: currentDate.format(DATE_TIME_FORMAT),
                        dataHoraConfirmacao: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataHoraAgendada: currentDate,
                        dataHoraRealizada: currentDate,
                        dataHoraConfirmacao: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Retirada(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Retirada', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataHoraAgendada: currentDate.format(DATE_TIME_FORMAT),
                        dataHoraRealizada: currentDate.format(DATE_TIME_FORMAT),
                        dataHoraConfirmacao: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dataHoraAgendada: currentDate,
                        dataHoraRealizada: currentDate,
                        dataHoraConfirmacao: currentDate
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

            it('should return a list of Retirada', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataHoraAgendada: currentDate.format(DATE_TIME_FORMAT),
                        dataHoraRealizada: currentDate.format(DATE_TIME_FORMAT),
                        dataHoraConfirmacao: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataHoraAgendada: currentDate,
                        dataHoraRealizada: currentDate,
                        dataHoraConfirmacao: currentDate
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

            it('should delete a Retirada', async () => {
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
