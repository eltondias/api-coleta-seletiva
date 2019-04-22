import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Estado } from 'app/shared/model/estado.model';
import { EstadoService } from './estado.service';
import { EstadoComponent } from './estado.component';
import { EstadoDetailComponent } from './estado-detail.component';
import { EstadoUpdateComponent } from './estado-update.component';
import { EstadoDeletePopupComponent } from './estado-delete-dialog.component';
import { IEstado } from 'app/shared/model/estado.model';

@Injectable({ providedIn: 'root' })
export class EstadoResolve implements Resolve<IEstado> {
    constructor(private service: EstadoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEstado> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Estado>) => response.ok),
                map((estado: HttpResponse<Estado>) => estado.body)
            );
        }
        return of(new Estado());
    }
}

export const estadoRoute: Routes = [
    {
        path: '',
        component: EstadoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Estados'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: EstadoDetailComponent,
        resolve: {
            estado: EstadoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Estados'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: EstadoUpdateComponent,
        resolve: {
            estado: EstadoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Estados'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: EstadoUpdateComponent,
        resolve: {
            estado: EstadoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Estados'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: EstadoDeletePopupComponent,
        resolve: {
            estado: EstadoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Estados'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
