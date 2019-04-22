import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstado } from 'app/shared/model/estado.model';

@Component({
    selector: 'jhi-estado-detail',
    templateUrl: './estado-detail.component.html'
})
export class EstadoDetailComponent implements OnInit {
    estado: IEstado;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ estado }) => {
            this.estado = estado;
        });
    }

    previousState() {
        window.history.back();
    }
}
