import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICidade } from 'app/shared/model/cidade.model';
import { AccountService } from 'app/core';
import { CidadeService } from './cidade.service';

@Component({
    selector: 'jhi-cidade',
    templateUrl: './cidade.component.html'
})
export class CidadeComponent implements OnInit, OnDestroy {
    cidades: ICidade[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected cidadeService: CidadeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.cidadeService
            .query()
            .pipe(
                filter((res: HttpResponse<ICidade[]>) => res.ok),
                map((res: HttpResponse<ICidade[]>) => res.body)
            )
            .subscribe(
                (res: ICidade[]) => {
                    this.cidades = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCidades();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICidade) {
        return item.id;
    }

    registerChangeInCidades() {
        this.eventSubscriber = this.eventManager.subscribe('cidadeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
