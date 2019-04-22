package com.coletaseletiva.api.web.rest;
import com.coletaseletiva.api.domain.Coletor;
import com.coletaseletiva.api.repository.ColetorRepository;
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
 * REST controller for managing Coletor.
 */
@RestController
@RequestMapping("/api")
public class ColetorResource {

    private final Logger log = LoggerFactory.getLogger(ColetorResource.class);

    private static final String ENTITY_NAME = "coletor";

    private final ColetorRepository coletorRepository;

    public ColetorResource(ColetorRepository coletorRepository) {
        this.coletorRepository = coletorRepository;
    }

    /**
     * POST  /coletors : Create a new coletor.
     *
     * @param coletor the coletor to create
     * @return the ResponseEntity with status 201 (Created) and with body the new coletor, or with status 400 (Bad Request) if the coletor has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/coletors")
    public ResponseEntity<Coletor> createColetor(@Valid @RequestBody Coletor coletor) throws URISyntaxException {
        log.debug("REST request to save Coletor : {}", coletor);
        if (coletor.getId() != null) {
            throw new BadRequestAlertException("A new coletor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Coletor result = coletorRepository.save(coletor);
        return ResponseEntity.created(new URI("/api/coletors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /coletors : Updates an existing coletor.
     *
     * @param coletor the coletor to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated coletor,
     * or with status 400 (Bad Request) if the coletor is not valid,
     * or with status 500 (Internal Server Error) if the coletor couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/coletors")
    public ResponseEntity<Coletor> updateColetor(@Valid @RequestBody Coletor coletor) throws URISyntaxException {
        log.debug("REST request to update Coletor : {}", coletor);
        if (coletor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Coletor result = coletorRepository.save(coletor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, coletor.getId().toString()))
            .body(result);
    }

    /**
     * GET  /coletors : get all the coletors.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of coletors in body
     */
    @GetMapping("/coletors")
    public List<Coletor> getAllColetors(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Coletors");
        return coletorRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /coletors/:id : get the "id" coletor.
     *
     * @param id the id of the coletor to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the coletor, or with status 404 (Not Found)
     */
    @GetMapping("/coletors/{id}")
    public ResponseEntity<Coletor> getColetor(@PathVariable Long id) {
        log.debug("REST request to get Coletor : {}", id);
        Optional<Coletor> coletor = coletorRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(coletor);
    }

    /**
     * DELETE  /coletors/:id : delete the "id" coletor.
     *
     * @param id the id of the coletor to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/coletors/{id}")
    public ResponseEntity<Void> deleteColetor(@PathVariable Long id) {
        log.debug("REST request to delete Coletor : {}", id);
        coletorRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
