import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IParticipante } from 'app/shared/model/participante.model';
import { ParticipanteService } from './participante.service';
import { IUsuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from 'app/entities/usuario';

@Component({
    selector: 'jhi-participante-update',
    templateUrl: './participante-update.component.html'
})
export class ParticipanteUpdateComponent implements OnInit {
    participante: IParticipante;
    isSaving: boolean;

    usuarios: IUsuario[];
    dataCadastro: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected participanteService: ParticipanteService,
        protected usuarioService: UsuarioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ participante }) => {
            this.participante = participante;
            this.dataCadastro = this.participante.dataCadastro != null ? this.participante.dataCadastro.format(DATE_TIME_FORMAT) : null;
        });
        this.usuarioService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUsuario[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUsuario[]>) => response.body)
            )
            .subscribe((res: IUsuario[]) => (this.usuarios = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.participante.dataCadastro = this.dataCadastro != null ? moment(this.dataCadastro, DATE_TIME_FORMAT) : null;
        if (this.participante.id !== undefined) {
            this.subscribeToSaveResponse(this.participanteService.update(this.participante));
        } else {
            this.subscribeToSaveResponse(this.participanteService.create(this.participante));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IParticipante>>) {
        result.subscribe((res: HttpResponse<IParticipante>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUsuarioById(index: number, item: IUsuario) {
        return item.id;
    }
}
