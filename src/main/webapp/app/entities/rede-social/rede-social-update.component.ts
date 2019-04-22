import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRedeSocial } from 'app/shared/model/rede-social.model';
import { RedeSocialService } from './rede-social.service';
import { IParticipante } from 'app/shared/model/participante.model';
import { ParticipanteService } from 'app/entities/participante';

@Component({
    selector: 'jhi-rede-social-update',
    templateUrl: './rede-social-update.component.html'
})
export class RedeSocialUpdateComponent implements OnInit {
    redeSocial: IRedeSocial;
    isSaving: boolean;

    participantes: IParticipante[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected redeSocialService: RedeSocialService,
        protected participanteService: ParticipanteService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ redeSocial }) => {
            this.redeSocial = redeSocial;
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
        if (this.redeSocial.id !== undefined) {
            this.subscribeToSaveResponse(this.redeSocialService.update(this.redeSocial));
        } else {
            this.subscribeToSaveResponse(this.redeSocialService.create(this.redeSocial));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRedeSocial>>) {
        result.subscribe((res: HttpResponse<IRedeSocial>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
