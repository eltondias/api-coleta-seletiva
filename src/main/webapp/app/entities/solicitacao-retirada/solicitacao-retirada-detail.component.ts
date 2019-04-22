import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISolicitacaoRetirada } from 'app/shared/model/solicitacao-retirada.model';

@Component({
    selector: 'jhi-solicitacao-retirada-detail',
    templateUrl: './solicitacao-retirada-detail.component.html'
})
export class SolicitacaoRetiradaDetailComponent implements OnInit {
    solicitacaoRetirada: ISolicitacaoRetirada;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ solicitacaoRetirada }) => {
            this.solicitacaoRetirada = solicitacaoRetirada;
        });
    }

    previousState() {
        window.history.back();
    }
}
