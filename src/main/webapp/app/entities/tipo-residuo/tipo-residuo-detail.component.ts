import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoResiduo } from 'app/shared/model/tipo-residuo.model';

@Component({
    selector: 'jhi-tipo-residuo-detail',
    templateUrl: './tipo-residuo-detail.component.html'
})
export class TipoResiduoDetailComponent implements OnInit {
    tipoResiduo: ITipoResiduo;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoResiduo }) => {
            this.tipoResiduo = tipoResiduo;
        });
    }

    previousState() {
        window.history.back();
    }
}
