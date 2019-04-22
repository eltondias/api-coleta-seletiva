import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISolicitacaoRetirada } from 'app/shared/model/solicitacao-retirada.model';
import { AccountService } from 'app/core';
import { SolicitacaoRetiradaService } from './solicitacao-retirada.service';

@Component({
    selector: 'jhi-solicitacao-retirada',
    templateUrl: './solicitacao-retirada.component.html'
})
export class SolicitacaoRetiradaComponent implements OnInit, OnDestroy {
    solicitacaoRetiradas: ISolicitacaoRetirada[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected solicitacaoRetiradaService: SolicitacaoRetiradaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.solicitacaoRetiradaService
            .query()
            .pipe(
                filter((res: HttpResponse<ISolicitacaoRetirada[]>) => res.ok),
                map((res: HttpResponse<ISolicitacaoRetirada[]>) => res.body)
            )
            .subscribe(
                (res: ISolicitacaoRetirada[]) => {
                    this.solicitacaoRetiradas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSolicitacaoRetiradas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISolicitacaoRetirada) {
        return item.id;
    }

    registerChangeInSolicitacaoRetiradas() {
        this.eventSubscriber = this.eventManager.subscribe('solicitacaoRetiradaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
