import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ISolicitacaoRetirada } from 'app/shared/model/solicitacao-retirada.model';
import { SolicitacaoRetiradaService } from './solicitacao-retirada.service';
import { ITipoResiduo } from 'app/shared/model/tipo-residuo.model';
import { TipoResiduoService } from 'app/entities/tipo-residuo';
import { IProdutor } from 'app/shared/model/produtor.model';
import { ProdutorService } from 'app/entities/produtor';

@Component({
    selector: 'jhi-solicitacao-retirada-update',
    templateUrl: './solicitacao-retirada-update.component.html'
})
export class SolicitacaoRetiradaUpdateComponent implements OnInit {
    solicitacaoRetirada: ISolicitacaoRetirada;
    isSaving: boolean;

    tiporesiduos: ITipoResiduo[];

    produtors: IProdutor[];
    dataHora: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected solicitacaoRetiradaService: SolicitacaoRetiradaService,
        protected tipoResiduoService: TipoResiduoService,
        protected produtorService: ProdutorService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ solicitacaoRetirada }) => {
            this.solicitacaoRetirada = solicitacaoRetirada;
            this.dataHora = this.solicitacaoRetirada.dataHora != null ? this.solicitacaoRetirada.dataHora.format(DATE_TIME_FORMAT) : null;
        });
        this.tipoResiduoService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITipoResiduo[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITipoResiduo[]>) => response.body)
            )
            .subscribe((res: ITipoResiduo[]) => (this.tiporesiduos = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.produtorService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProdutor[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProdutor[]>) => response.body)
            )
            .subscribe((res: IProdutor[]) => (this.produtors = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.solicitacaoRetirada.dataHora = this.dataHora != null ? moment(this.dataHora, DATE_TIME_FORMAT) : null;
        if (this.solicitacaoRetirada.id !== undefined) {
            this.subscribeToSaveResponse(this.solicitacaoRetiradaService.update(this.solicitacaoRetirada));
        } else {
            this.subscribeToSaveResponse(this.solicitacaoRetiradaService.create(this.solicitacaoRetirada));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISolicitacaoRetirada>>) {
        result.subscribe((res: HttpResponse<ISolicitacaoRetirada>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTipoResiduoById(index: number, item: ITipoResiduo) {
        return item.id;
    }

    trackProdutorById(index: number, item: IProdutor) {
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
