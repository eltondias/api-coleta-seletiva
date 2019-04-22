import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICidade } from 'app/shared/model/cidade.model';
import { CidadeService } from './cidade.service';
import { IEstado } from 'app/shared/model/estado.model';
import { EstadoService } from 'app/entities/estado';

@Component({
    selector: 'jhi-cidade-update',
    templateUrl: './cidade-update.component.html'
})
export class CidadeUpdateComponent implements OnInit {
    cidade: ICidade;
    isSaving: boolean;

    estados: IEstado[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected cidadeService: CidadeService,
        protected estadoService: EstadoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cidade }) => {
            this.cidade = cidade;
        });
        this.estadoService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IEstado[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEstado[]>) => response.body)
            )
            .subscribe((res: IEstado[]) => (this.estados = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cidade.id !== undefined) {
            this.subscribeToSaveResponse(this.cidadeService.update(this.cidade));
        } else {
            this.subscribeToSaveResponse(this.cidadeService.create(this.cidade));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICidade>>) {
        result.subscribe((res: HttpResponse<ICidade>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEstadoById(index: number, item: IEstado) {
        return item.id;
    }
}
