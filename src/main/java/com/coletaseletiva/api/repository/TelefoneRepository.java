package com.coletaseletiva.api.repository;

import com.coletaseletiva.api.domain.Telefone;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Telefone entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TelefoneRepository extends JpaRepository<Telefone, Long> {

}
