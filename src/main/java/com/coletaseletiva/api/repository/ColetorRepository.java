package com.coletaseletiva.api.repository;

import com.coletaseletiva.api.domain.Coletor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Coletor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ColetorRepository extends JpaRepository<Coletor, Long> {

    @Query(value = "select distinct coletor from Coletor coletor left join fetch coletor.tipoResiduos",
        countQuery = "select count(distinct coletor) from Coletor coletor")
    Page<Coletor> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct coletor from Coletor coletor left join fetch coletor.tipoResiduos")
    List<Coletor> findAllWithEagerRelationships();

    @Query("select coletor from Coletor coletor left join fetch coletor.tipoResiduos where coletor.id =:id")
    Optional<Coletor> findOneWithEagerRelationships(@Param("id") Long id);

}
