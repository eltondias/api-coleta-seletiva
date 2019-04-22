package com.coletaseletiva.api.web.rest;
import com.coletaseletiva.api.domain.Participante;
import com.coletaseletiva.api.repository.ParticipanteRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Participante.
 */
@RestController
@RequestMapping("/api")
public class ParticipanteResource {

    private final Logger log = LoggerFactory.getLogger(ParticipanteResource.class);

    private static final String ENTITY_NAME = "participante";

    private final ParticipanteRepository participanteRepository;

    public ParticipanteResource(ParticipanteRepository participanteRepository) {
        this.participanteRepository = participanteRepository;
    }

    /**
     * POST  /participantes : Create a new participante.
     *
     * @param participante the participante to create
     * @return the ResponseEntity with status 201 (Created) and with body the new participante, or with status 400 (Bad Request) if the participante has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/participantes")
    public ResponseEntity<Participante> createParticipante(@Valid @RequestBody Participante participante) throws URISyntaxException {
        log.debug("REST request to save Participante : {}", participante);
        if (participante.getId() != null) {
            throw new BadRequestAlertException("A new participante cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Participante result = participanteRepository.save(participante);
        return ResponseEntity.created(new URI("/api/participantes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /participantes : Updates an existing participante.
     *
     * @param participante the participante to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated participante,
     * or with status 400 (Bad Request) if the participante is not valid,
     * or with status 500 (Internal Server Error) if the participante couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/participantes")
    public ResponseEntity<Participante> updateParticipante(@Valid @RequestBody Participante participante) throws URISyntaxException {
        log.debug("REST request to update Participante : {}", participante);
        if (participante.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Participante result = participanteRepository.save(participante);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, participante.getId().toString()))
            .body(result);
    }

    /**
     * GET  /participantes : get all the participantes.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of participantes in body
     */
    @GetMapping("/participantes")
    public List<Participante> getAllParticipantes(@RequestParam(required = false) String filter) {
        if ("usuario-is-null".equals(filter)) {
            log.debug("REST request to get all Participantes where usuario is null");
            return StreamSupport
                .stream(participanteRepository.findAll().spliterator(), false)
                .filter(participante -> participante.getUsuario() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Participantes");
        return participanteRepository.findAll();
    }

    /**
     * GET  /participantes/:id : get the "id" participante.
     *
     * @param id the id of the participante to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the participante, or with status 404 (Not Found)
     */
    @GetMapping("/participantes/{id}")
    public ResponseEntity<Participante> getParticipante(@PathVariable Long id) {
        log.debug("REST request to get Participante : {}", id);
        Optional<Participante> participante = participanteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(participante);
    }

    /**
     * DELETE  /participantes/:id : delete the "id" participante.
     *
     * @param id the id of the participante to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/participantes/{id}")
    public ResponseEntity<Void> deleteParticipante(@PathVariable Long id) {
        log.debug("REST request to delete Participante : {}", id);
        participanteRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
