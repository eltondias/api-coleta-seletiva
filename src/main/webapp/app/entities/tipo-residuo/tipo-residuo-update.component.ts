import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITipoResiduo } from 'app/shared/model/tipo-residuo.model';
import { TipoResiduoService } from './tipo-residuo.service';
import { ISolicitacaoRetirada } from 'app/shared/model/solicitacao-retirada.model';
import { SolicitacaoRetiradaService } from 'app/entities/solicitacao-retirada';
import { IColetor } from 'app/shared/model/coletor.model';
import { ColetorService } from 'app/entities/coletor';

@Component({
    selector: 'jhi-tipo-residuo-update',
    templateUrl: './tipo-residuo-update.component.html'
})
export class TipoResiduoUpdateComponent implements OnInit {
    tipoResiduo: ITipoResiduo;
    isSaving: boolean;

    solicitacaoretiradas: ISolicitacaoRetirada[];

    coletors: IColetor[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected tipoResiduoService: TipoResiduoService,
        protected solicitacaoRetiradaService: SolicitacaoRetiradaService,
        protected coletorService: ColetorService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tipoResiduo }) => {
            this.tipoResiduo = tipoResiduo;
        });
        this.solicitacaoRetiradaService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISolicitacaoRetirada[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISolicitacaoRetirada[]>) => response.body)
            )
            .subscribe(
                (res: ISolicitacaoRetirada[]) => (this.solicitacaoretiradas = res),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.coletorService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IColetor[]>) => mayBeOk.ok),
                map((response: HttpResponse<IColetor[]>) => response.body)
            )
            .subscribe((res: IColetor[]) => (this.coletors = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tipoResiduo.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoResiduoService.update(this.tipoResiduo));
        } else {
            this.subscribeToSaveResponse(this.tipoResiduoService.create(this.tipoResiduo));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoResiduo>>) {
        result.subscribe((res: HttpResponse<ITipoResiduo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSolicitacaoRetiradaById(index: number, item: ISolicitacaoRetirada) {
        return item.id;
    }

    trackColetorById(index: number, item: IColetor) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
