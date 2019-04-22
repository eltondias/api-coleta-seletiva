import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IHorarioPreferencialRetirada } from 'app/shared/model/horario-preferencial-retirada.model';
import { HorarioPreferencialRetiradaService } from './horario-preferencial-retirada.service';
import { ISolicitacaoRetirada } from 'app/shared/model/solicitacao-retirada.model';
import { SolicitacaoRetiradaService } from 'app/entities/solicitacao-retirada';

@Component({
    selector: 'jhi-horario-preferencial-retirada-update',
    templateUrl: './horario-preferencial-retirada-update.component.html'
})
export class HorarioPreferencialRetiradaUpdateComponent implements OnInit {
    horarioPreferencialRetirada: IHorarioPreferencialRetirada;
    isSaving: boolean;

    solicitacaoretiradas: ISolicitacaoRetirada[];
    dataHora: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected horarioPreferencialRetiradaService: HorarioPreferencialRetiradaService,
        protected solicitacaoRetiradaService: SolicitacaoRetiradaService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ horarioPreferencialRetirada }) => {
            this.horarioPreferencialRetirada = horarioPreferencialRetirada;
            this.dataHora =
                this.horarioPreferencialRetirada.dataHora != null
                    ? this.horarioPreferencialRetirada.dataHora.format(DATE_TIME_FORMAT)
                    : null;
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
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.horarioPreferencialRetirada.dataHora = this.dataHora != null ? moment(this.dataHora, DATE_TIME_FORMAT) : null;
        if (this.horarioPreferencialRetirada.id !== undefined) {
            this.subscribeToSaveResponse(this.horarioPreferencialRetiradaService.update(this.horarioPreferencialRetirada));
        } else {
            this.subscribeToSaveResponse(this.horarioPreferencialRetiradaService.create(this.horarioPreferencialRetirada));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IHorarioPreferencialRetirada>>) {
        result.subscribe(
            (res: HttpResponse<IHorarioPreferencialRetirada>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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
}
