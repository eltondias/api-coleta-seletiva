import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IColetor } from 'app/shared/model/coletor.model';
import { ColetorService } from './coletor.service';

@Component({
    selector: 'jhi-coletor-delete-dialog',
    templateUrl: './coletor-delete-dialog.component.html'
})
export class ColetorDeleteDialogComponent {
    coletor: IColetor;

    constructor(protected coletorService: ColetorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.coletorService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'coletorListModification',
                content: 'Deleted an coletor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-coletor-delete-popup',
    template: ''
})
export class ColetorDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ coletor }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ColetorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.coletor = coletor;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/coletor', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/coletor', { outlets: { popup: null } }]);
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
