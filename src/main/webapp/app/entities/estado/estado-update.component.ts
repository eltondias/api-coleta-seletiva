import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IEstado } from 'app/shared/model/estado.model';
import { EstadoService } from './estado.service';

@Component({
    selector: 'jhi-estado-update',
    templateUrl: './estado-update.component.html'
})
export class EstadoUpdateComponent implements OnInit {
    estado: IEstado;
    isSaving: boolean;

    constructor(protected estadoService: EstadoService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ estado }) => {
            this.estado = estado;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.estado.id !== undefined) {
            this.subscribeToSaveResponse(this.estadoService.update(this.estado));
        } else {
            this.subscribeToSaveResponse(this.estadoService.create(this.estado));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstado>>) {
        result.subscribe((res: HttpResponse<IEstado>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
