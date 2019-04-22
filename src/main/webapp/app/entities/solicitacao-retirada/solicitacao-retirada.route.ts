import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SolicitacaoRetirada } from 'app/shared/model/solicitacao-retirada.model';
import { SolicitacaoRetiradaService } from './solicitacao-retirada.service';
import { SolicitacaoRetiradaComponent } from './solicitacao-retirada.component';
import { SolicitacaoRetiradaDetailComponent } from './solicitacao-retirada-detail.component';
import { SolicitacaoRetiradaUpdateComponent } from './solicitacao-retirada-update.component';
import { SolicitacaoRetiradaDeletePopupComponent } from './solicitacao-retirada-delete-dialog.component';
import { ISolicitacaoRetirada } from 'app/shared/model/solicitacao-retirada.model';

@Injectable({ providedIn: 'root' })
export class SolicitacaoRetiradaResolve implements Resolve<ISolicitacaoRetirada> {
    constructor(private service: SolicitacaoRetiradaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISolicitacaoRetirada> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SolicitacaoRetirada>) => response.ok),
                map((solicitacaoRetirada: HttpResponse<SolicitacaoRetirada>) => solicitacaoRetirada.body)
            );
        }
        return of(new SolicitacaoRetirada());
    }
}

export const solicitacaoRetiradaRoute: Routes = [
    {
        path: '',
        component: SolicitacaoRetiradaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitacaoRetiradas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SolicitacaoRetiradaDetailComponent,
        resolve: {
            solicitacaoRetirada: SolicitacaoRetiradaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitacaoRetiradas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SolicitacaoRetiradaUpdateComponent,
        resolve: {
            solicitacaoRetirada: SolicitacaoRetiradaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitacaoRetiradas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SolicitacaoRetiradaUpdateComponent,
        resolve: {
            solicitacaoRetirada: SolicitacaoRetiradaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitacaoRetiradas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const solicitacaoRetiradaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SolicitacaoRetiradaDeletePopupComponent,
        resolve: {
            solicitacaoRetirada: SolicitacaoRetiradaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitacaoRetiradas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
