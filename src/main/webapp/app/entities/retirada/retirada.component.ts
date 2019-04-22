import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRetirada } from 'app/shared/model/retirada.model';
import { AccountService } from 'app/core';
import { RetiradaService } from './retirada.service';

@Component({
    selector: 'jhi-retirada',
    templateUrl: './retirada.component.html'
})
export class RetiradaComponent implements OnInit, OnDestroy {
    retiradas: IRetirada[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected retiradaService: RetiradaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.retiradaService
            .query()
            .pipe(
                filter((res: HttpResponse<IRetirada[]>) => res.ok),
                map((res: HttpResponse<IRetirada[]>) => res.body)
            )
            .subscribe(
                (res: IRetirada[]) => {
                    this.retiradas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRetiradas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRetirada) {
        return item.id;
    }

    registerChangeInRetiradas() {
        this.eventSubscriber = this.eventManager.subscribe('retiradaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
