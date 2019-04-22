import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRedeSocial } from 'app/shared/model/rede-social.model';

type EntityResponseType = HttpResponse<IRedeSocial>;
type EntityArrayResponseType = HttpResponse<IRedeSocial[]>;

@Injectable({ providedIn: 'root' })
export class RedeSocialService {
    public resourceUrl = SERVER_API_URL + 'api/rede-socials';

    constructor(protected http: HttpClient) {}

    create(redeSocial: IRedeSocial): Observable<EntityResponseType> {
        return this.http.post<IRedeSocial>(this.resourceUrl, redeSocial, { observe: 'response' });
    }

    update(redeSocial: IRedeSocial): Observable<EntityResponseType> {
        return this.http.put<IRedeSocial>(this.resourceUrl, redeSocial, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRedeSocial>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRedeSocial[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
