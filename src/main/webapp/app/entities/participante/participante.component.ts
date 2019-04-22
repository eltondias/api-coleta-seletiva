import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IParticipante } from 'app/shared/model/participante.model';
import { AccountService } from 'app/core';
import { ParticipanteService } from './participante.service';

@Component({
    selector: 'jhi-participante',
    templateUrl: './participante.component.html'
})
export class ParticipanteComponent implements OnInit, OnDestroy {
    participantes: IParticipante[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected participanteService: ParticipanteService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.participanteService
            .query()
            .pipe(
                filter((res: HttpResponse<IParticipante[]>) => res.ok),
                map((res: HttpResponse<IParticipante[]>) => res.body)
            )
            .subscribe(
                (res: IParticipante[]) => {
                    this.participantes = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInParticipantes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IParticipante) {
        return item.id;
    }

    registerChangeInParticipantes() {
        this.eventSubscriber = this.eventManager.subscribe('participanteListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
