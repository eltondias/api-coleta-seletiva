import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Coletor } from 'app/shared/model/coletor.model';
import { ColetorService } from './coletor.service';
import { ColetorComponent } from './coletor.component';
import { ColetorDetailComponent } from './coletor-detail.component';
import { ColetorUpdateComponent } from './coletor-update.component';
import { ColetorDeletePopupComponent } from './coletor-delete-dialog.component';
import { IColetor } from 'app/shared/model/coletor.model';

@Injectable({ providedIn: 'root' })
export class ColetorResolve implements Resolve<IColetor> {
    constructor(private service: ColetorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IColetor> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Coletor>) => response.ok),
                map((coletor: HttpResponse<Coletor>) => coletor.body)
            );
        }
        return of(new Coletor());
    }
}

export const coletorRoute: Routes = [
    {
        path: '',
        component: ColetorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Coletors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ColetorDetailComponent,
        resolve: {
            coletor: ColetorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Coletors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ColetorUpdateComponent,
        resolve: {
            coletor: ColetorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Coletors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ColetorUpdateComponent,
        resolve: {
            coletor: ColetorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Coletors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const coletorPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ColetorDeletePopupComponent,
        resolve: {
            coletor: ColetorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Coletors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
