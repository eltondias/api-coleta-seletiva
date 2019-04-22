import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IColetor } from 'app/shared/model/coletor.model';
import { AccountService } from 'app/core';
import { ColetorService } from './coletor.service';

@Component({
    selector: 'jhi-coletor',
    templateUrl: './coletor.component.html'
})
export class ColetorComponent implements OnInit, OnDestroy {
    coletors: IColetor[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected coletorService: ColetorService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.coletorService
            .query()
            .pipe(
                filter((res: HttpResponse<IColetor[]>) => res.ok),
                map((res: HttpResponse<IColetor[]>) => res.body)
            )
            .subscribe(
                (res: IColetor[]) => {
                    this.coletors = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInColetors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IColetor) {
        return item.id;
    }

    registerChangeInColetors() {
        this.eventSubscriber = this.eventManager.subscribe('coletorListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
