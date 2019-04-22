package com.coletaseletiva.api.repository;

import com.coletaseletiva.api.domain.Retirada;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Retirada entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RetiradaRepository extends JpaRepository<Retirada, Long> {

}
