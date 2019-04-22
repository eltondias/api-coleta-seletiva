import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRedeSocial } from 'app/shared/model/rede-social.model';
import { RedeSocialService } from './rede-social.service';

@Component({
    selector: 'jhi-rede-social-delete-dialog',
    templateUrl: './rede-social-delete-dialog.component.html'
})
export class RedeSocialDeleteDialogComponent {
    redeSocial: IRedeSocial;

    constructor(
        protected redeSocialService: RedeSocialService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.redeSocialService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'redeSocialListModification',
                content: 'Deleted an redeSocial'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rede-social-delete-popup',
    template: ''
})
export class RedeSocialDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ redeSocial }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RedeSocialDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.redeSocial = redeSocial;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/rede-social', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/rede-social', { outlets: { popup: null } }]);
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
