import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IImagem } from 'app/shared/model/imagem.model';
import { AccountService } from 'app/core';
import { ImagemService } from './imagem.service';

@Component({
    selector: 'jhi-imagem',
    templateUrl: './imagem.component.html'
})
export class ImagemComponent implements OnInit, OnDestroy {
    imagems: IImagem[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected imagemService: ImagemService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.imagemService
            .query()
            .pipe(
                filter((res: HttpResponse<IImagem[]>) => res.ok),
                map((res: HttpResponse<IImagem[]>) => res.body)
            )
            .subscribe(
                (res: IImagem[]) => {
                    this.imagems = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInImagems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IImagem) {
        return item.id;
    }

    registerChangeInImagems() {
        this.eventSubscriber = this.eventManager.subscribe('imagemListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
