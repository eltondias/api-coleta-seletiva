import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImagem } from 'app/shared/model/imagem.model';

@Component({
    selector: 'jhi-imagem-detail',
    templateUrl: './imagem-detail.component.html'
})
export class ImagemDetailComponent implements OnInit {
    imagem: IImagem;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ imagem }) => {
            this.imagem = imagem;
        });
    }

    previousState() {
        window.history.back();
    }
}
