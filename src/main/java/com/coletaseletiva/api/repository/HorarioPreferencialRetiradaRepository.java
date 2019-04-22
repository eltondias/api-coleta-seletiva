package com.coletaseletiva.api.repository;

import com.coletaseletiva.api.domain.HorarioPreferencialRetirada;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HorarioPreferencialRetirada entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HorarioPreferencialRetiradaRepository extends JpaRepository<HorarioPreferencialRetirada, Long> {

}
