import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRetirada } from 'app/shared/model/retirada.model';

@Component({
    selector: 'jhi-retirada-detail',
    templateUrl: './retirada-detail.component.html'
})
export class RetiradaDetailComponent implements OnInit {
    retirada: IRetirada;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ retirada }) => {
            this.retirada = retirada;
        });
    }

    previousState() {
        window.history.back();
    }
}
