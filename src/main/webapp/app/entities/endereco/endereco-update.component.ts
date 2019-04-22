import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from './endereco.service';
import { ICidade } from 'app/shared/model/cidade.model';
import { CidadeService } from 'app/entities/cidade';
import { IParticipante } from 'app/shared/model/participante.model';
import { ParticipanteService } from 'app/entities/participante';

@Component({
    selector: 'jhi-endereco-update',
    templateUrl: './endereco-update.component.html'
})
export class EnderecoUpdateComponent implements OnInit {
    endereco: IEndereco;
    isSaving: boolean;

    cidades: ICidade[];

    participantes: IParticipante[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected enderecoService: EnderecoService,
        protected cidadeService: CidadeService,
        protected participanteService: ParticipanteService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ endereco }) => {
            this.endereco = endereco;
        });
        this.cidadeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICidade[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICidade[]>) => response.body)
            )
            .subscribe((res: ICidade[]) => (this.cidades = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.endereco.id !== undefined) {
            this.subscribeToSaveResponse(this.enderecoService.update(this.endereco));
        } else {
            this.subscribeToSaveResponse(this.enderecoService.create(this.endereco));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEndereco>>) {
        result.subscribe((res: HttpResponse<IEndereco>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCidadeById(index: number, item: ICidade) {
        return item.id;
    }

    trackParticipanteById(index: number, item: IParticipante) {
        return item.id;
    }
}
