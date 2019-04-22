import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISolicitacaoRetirada } from 'app/shared/model/solicitacao-retirada.model';
import { SolicitacaoRetiradaService } from './solicitacao-retirada.service';

@Component({
    selector: 'jhi-solicitacao-retirada-delete-dialog',
    templateUrl: './solicitacao-retirada-delete-dialog.component.html'
})
export class SolicitacaoRetiradaDeleteDialogComponent {
    solicitacaoRetirada: ISolicitacaoRetirada;

    constructor(
        protected solicitacaoRetiradaService: SolicitacaoRetiradaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.solicitacaoRetiradaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'solicitacaoRetiradaListModification',
                content: 'Deleted an solicitacaoRetirada'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-solicitacao-retirada-delete-popup',
    template: ''
})
export class SolicitacaoRetiradaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ solicitacaoRetirada }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SolicitacaoRetiradaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.solicitacaoRetirada = solicitacaoRetirada;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/solicitacao-retirada', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/solicitacao-retirada', { outlets: { popup: null } }]);
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
