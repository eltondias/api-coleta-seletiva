import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRetirada } from 'app/shared/model/retirada.model';

type EntityResponseType = HttpResponse<IRetirada>;
type EntityArrayResponseType = HttpResponse<IRetirada[]>;

@Injectable({ providedIn: 'root' })
export class RetiradaService {
    public resourceUrl = SERVER_API_URL + 'api/retiradas';

    constructor(protected http: HttpClient) {}

    create(retirada: IRetirada): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(retirada);
        return this.http
            .post<IRetirada>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(retirada: IRetirada): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(retirada);
        return this.http
            .put<IRetirada>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRetirada>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRetirada[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(retirada: IRetirada): IRetirada {
        const copy: IRetirada = Object.assign({}, retirada, {
            dataHoraAgendada:
                retirada.dataHoraAgendada != null && retirada.dataHoraAgendada.isValid() ? retirada.dataHoraAgendada.toJSON() : null,
            dataHoraRealizada:
                retirada.dataHoraRealizada != null && retirada.dataHoraRealizada.isValid() ? retirada.dataHoraRealizada.toJSON() : null,
            dataHoraConfirmacao:
                retirada.dataHoraConfirmacao != null && retirada.dataHoraConfirmacao.isValid()
                    ? retirada.dataHoraConfirmacao.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dataHoraAgendada = res.body.dataHoraAgendada != null ? moment(res.body.dataHoraAgendada) : null;
            res.body.dataHoraRealizada = res.body.dataHoraRealizada != null ? moment(res.body.dataHoraRealizada) : null;
            res.body.dataHoraConfirmacao = res.body.dataHoraConfirmacao != null ? moment(res.body.dataHoraConfirmacao) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((retirada: IRetirada) => {
                retirada.dataHoraAgendada = retirada.dataHoraAgendada != null ? moment(retirada.dataHoraAgendada) : null;
                retirada.dataHoraRealizada = retirada.dataHoraRealizada != null ? moment(retirada.dataHoraRealizada) : null;
                retirada.dataHoraConfirmacao = retirada.dataHoraConfirmacao != null ? moment(retirada.dataHoraConfirmacao) : null;
            });
        }
        return res;
    }
}
