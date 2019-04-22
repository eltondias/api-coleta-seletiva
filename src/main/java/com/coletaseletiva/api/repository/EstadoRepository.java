package com.coletaseletiva.api.repository;

import com.coletaseletiva.api.domain.Estado;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Estado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoRepository extends JpaRepository<Estado, Long> {

}
