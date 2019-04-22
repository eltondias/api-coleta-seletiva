import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoResiduo } from 'app/shared/model/tipo-residuo.model';
import { TipoResiduoService } from './tipo-residuo.service';
import { TipoResiduoComponent } from './tipo-residuo.component';
import { TipoResiduoDetailComponent } from './tipo-residuo-detail.component';
import { TipoResiduoUpdateComponent } from './tipo-residuo-update.component';
import { TipoResiduoDeletePopupComponent } from './tipo-residuo-delete-dialog.component';
import { ITipoResiduo } from 'app/shared/model/tipo-residuo.model';

@Injectable({ providedIn: 'root' })
export class TipoResiduoResolve implements Resolve<ITipoResiduo> {
    constructor(private service: TipoResiduoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoResiduo> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TipoResiduo>) => response.ok),
                map((tipoResiduo: HttpResponse<TipoResiduo>) => tipoResiduo.body)
            );
        }
        return of(new TipoResiduo());
    }
}

export const tipoResiduoRoute: Routes = [
    {
        path: '',
        component: TipoResiduoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoResiduos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TipoResiduoDetailComponent,
        resolve: {
            tipoResiduo: TipoResiduoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoResiduos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TipoResiduoUpdateComponent,
        resolve: {
            tipoResiduo: TipoResiduoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoResiduos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TipoResiduoUpdateComponent,
        resolve: {
            tipoResiduo: TipoResiduoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoResiduos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoResiduoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TipoResiduoDeletePopupComponent,
        resolve: {
            tipoResiduo: TipoResiduoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoResiduos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
