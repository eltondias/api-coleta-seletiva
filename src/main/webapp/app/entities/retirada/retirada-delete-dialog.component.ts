import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRetirada } from 'app/shared/model/retirada.model';
import { RetiradaService } from './retirada.service';

@Component({
    selector: 'jhi-retirada-delete-dialog',
    templateUrl: './retirada-delete-dialog.component.html'
})
export class RetiradaDeleteDialogComponent {
    retirada: IRetirada;

    constructor(protected retiradaService: RetiradaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.retiradaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'retiradaListModification',
                content: 'Deleted an retirada'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-retirada-delete-popup',
    template: ''
})
export class RetiradaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ retirada }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RetiradaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.retirada = retirada;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/retirada', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/retirada', { outlets: { popup: null } }]);
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
