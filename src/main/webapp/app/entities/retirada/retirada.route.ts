import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Retirada } from 'app/shared/model/retirada.model';
import { RetiradaService } from './retirada.service';
import { RetiradaComponent } from './retirada.component';
import { RetiradaDetailComponent } from './retirada-detail.component';
import { RetiradaUpdateComponent } from './retirada-update.component';
import { RetiradaDeletePopupComponent } from './retirada-delete-dialog.component';
import { IRetirada } from 'app/shared/model/retirada.model';

@Injectable({ providedIn: 'root' })
export class RetiradaResolve implements Resolve<IRetirada> {
    constructor(private service: RetiradaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRetirada> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Retirada>) => response.ok),
                map((retirada: HttpResponse<Retirada>) => retirada.body)
            );
        }
        return of(new Retirada());
    }
}

export const retiradaRoute: Routes = [
    {
        path: '',
        component: RetiradaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Retiradas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: RetiradaDetailComponent,
        resolve: {
            retirada: RetiradaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Retiradas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: RetiradaUpdateComponent,
        resolve: {
            retirada: RetiradaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Retiradas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: RetiradaUpdateComponent,
        resolve: {
            retirada: RetiradaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Retiradas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const retiradaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: RetiradaDeletePopupComponent,
        resolve: {
            retirada: RetiradaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Retiradas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
