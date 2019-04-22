import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HorarioPreferencialRetirada } from 'app/shared/model/horario-preferencial-retirada.model';
import { HorarioPreferencialRetiradaService } from './horario-preferencial-retirada.service';
import { HorarioPreferencialRetiradaComponent } from './horario-preferencial-retirada.component';
import { HorarioPreferencialRetiradaDetailComponent } from './horario-preferencial-retirada-detail.component';
import { HorarioPreferencialRetiradaUpdateComponent } from './horario-preferencial-retirada-update.component';
import { HorarioPreferencialRetiradaDeletePopupComponent } from './horario-preferencial-retirada-delete-dialog.component';
import { IHorarioPreferencialRetirada } from 'app/shared/model/horario-preferencial-retirada.model';

@Injectable({ providedIn: 'root' })
export class HorarioPreferencialRetiradaResolve implements Resolve<IHorarioPreferencialRetirada> {
    constructor(private service: HorarioPreferencialRetiradaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHorarioPreferencialRetirada> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HorarioPreferencialRetirada>) => response.ok),
                map((horarioPreferencialRetirada: HttpResponse<HorarioPreferencialRetirada>) => horarioPreferencialRetirada.body)
            );
        }
        return of(new HorarioPreferencialRetirada());
    }
}

export const horarioPreferencialRetiradaRoute: Routes = [
    {
        path: '',
        component: HorarioPreferencialRetiradaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HorarioPreferencialRetiradas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: HorarioPreferencialRetiradaDetailComponent,
        resolve: {
            horarioPreferencialRetirada: HorarioPreferencialRetiradaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HorarioPreferencialRetiradas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: HorarioPreferencialRetiradaUpdateComponent,
        resolve: {
            horarioPreferencialRetirada: HorarioPreferencialRetiradaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HorarioPreferencialRetiradas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: HorarioPreferencialRetiradaUpdateComponent,
        resolve: {
            horarioPreferencialRetirada: HorarioPreferencialRetiradaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HorarioPreferencialRetiradas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const horarioPreferencialRetiradaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: HorarioPreferencialRetiradaDeletePopupComponent,
        resolve: {
            horarioPreferencialRetirada: HorarioPreferencialRetiradaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HorarioPreferencialRetiradas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
