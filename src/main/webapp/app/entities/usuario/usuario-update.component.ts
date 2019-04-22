import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IUsuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from './usuario.service';
import { IParticipante } from 'app/shared/model/participante.model';
import { ParticipanteService } from 'app/entities/participante';

@Component({
    selector: 'jhi-usuario-update',
    templateUrl: './usuario-update.component.html'
})
export class UsuarioUpdateComponent implements OnInit {
    usuario: IUsuario;
    isSaving: boolean;

    participantes: IParticipante[];
    dataCadastro: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected usuarioService: UsuarioService,
        protected participanteService: ParticipanteService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ usuario }) => {
            this.usuario = usuario;
            this.dataCadastro = this.usuario.dataCadastro != null ? this.usuario.dataCadastro.format(DATE_TIME_FORMAT) : null;
        });
        this.participanteService
            .query({ filter: 'usuario-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IParticipante[]>) => mayBeOk.ok),
                map((response: HttpResponse<IParticipante[]>) => response.body)
            )
            .subscribe(
                (res: IParticipante[]) => {
                    if (!this.usuario.participante || !this.usuario.participante.id) {
                        this.participantes = res;
                    } else {
                        this.participanteService
                            .find(this.usuario.participante.id)
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
        this.usuario.dataCadastro = this.dataCadastro != null ? moment(this.dataCadastro, DATE_TIME_FORMAT) : null;
        if (this.usuario.id !== undefined) {
            this.subscribeToSaveResponse(this.usuarioService.update(this.usuario));
        } else {
            this.subscribeToSaveResponse(this.usuarioService.create(this.usuario));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuario>>) {
        result.subscribe((res: HttpResponse<IUsuario>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
