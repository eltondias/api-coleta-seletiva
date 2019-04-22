package com.coletaseletiva.api.web.rest;
import com.coletaseletiva.api.domain.TipoResiduo;
import com.coletaseletiva.api.repository.TipoResiduoRepository;
import com.coletaseletiva.api.web.rest.errors.BadRequestAlertException;
import com.coletaseletiva.api.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TipoResiduo.
 */
@RestController
@RequestMapping("/api")
public class TipoResiduoResource {

    private final Logger log = LoggerFactory.getLogger(TipoResiduoResource.class);

    private static final String ENTITY_NAME = "tipoResiduo";

    private final TipoResiduoRepository tipoResiduoRepository;

    public TipoResiduoResource(TipoResiduoRepository tipoResiduoRepository) {
        this.tipoResiduoRepository = tipoResiduoRepository;
    }

    /**
     * POST  /tipo-residuos : Create a new tipoResiduo.
     *
     * @param tipoResiduo the tipoResiduo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoResiduo, or with status 400 (Bad Request) if the tipoResiduo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-residuos")
    public ResponseEntity<TipoResiduo> createTipoResiduo(@RequestBody TipoResiduo tipoResiduo) throws URISyntaxException {
        log.debug("REST request to save TipoResiduo : {}", tipoResiduo);
        if (tipoResiduo.getId() != null) {
            throw new BadRequestAlertException("A new tipoResiduo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoResiduo result = tipoResiduoRepository.save(tipoResiduo);
        return ResponseEntity.created(new URI("/api/tipo-residuos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-residuos : Updates an existing tipoResiduo.
     *
     * @param tipoResiduo the tipoResiduo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoResiduo,
     * or with status 400 (Bad Request) if the tipoResiduo is not valid,
     * or with status 500 (Internal Server Error) if the tipoResiduo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-residuos")
    public ResponseEntity<TipoResiduo> updateTipoResiduo(@RequestBody TipoResiduo tipoResiduo) throws URISyntaxException {
        log.debug("REST request to update TipoResiduo : {}", tipoResiduo);
        if (tipoResiduo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoResiduo result = tipoResiduoRepository.save(tipoResiduo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoResiduo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-residuos : get all the tipoResiduos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipoResiduos in body
     */
    @GetMapping("/tipo-residuos")
    public List<TipoResiduo> getAllTipoResiduos() {
        log.debug("REST request to get all TipoResiduos");
        return tipoResiduoRepository.findAll();
    }

    /**
     * GET  /tipo-residuos/:id : get the "id" tipoResiduo.
     *
     * @param id the id of the tipoResiduo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoResiduo, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-residuos/{id}")
    public ResponseEntity<TipoResiduo> getTipoResiduo(@PathVariable Long id) {
        log.debug("REST request to get TipoResiduo : {}", id);
        Optional<TipoResiduo> tipoResiduo = tipoResiduoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoResiduo);
    }

    /**
     * DELETE  /tipo-residuos/:id : delete the "id" tipoResiduo.
     *
     * @param id the id of the tipoResiduo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-residuos/{id}")
    public ResponseEntity<Void> deleteTipoResiduo(@PathVariable Long id) {
        log.debug("REST request to delete TipoResiduo : {}", id);
        tipoResiduoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
