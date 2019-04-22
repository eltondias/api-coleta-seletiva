import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoResiduo } from 'app/shared/model/tipo-residuo.model';

type EntityResponseType = HttpResponse<ITipoResiduo>;
type EntityArrayResponseType = HttpResponse<ITipoResiduo[]>;

@Injectable({ providedIn: 'root' })
export class TipoResiduoService {
    public resourceUrl = SERVER_API_URL + 'api/tipo-residuos';

    constructor(protected http: HttpClient) {}

    create(tipoResiduo: ITipoResiduo): Observable<EntityResponseType> {
        return this.http.post<ITipoResiduo>(this.resourceUrl, tipoResiduo, { observe: 'response' });
    }

    update(tipoResiduo: ITipoResiduo): Observable<EntityResponseType> {
        return this.http.put<ITipoResiduo>(this.resourceUrl, tipoResiduo, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITipoResiduo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITipoResiduo[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
