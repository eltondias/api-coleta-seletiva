import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoResiduo } from 'app/shared/model/tipo-residuo.model';
import { TipoResiduoService } from './tipo-residuo.service';

@Component({
    selector: 'jhi-tipo-residuo-delete-dialog',
    templateUrl: './tipo-residuo-delete-dialog.component.html'
})
export class TipoResiduoDeleteDialogComponent {
    tipoResiduo: ITipoResiduo;

    constructor(
        protected tipoResiduoService: TipoResiduoService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoResiduoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tipoResiduoListModification',
                content: 'Deleted an tipoResiduo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-residuo-delete-popup',
    template: ''
})
export class TipoResiduoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoResiduo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TipoResiduoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.tipoResiduo = tipoResiduo;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/tipo-residuo', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/tipo-residuo', { outlets: { popup: null } }]);
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
