import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITelefone } from 'app/shared/model/telefone.model';
import { TelefoneService } from './telefone.service';
import { IParticipante } from 'app/shared/model/participante.model';
import { ParticipanteService } from 'app/entities/participante';

@Component({
    selector: 'jhi-telefone-update',
    templateUrl: './telefone-update.component.html'
})
export class TelefoneUpdateComponent implements OnInit {
    telefone: ITelefone;
    isSaving: boolean;

    participantes: IParticipante[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected telefoneService: TelefoneService,
        protected participanteService: ParticipanteService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ telefone }) => {
            this.telefone = telefone;
        });
        this.participanteService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IParticipante[]>) => mayBeOk.ok),
                map((response: HttpResponse<IParticipante[]>) => response.body)
            )
            .subscribe((res: IParticipante[]) => (this.participantes = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.telefone.id !== undefined) {
            this.subscribeToSaveResponse(this.telefoneService.update(this.telefone));
        } else {
            this.subscribeToSaveResponse(this.telefoneService.create(this.telefone));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITelefone>>) {
        result.subscribe((res: HttpResponse<ITelefone>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
