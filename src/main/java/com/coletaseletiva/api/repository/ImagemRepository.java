package com.coletaseletiva.api.repository;

import com.coletaseletiva.api.domain.Imagem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Imagem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImagemRepository extends JpaRepository<Imagem, Long> {

}
