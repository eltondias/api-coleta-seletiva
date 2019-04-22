package com.coletaseletiva.api.repository;

import com.coletaseletiva.api.domain.Produtor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Produtor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProdutorRepository extends JpaRepository<Produtor, Long> {

}
