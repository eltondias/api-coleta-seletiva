import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RedeSocial } from 'app/shared/model/rede-social.model';
import { RedeSocialService } from './rede-social.service';
import { RedeSocialComponent } from './rede-social.component';
import { RedeSocialDetailComponent } from './rede-social-detail.component';
import { RedeSocialUpdateComponent } from './rede-social-update.component';
import { RedeSocialDeletePopupComponent } from './rede-social-delete-dialog.component';
import { IRedeSocial } from 'app/shared/model/rede-social.model';

@Injectable({ providedIn: 'root' })
export class RedeSocialResolve implements Resolve<IRedeSocial> {
    constructor(private service: RedeSocialService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRedeSocial> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RedeSocial>) => response.ok),
                map((redeSocial: HttpResponse<RedeSocial>) => redeSocial.body)
            );
        }
        return of(new RedeSocial());
    }
}

export const redeSocialRoute: Routes = [
    {
        path: '',
        component: RedeSocialComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RedeSocials'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: RedeSocialDetailComponent,
        resolve: {
            redeSocial: RedeSocialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RedeSocials'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: RedeSocialUpdateComponent,
        resolve: {
            redeSocial: RedeSocialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RedeSocials'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: RedeSocialUpdateComponent,
        resolve: {
            redeSocial: RedeSocialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RedeSocials'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const redeSocialPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: RedeSocialDeletePopupComponent,
        resolve: {
            redeSocial: RedeSocialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RedeSocials'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
