import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHorarioPreferencialRetirada } from 'app/shared/model/horario-preferencial-retirada.model';

@Component({
    selector: 'jhi-horario-preferencial-retirada-detail',
    templateUrl: './horario-preferencial-retirada-detail.component.html'
})
export class HorarioPreferencialRetiradaDetailComponent implements OnInit {
    horarioPreferencialRetirada: IHorarioPreferencialRetirada;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ horarioPreferencialRetirada }) => {
            this.horarioPreferencialRetirada = horarioPreferencialRetirada;
        });
    }

    previousState() {
        window.history.back();
    }
}
