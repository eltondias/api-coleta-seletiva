import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHorarioPreferencialRetirada } from 'app/shared/model/horario-preferencial-retirada.model';
import { AccountService } from 'app/core';
import { HorarioPreferencialRetiradaService } from './horario-preferencial-retirada.service';

@Component({
    selector: 'jhi-horario-preferencial-retirada',
    templateUrl: './horario-preferencial-retirada.component.html'
})
export class HorarioPreferencialRetiradaComponent implements OnInit, OnDestroy {
    horarioPreferencialRetiradas: IHorarioPreferencialRetirada[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected horarioPreferencialRetiradaService: HorarioPreferencialRetiradaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.horarioPreferencialRetiradaService
            .query()
            .pipe(
                filter((res: HttpResponse<IHorarioPreferencialRetirada[]>) => res.ok),
                map((res: HttpResponse<IHorarioPreferencialRetirada[]>) => res.body)
            )
            .subscribe(
                (res: IHorarioPreferencialRetirada[]) => {
                    this.horarioPreferencialRetiradas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHorarioPreferencialRetiradas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHorarioPreferencialRetirada) {
        return item.id;
    }

    registerChangeInHorarioPreferencialRetiradas() {
        this.eventSubscriber = this.eventManager.subscribe('horarioPreferencialRetiradaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
