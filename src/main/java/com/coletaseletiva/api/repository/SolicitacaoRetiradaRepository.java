package com.coletaseletiva.api.repository;

import com.coletaseletiva.api.domain.SolicitacaoRetirada;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the SolicitacaoRetirada entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SolicitacaoRetiradaRepository extends JpaRepository<SolicitacaoRetirada, Long> {

    @Query(value = "select distinct solicitacao_retirada from SolicitacaoRetirada solicitacao_retirada left join fetch solicitacao_retirada.tipoResiduos",
        countQuery = "select count(distinct solicitacao_retirada) from SolicitacaoRetirada solicitacao_retirada")
    Page<SolicitacaoRetirada> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct solicitacao_retirada from SolicitacaoRetirada solicitacao_retirada left join fetch solicitacao_retirada.tipoResiduos")
    List<SolicitacaoRetirada> findAllWithEagerRelationships();

    @Query("select solicitacao_retirada from SolicitacaoRetirada solicitacao_retirada left join fetch solicitacao_retirada.tipoResiduos where solicitacao_retirada.id =:id")
    Optional<SolicitacaoRetirada> findOneWithEagerRelationships(@Param("id") Long id);

}
