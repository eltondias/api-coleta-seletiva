import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHorarioPreferencialRetirada } from 'app/shared/model/horario-preferencial-retirada.model';

type EntityResponseType = HttpResponse<IHorarioPreferencialRetirada>;
type EntityArrayResponseType = HttpResponse<IHorarioPreferencialRetirada[]>;

@Injectable({ providedIn: 'root' })
export class HorarioPreferencialRetiradaService {
    public resourceUrl = SERVER_API_URL + 'api/horario-preferencial-retiradas';

    constructor(protected http: HttpClient) {}

    create(horarioPreferencialRetirada: IHorarioPreferencialRetirada): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(horarioPreferencialRetirada);
        return this.http
            .post<IHorarioPreferencialRetirada>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(horarioPreferencialRetirada: IHorarioPreferencialRetirada): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(horarioPreferencialRetirada);
        return this.http
            .put<IHorarioPreferencialRetirada>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IHorarioPreferencialRetirada>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHorarioPreferencialRetirada[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(horarioPreferencialRetirada: IHorarioPreferencialRetirada): IHorarioPreferencialRetirada {
        const copy: IHorarioPreferencialRetirada = Object.assign({}, horarioPreferencialRetirada, {
            dataHora:
                horarioPreferencialRetirada.dataHora != null && horarioPreferencialRetirada.dataHora.isValid()
                    ? horarioPreferencialRetirada.dataHora.toJSON()
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
            res.body.forEach((horarioPreferencialRetirada: IHorarioPreferencialRetirada) => {
                horarioPreferencialRetirada.dataHora =
                    horarioPreferencialRetirada.dataHora != null ? moment(horarioPreferencialRetirada.dataHora) : null;
            });
        }
        return res;
    }
}
