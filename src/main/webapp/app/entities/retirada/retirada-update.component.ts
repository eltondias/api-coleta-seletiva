import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IRetirada } from 'app/shared/model/retirada.model';
import { RetiradaService } from './retirada.service';
import { ISolicitacaoRetirada } from 'app/shared/model/solicitacao-retirada.model';
import { SolicitacaoRetiradaService } from 'app/entities/solicitacao-retirada';
import { IColetor } from 'app/shared/model/coletor.model';
import { ColetorService } from 'app/entities/coletor';

@Component({
    selector: 'jhi-retirada-update',
    templateUrl: './retirada-update.component.html'
})
export class RetiradaUpdateComponent implements OnInit {
    retirada: IRetirada;
    isSaving: boolean;

    solicitacaoretiradas: ISolicitacaoRetirada[];

    coletors: IColetor[];
    dataHoraAgendada: string;
    dataHoraRealizada: string;
    dataHoraConfirmacao: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected retiradaService: RetiradaService,
        protected solicitacaoRetiradaService: SolicitacaoRetiradaService,
        protected coletorService: ColetorService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ retirada }) => {
            this.retirada = retirada;
            this.dataHoraAgendada = this.retirada.dataHoraAgendada != null ? this.retirada.dataHoraAgendada.format(DATE_TIME_FORMAT) : null;
            this.dataHoraRealizada =
                this.retirada.dataHoraRealizada != null ? this.retirada.dataHoraRealizada.format(DATE_TIME_FORMAT) : null;
            this.dataHoraConfirmacao =
                this.retirada.dataHoraConfirmacao != null ? this.retirada.dataHoraConfirmacao.format(DATE_TIME_FORMAT) : null;
        });
        this.solicitacaoRetiradaService
            .query({ filter: 'retirada-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ISolicitacaoRetirada[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISolicitacaoRetirada[]>) => response.body)
            )
            .subscribe(
                (res: ISolicitacaoRetirada[]) => {
                    if (!this.retirada.solicitacaoRetirada || !this.retirada.solicitacaoRetirada.id) {
                        this.solicitacaoretiradas = res;
                    } else {
                        this.solicitacaoRetiradaService
                            .find(this.retirada.solicitacaoRetirada.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ISolicitacaoRetirada>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ISolicitacaoRetirada>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ISolicitacaoRetirada) => (this.solicitacaoretiradas = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
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
        this.retirada.dataHoraAgendada = this.dataHoraAgendada != null ? moment(this.dataHoraAgendada, DATE_TIME_FORMAT) : null;
        this.retirada.dataHoraRealizada = this.dataHoraRealizada != null ? moment(this.dataHoraRealizada, DATE_TIME_FORMAT) : null;
        this.retirada.dataHoraConfirmacao = this.dataHoraConfirmacao != null ? moment(this.dataHoraConfirmacao, DATE_TIME_FORMAT) : null;
        if (this.retirada.id !== undefined) {
            this.subscribeToSaveResponse(this.retiradaService.update(this.retirada));
        } else {
            this.subscribeToSaveResponse(this.retiradaService.create(this.retirada));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRetirada>>) {
        result.subscribe((res: HttpResponse<IRetirada>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
