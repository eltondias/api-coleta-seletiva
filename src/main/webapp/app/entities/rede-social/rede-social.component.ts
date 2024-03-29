import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRedeSocial } from 'app/shared/model/rede-social.model';
import { AccountService } from 'app/core';
import { RedeSocialService } from './rede-social.service';

@Component({
    selector: 'jhi-rede-social',
    templateUrl: './rede-social.component.html'
})
export class RedeSocialComponent implements OnInit, OnDestroy {
    redeSocials: IRedeSocial[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected redeSocialService: RedeSocialService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.redeSocialService
            .query()
            .pipe(
                filter((res: HttpResponse<IRedeSocial[]>) => res.ok),
                map((res: HttpResponse<IRedeSocial[]>) => res.body)
            )
            .subscribe(
                (res: IRedeSocial[]) => {
                    this.redeSocials = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRedeSocials();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRedeSocial) {
        return item.id;
    }

    registerChangeInRedeSocials() {
        this.eventSubscriber = this.eventManager.subscribe('redeSocialListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
