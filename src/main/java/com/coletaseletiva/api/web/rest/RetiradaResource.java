package com.coletaseletiva.api.web.rest;
import com.coletaseletiva.api.domain.Retirada;
import com.coletaseletiva.api.repository.RetiradaRepository;
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
 * REST controller for managing Retirada.
 */
@RestController
@RequestMapping("/api")
public class RetiradaResource {

    private final Logger log = LoggerFactory.getLogger(RetiradaResource.class);

    private static final String ENTITY_NAME = "retirada";

    private final RetiradaRepository retiradaRepository;

    public RetiradaResource(RetiradaRepository retiradaRepository) {
        this.retiradaRepository = retiradaRepository;
    }

    /**
     * POST  /retiradas : Create a new retirada.
     *
     * @param retirada the retirada to create
     * @return the ResponseEntity with status 201 (Created) and with body the new retirada, or with status 400 (Bad Request) if the retirada has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/retiradas")
    public ResponseEntity<Retirada> createRetirada(@Valid @RequestBody Retirada retirada) throws URISyntaxException {
        log.debug("REST request to save Retirada : {}", retirada);
        if (retirada.getId() != null) {
            throw new BadRequestAlertException("A new retirada cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Retirada result = retiradaRepository.save(retirada);
        return ResponseEntity.created(new URI("/api/retiradas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /retiradas : Updates an existing retirada.
     *
     * @param retirada the retirada to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated retirada,
     * or with status 400 (Bad Request) if the retirada is not valid,
     * or with status 500 (Internal Server Error) if the retirada couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/retiradas")
    public ResponseEntity<Retirada> updateRetirada(@Valid @RequestBody Retirada retirada) throws URISyntaxException {
        log.debug("REST request to update Retirada : {}", retirada);
        if (retirada.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Retirada result = retiradaRepository.save(retirada);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, retirada.getId().toString()))
            .body(result);
    }

    /**
     * GET  /retiradas : get all the retiradas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of retiradas in body
     */
    @GetMapping("/retiradas")
    public List<Retirada> getAllRetiradas() {
        log.debug("REST request to get all Retiradas");
        return retiradaRepository.findAll();
    }

    /**
     * GET  /retiradas/:id : get the "id" retirada.
     *
     * @param id the id of the retirada to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the retirada, or with status 404 (Not Found)
     */
    @GetMapping("/retiradas/{id}")
    public ResponseEntity<Retirada> getRetirada(@PathVariable Long id) {
        log.debug("REST request to get Retirada : {}", id);
        Optional<Retirada> retirada = retiradaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(retirada);
    }

    /**
     * DELETE  /retiradas/:id : delete the "id" retirada.
     *
     * @param id the id of the retirada to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/retiradas/{id}")
    public ResponseEntity<Void> deleteRetirada(@PathVariable Long id) {
        log.debug("REST request to delete Retirada : {}", id);
        retiradaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
