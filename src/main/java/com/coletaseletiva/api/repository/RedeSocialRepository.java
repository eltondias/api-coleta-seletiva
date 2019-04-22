package com.coletaseletiva.api.repository;

import com.coletaseletiva.api.domain.RedeSocial;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RedeSocial entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RedeSocialRepository extends JpaRepository<RedeSocial, Long> {

}
