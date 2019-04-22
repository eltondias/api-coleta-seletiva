import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstado } from 'app/shared/model/estado.model';
import { AccountService } from 'app/core';
import { EstadoService } from './estado.service';

@Component({
    selector: 'jhi-estado',
    templateUrl: './estado.component.html'
})
export class EstadoComponent implements OnInit, OnDestroy {
    estados: IEstado[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected estadoService: EstadoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.estadoService
            .query()
            .pipe(
                filter((res: HttpResponse<IEstado[]>) => res.ok),
                map((res: HttpResponse<IEstado[]>) => res.body)
            )
            .subscribe(
                (res: IEstado[]) => {
                    this.estados = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEstados();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEstado) {
        return item.id;
    }

    registerChangeInEstados() {
        this.eventSubscriber = this.eventManager.subscribe('estadoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
