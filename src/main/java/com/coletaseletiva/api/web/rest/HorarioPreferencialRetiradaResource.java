package com.coletaseletiva.api.web.rest;
import com.coletaseletiva.api.domain.HorarioPreferencialRetirada;
import com.coletaseletiva.api.repository.HorarioPreferencialRetiradaRepository;
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
 * REST controller for managing HorarioPreferencialRetirada.
 */
@RestController
@RequestMapping("/api")
public class HorarioPreferencialRetiradaResource {

    private final Logger log = LoggerFactory.getLogger(HorarioPreferencialRetiradaResource.class);

    private static final String ENTITY_NAME = "horarioPreferencialRetirada";

    private final HorarioPreferencialRetiradaRepository horarioPreferencialRetiradaRepository;

    public HorarioPreferencialRetiradaResource(HorarioPreferencialRetiradaRepository horarioPreferencialRetiradaRepository) {
        this.horarioPreferencialRetiradaRepository = horarioPreferencialRetiradaRepository;
    }

    /**
     * POST  /horario-preferencial-retiradas : Create a new horarioPreferencialRetirada.
     *
     * @param horarioPreferencialRetirada the horarioPreferencialRetirada to create
     * @return the ResponseEntity with status 201 (Created) and with body the new horarioPreferencialRetirada, or with status 400 (Bad Request) if the horarioPreferencialRetirada has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/horario-preferencial-retiradas")
    public ResponseEntity<HorarioPreferencialRetirada> createHorarioPreferencialRetirada(@Valid @RequestBody HorarioPreferencialRetirada horarioPreferencialRetirada) throws URISyntaxException {
        log.debug("REST request to save HorarioPreferencialRetirada : {}", horarioPreferencialRetirada);
        if (horarioPreferencialRetirada.getId() != null) {
            throw new BadRequestAlertException("A new horarioPreferencialRetirada cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HorarioPreferencialRetirada result = horarioPreferencialRetiradaRepository.save(horarioPreferencialRetirada);
        return ResponseEntity.created(new URI("/api/horario-preferencial-retiradas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /horario-preferencial-retiradas : Updates an existing horarioPreferencialRetirada.
     *
     * @param horarioPreferencialRetirada the horarioPreferencialRetirada to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated horarioPreferencialRetirada,
     * or with status 400 (Bad Request) if the horarioPreferencialRetirada is not valid,
     * or with status 500 (Internal Server Error) if the horarioPreferencialRetirada couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/horario-preferencial-retiradas")
    public ResponseEntity<HorarioPreferencialRetirada> updateHorarioPreferencialRetirada(@Valid @RequestBody HorarioPreferencialRetirada horarioPreferencialRetirada) throws URISyntaxException {
        log.debug("REST request to update HorarioPreferencialRetirada : {}", horarioPreferencialRetirada);
        if (horarioPreferencialRetirada.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HorarioPreferencialRetirada result = horarioPreferencialRetiradaRepository.save(horarioPreferencialRetirada);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, horarioPreferencialRetirada.getId().toString()))
            .body(result);
    }

    /**
     * GET  /horario-preferencial-retiradas : get all the horarioPreferencialRetiradas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of horarioPreferencialRetiradas in body
     */
    @GetMapping("/horario-preferencial-retiradas")
    public List<HorarioPreferencialRetirada> getAllHorarioPreferencialRetiradas() {
        log.debug("REST request to get all HorarioPreferencialRetiradas");
        return horarioPreferencialRetiradaRepository.findAll();
    }

    /**
     * GET  /horario-preferencial-retiradas/:id : get the "id" horarioPreferencialRetirada.
     *
     * @param id the id of the horarioPreferencialRetirada to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the horarioPreferencialRetirada, or with status 404 (Not Found)
     */
    @GetMapping("/horario-preferencial-retiradas/{id}")
    public ResponseEntity<HorarioPreferencialRetirada> getHorarioPreferencialRetirada(@PathVariable Long id) {
        log.debug("REST request to get HorarioPreferencialRetirada : {}", id);
        Optional<HorarioPreferencialRetirada> horarioPreferencialRetirada = horarioPreferencialRetiradaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(horarioPreferencialRetirada);
    }

    /**
     * DELETE  /horario-preferencial-retiradas/:id : delete the "id" horarioPreferencialRetirada.
     *
     * @param id the id of the horarioPreferencialRetirada to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/horario-preferencial-retiradas/{id}")
    public ResponseEntity<Void> deleteHorarioPreferencialRetirada(@PathVariable Long id) {
        log.debug("REST request to delete HorarioPreferencialRetirada : {}", id);
        horarioPreferencialRetiradaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
