package com.coletaseletiva.api.repository;

import com.coletaseletiva.api.domain.Participante;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Participante entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParticipanteRepository extends JpaRepository<Participante, Long> {

}
