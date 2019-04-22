import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IColetor } from 'app/shared/model/coletor.model';

@Component({
    selector: 'jhi-coletor-detail',
    templateUrl: './coletor-detail.component.html'
})
export class ColetorDetailComponent implements OnInit {
    coletor: IColetor;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ coletor }) => {
            this.coletor = coletor;
        });
    }

    previousState() {
        window.history.back();
    }
}
