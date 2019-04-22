/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ColetorService } from 'app/entities/coletor/coletor.service';
import { IColetor, Coletor, TipoColetor } from 'app/shared/model/coletor.model';

describe('Service Tests', () => {
    describe('Coletor Service', () => {
        let injector: TestBed;
        let service: ColetorService;
        let httpMock: HttpTestingController;
        let elemDefault: IColetor;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ColetorService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Coletor(0, 'AAAAAAA', currentDate, TipoColetor.PESSOA);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataCadastro: currentDate.format(DATE_TIME_FORMAT)
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

            it('should create a Coletor', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dataCadastro: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataCadastro: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Coletor(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Coletor', async () => {
                const returnedFromService = Object.assign(
                    {
                        nome: 'BBBBBB',
                        dataCadastro: currentDate.format(DATE_TIME_FORMAT),
                        tipo: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dataCadastro: currentDate
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

            it('should return a list of Coletor', async () => {
                const returnedFromService = Object.assign(
                    {
                        nome: 'BBBBBB',
                        dataCadastro: currentDate.format(DATE_TIME_FORMAT),
                        tipo: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataCadastro: currentDate
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

            it('should delete a Coletor', async () => {
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
