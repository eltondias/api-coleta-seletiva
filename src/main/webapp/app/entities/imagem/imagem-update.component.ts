import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IImagem } from 'app/shared/model/imagem.model';
import { ImagemService } from './imagem.service';
import { ISolicitacaoRetirada } from 'app/shared/model/solicitacao-retirada.model';
import { SolicitacaoRetiradaService } from 'app/entities/solicitacao-retirada';

@Component({
    selector: 'jhi-imagem-update',
    templateUrl: './imagem-update.component.html'
})
export class ImagemUpdateComponent implements OnInit {
    imagem: IImagem;
    isSaving: boolean;

    solicitacaoretiradas: ISolicitacaoRetirada[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected imagemService: ImagemService,
        protected solicitacaoRetiradaService: SolicitacaoRetiradaService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ imagem }) => {
            this.imagem = imagem;
        });
        this.solicitacaoRetiradaService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISolicitacaoRetirada[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISolicitacaoRetirada[]>) => response.body)
            )
            .subscribe(
                (res: ISolicitacaoRetirada[]) => (this.solicitacaoretiradas = res),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.imagem.id !== undefined) {
            this.subscribeToSaveResponse(this.imagemService.update(this.imagem));
        } else {
            this.subscribeToSaveResponse(this.imagemService.create(this.imagem));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IImagem>>) {
        result.subscribe((res: HttpResponse<IImagem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSolicitacaoRetiradaById(index: number, item: ISolicitacaoRetirada) {
        return item.id;
    }
}
