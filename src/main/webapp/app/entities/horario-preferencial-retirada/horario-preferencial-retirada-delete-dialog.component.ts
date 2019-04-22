import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHorarioPreferencialRetirada } from 'app/shared/model/horario-preferencial-retirada.model';
import { HorarioPreferencialRetiradaService } from './horario-preferencial-retirada.service';

@Component({
    selector: 'jhi-horario-preferencial-retirada-delete-dialog',
    templateUrl: './horario-preferencial-retirada-delete-dialog.component.html'
})
export class HorarioPreferencialRetiradaDeleteDialogComponent {
    horarioPreferencialRetirada: IHorarioPreferencialRetirada;

    constructor(
        protected horarioPreferencialRetiradaService: HorarioPreferencialRetiradaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.horarioPreferencialRetiradaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'horarioPreferencialRetiradaListModification',
                content: 'Deleted an horarioPreferencialRetirada'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-horario-preferencial-retirada-delete-popup',
    template: ''
})
export class HorarioPreferencialRetiradaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ horarioPreferencialRetirada }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HorarioPreferencialRetiradaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.horarioPreferencialRetirada = horarioPreferencialRetirada;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/horario-preferencial-retirada', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/horario-preferencial-retirada', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
