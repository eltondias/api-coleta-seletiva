package com.coletaseletiva.api.web.rest;
import com.coletaseletiva.api.domain.SolicitacaoRetirada;
import com.coletaseletiva.api.repository.SolicitacaoRetiradaRepository;
import com.coletaseletiva.api.web.rest.errors.BadRequestAlertException;
import com.coletaseletiva.api.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SolicitacaoRetirada.
 */
@RestController
@RequestMapping("/api")
public class SolicitacaoRetiradaResource {

    private final Logger log = LoggerFactory.getLogger(SolicitacaoRetiradaResource.class);

    private static final String ENTITY_NAME = "solicitacaoRetirada";

    private final SolicitacaoRetiradaRepository solicitacaoRetiradaRepository;

    public SolicitacaoRetiradaResource(SolicitacaoRetiradaRepository solicitacaoRetiradaRepository) {
        this.solicitacaoRetiradaRepository = solicitacaoRetiradaRepository;
    }

    /**
     * POST  /solicitacao-retiradas : Create a new solicitacaoRetirada.
     *
     * @param solicitacaoRetirada the solicitacaoRetirada to create
     * @return the ResponseEntity with status 201 (Created) and with body the new solicitacaoRetirada, or with status 400 (Bad Request) if the solicitacaoRetirada has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/solicitacao-retiradas")
    public ResponseEntity<SolicitacaoRetirada> createSolicitacaoRetirada(@Valid @RequestBody SolicitacaoRetirada solicitacaoRetirada) throws URISyntaxException {
        log.debug("REST request to save SolicitacaoRetirada : {}", solicitacaoRetirada);
        if (solicitacaoRetirada.getId() != null) {
            throw new BadRequestAlertException("A new solicitacaoRetirada cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SolicitacaoRetirada result = solicitacaoRetiradaRepository.save(solicitacaoRetirada);
        return ResponseEntity.created(new URI("/api/solicitacao-retiradas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /solicitacao-retiradas : Updates an existing solicitacaoRetirada.
     *
     * @param solicitacaoRetirada the solicitacaoRetirada to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated solicitacaoRetirada,
     * or with status 400 (Bad Request) if the solicitacaoRetirada is not valid,
     * or with status 500 (Internal Server Error) if the solicitacaoRetirada couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/solicitacao-retiradas")
    public ResponseEntity<SolicitacaoRetirada> updateSolicitacaoRetirada(@Valid @RequestBody SolicitacaoRetirada solicitacaoRetirada) throws URISyntaxException {
        log.debug("REST request to update SolicitacaoRetirada : {}", solicitacaoRetirada);
        if (solicitacaoRetirada.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SolicitacaoRetirada result = solicitacaoRetiradaRepository.save(solicitacaoRetirada);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, solicitacaoRetirada.getId().toString()))
            .body(result);
    }

    /**
     * GET  /solicitacao-retiradas : get all the solicitacaoRetiradas.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of solicitacaoRetiradas in body
     */
    @GetMapping("/solicitacao-retiradas")
    public List<SolicitacaoRetirada> getAllSolicitacaoRetiradas(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all SolicitacaoRetiradas");
        return solicitacaoRetiradaRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /solicitacao-retiradas/:id : get the "id" solicitacaoRetirada.
     *
     * @param id the id of the solicitacaoRetirada to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the solicitacaoRetirada, or with status 404 (Not Found)
     */
    @GetMapping("/solicitacao-retiradas/{id}")
    public ResponseEntity<SolicitacaoRetirada> getSolicitacaoRetirada(@PathVariable Long id) {
        log.debug("REST request to get SolicitacaoRetirada : {}", id);
        Optional<SolicitacaoRetirada> solicitacaoRetirada = solicitacaoRetiradaRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(solicitacaoRetirada);
    }

    /**
     * DELETE  /solicitacao-retiradas/:id : delete the "id" solicitacaoRetirada.
     *
     * @param id the id of the solicitacaoRetirada to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/solicitacao-retiradas/{id}")
    public ResponseEntity<Void> deleteSolicitacaoRetirada(@PathVariable Long id) {
        log.debug("REST request to delete SolicitacaoRetirada : {}", id);
        solicitacaoRetiradaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
