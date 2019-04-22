import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IEmail } from 'app/shared/model/email.model';
import { EmailService } from './email.service';
import { IParticipante } from 'app/shared/model/participante.model';
import { ParticipanteService } from 'app/entities/participante';

@Component({
    selector: 'jhi-email-update',
    templateUrl: './email-update.component.html'
})
export class EmailUpdateComponent implements OnInit {
    email: IEmail;
    isSaving: boolean;

    participantes: IParticipante[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected emailService: EmailService,
        protected participanteService: ParticipanteService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ email }) => {
            this.email = email;
        });
        this.participanteService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IParticipante[]>) => mayBeOk.ok),
                map((response: HttpResponse<IParticipante[]>) => response.body)
            )
            .subscribe((res: IParticipante[]) => (this.participantes = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.email.id !== undefined) {
            this.subscribeToSaveResponse(this.emailService.update(this.email));
        } else {
            this.subscribeToSaveResponse(this.emailService.create(this.email));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmail>>) {
        result.subscribe((res: HttpResponse<IEmail>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackParticipanteById(index: number, item: IParticipante) {
        return item.id;
    }
}
