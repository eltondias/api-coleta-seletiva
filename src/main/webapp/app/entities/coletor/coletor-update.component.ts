import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IColetor } from 'app/shared/model/coletor.model';
import { ColetorService } from './coletor.service';
import { IParticipante } from 'app/shared/model/participante.model';
import { ParticipanteService } from 'app/entities/participante';
import { ITipoResiduo } from 'app/shared/model/tipo-residuo.model';
import { TipoResiduoService } from 'app/entities/tipo-residuo';

@Component({
    selector: 'jhi-coletor-update',
    templateUrl: './coletor-update.component.html'
})
export class ColetorUpdateComponent implements OnInit {
    coletor: IColetor;
    isSaving: boolean;

    participantes: IParticipante[];

    tiporesiduos: ITipoResiduo[];
    dataCadastro: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected coletorService: ColetorService,
        protected participanteService: ParticipanteService,
        protected tipoResiduoService: TipoResiduoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ coletor }) => {
            this.coletor = coletor;
            this.dataCadastro = this.coletor.dataCadastro != null ? this.coletor.dataCadastro.format(DATE_TIME_FORMAT) : null;
        });
        this.participanteService
            .query({ filter: 'coletor-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IParticipante[]>) => mayBeOk.ok),
                map((response: HttpResponse<IParticipante[]>) => response.body)
            )
            .subscribe(
                (res: IParticipante[]) => {
                    if (!this.coletor.participante || !this.coletor.participante.id) {
                        this.participantes = res;
                    } else {
                        this.participanteService
                            .find(this.coletor.participante.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IParticipante>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IParticipante>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IParticipante) => (this.participantes = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.tipoResiduoService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITipoResiduo[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITipoResiduo[]>) => response.body)
            )
            .subscribe((res: ITipoResiduo[]) => (this.tiporesiduos = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.coletor.dataCadastro = this.dataCadastro != null ? moment(this.dataCadastro, DATE_TIME_FORMAT) : null;
        if (this.coletor.id !== undefined) {
            this.subscribeToSaveResponse(this.coletorService.update(this.coletor));
        } else {
            this.subscribeToSaveResponse(this.coletorService.create(this.coletor));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IColetor>>) {
        result.subscribe((res: HttpResponse<IColetor>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackParticipanteById(index: number, item: IParticipante) {
        return item.id;
    }

    trackTipoResiduoById(index: number, item: ITipoResiduo) {
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
