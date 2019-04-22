import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRedeSocial } from 'app/shared/model/rede-social.model';

@Component({
    selector: 'jhi-rede-social-detail',
    templateUrl: './rede-social-detail.component.html'
})
export class RedeSocialDetailComponent implements OnInit {
    redeSocial: IRedeSocial;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ redeSocial }) => {
            this.redeSocial = redeSocial;
        });
    }

    previousState() {
        window.history.back();
    }
}
