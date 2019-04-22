import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoResiduo } from 'app/shared/model/tipo-residuo.model';
import { AccountService } from 'app/core';
import { TipoResiduoService } from './tipo-residuo.service';

@Component({
    selector: 'jhi-tipo-residuo',
    templateUrl: './tipo-residuo.component.html'
})
export class TipoResiduoComponent implements OnInit, OnDestroy {
    tipoResiduos: ITipoResiduo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected tipoResiduoService: TipoResiduoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.tipoResiduoService
            .query()
            .pipe(
                filter((res: HttpResponse<ITipoResiduo[]>) => res.ok),
                map((res: HttpResponse<ITipoResiduo[]>) => res.body)
            )
            .subscribe(
                (res: ITipoResiduo[]) => {
                    this.tipoResiduos = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTipoResiduos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITipoResiduo) {
        return item.id;
    }

    registerChangeInTipoResiduos() {
        this.eventSubscriber = this.eventManager.subscribe('tipoResiduoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
