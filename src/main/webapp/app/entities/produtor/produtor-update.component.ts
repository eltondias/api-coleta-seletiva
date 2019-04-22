import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IProdutor } from 'app/shared/model/produtor.model';
import { ProdutorService } from './produtor.service';
import { IParticipante } from 'app/shared/model/participante.model';
import { ParticipanteService } from 'app/entities/participante';

@Component({
    selector: 'jhi-produtor-update',
    templateUrl: './produtor-update.component.html'
})
export class ProdutorUpdateComponent implements OnInit {
    produtor: IProdutor;
    isSaving: boolean;

    participantes: IParticipante[];
    dataCadastro: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected produtorService: ProdutorService,
        protected participanteService: ParticipanteService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ produtor }) => {
            this.produtor = produtor;
            this.dataCadastro = this.produtor.dataCadastro != null ? this.produtor.dataCadastro.format(DATE_TIME_FORMAT) : null;
        });
        this.participanteService
            .query({ filter: 'produtor-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IParticipante[]>) => mayBeOk.ok),
                map((response: HttpResponse<IParticipante[]>) => response.body)
            )
            .subscribe(
                (res: IParticipante[]) => {
                    if (!this.produtor.participante || !this.produtor.participante.id) {
                        this.participantes = res;
                    } else {
                        this.participanteService
                            .find(this.produtor.participante.id)
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
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.produtor.dataCadastro = this.dataCadastro != null ? moment(this.dataCadastro, DATE_TIME_FORMAT) : null;
        if (this.produtor.id !== undefined) {
            this.subscribeToSaveResponse(this.produtorService.update(this.produtor));
        } else {
            this.subscribeToSaveResponse(this.produtorService.create(this.produtor));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProdutor>>) {
        result.subscribe((res: HttpResponse<IProdutor>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
