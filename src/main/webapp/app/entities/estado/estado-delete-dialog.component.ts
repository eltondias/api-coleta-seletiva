import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstado } from 'app/shared/model/estado.model';
import { EstadoService } from './estado.service';

@Component({
    selector: 'jhi-estado-delete-dialog',
    templateUrl: './estado-delete-dialog.component.html'
})
export class EstadoDeleteDialogComponent {
    estado: IEstado;

    constructor(protected estadoService: EstadoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estadoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'estadoListModification',
                content: 'Deleted an estado'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estado-delete-popup',
    template: ''
})
export class EstadoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ estado }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EstadoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.estado = estado;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/estado', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/estado', { outlets: { popup: null } }]);
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
