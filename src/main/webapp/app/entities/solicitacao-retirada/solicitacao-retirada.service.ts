import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISolicitacaoRetirada } from 'app/shared/model/solicitacao-retirada.model';

type EntityResponseType = HttpResponse<ISolicitacaoRetirada>;
type EntityArrayResponseType = HttpResponse<ISolicitacaoRetirada[]>;

@Injectable({ providedIn: 'root' })
export class SolicitacaoRetiradaService {
    public resourceUrl = SERVER_API_URL + 'api/solicitacao-retiradas';

    constructor(protected http: HttpClient) {}

    create(solicitacaoRetirada: ISolicitacaoRetirada): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(solicitacaoRetirada);
        return this.http
            .post<ISolicitacaoRetirada>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(solicitacaoRetirada: ISolicitacaoRetirada): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(solicitacaoRetirada);
        return this.http
            .put<ISolicitacaoRetirada>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISolicitacaoRetirada>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISolicitacaoRetirada[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(solicitacaoRetirada: ISolicitacaoRetirada): ISolicitacaoRetirada {
        const copy: ISolicitacaoRetirada = Object.assign({}, solicitacaoRetirada, {
            dataHora:
                solicitacaoRetirada.dataHora != null && solicitacaoRetirada.dataHora.isValid()
                    ? solicitacaoRetirada.dataHora.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dataHora = res.body.dataHora != null ? moment(res.body.dataHora) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((solicitacaoRetirada: ISolicitacaoRetirada) => {
                solicitacaoRetirada.dataHora = solicitacaoRetirada.dataHora != null ? moment(solicitacaoRetirada.dataHora) : null;
            });
        }
        return res;
    }
}
