package com.coletaseletiva.api.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Retirada.
 */
@Entity
@Table(name = "retirada")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Retirada implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_hora_agendada")
    private Instant dataHoraAgendada;

    @Column(name = "data_hora_realizada")
    private Instant dataHoraRealizada;

    @Column(name = "data_hora_confirmacao")
    private Instant dataHoraConfirmacao;

    @OneToOne(optional = false)    @NotNull

    @JoinColumn(unique = true)
    private SolicitacaoRetirada solicitacaoRetirada;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("retiradas")
    private Coletor coletor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDataHoraAgendada() {
        return dataHoraAgendada;
    }

    public Retirada dataHoraAgendada(Instant dataHoraAgendada) {
        this.dataHoraAgendada = dataHoraAgendada;
        return this;
    }

    public void setDataHoraAgendada(Instant dataHoraAgendada) {
        this.dataHoraAgendada = dataHoraAgendada;
    }

    public Instant getDataHoraRealizada() {
        return dataHoraRealizada;
    }

    public Retirada dataHoraRealizada(Instant dataHoraRealizada) {
        this.dataHoraRealizada = dataHoraRealizada;
        return this;
    }

    public void setDataHoraRealizada(Instant dataHoraRealizada) {
        this.dataHoraRealizada = dataHoraRealizada;
    }

    public Instant getDataHoraConfirmacao() {
        return dataHoraConfirmacao;
    }

    public Retirada dataHoraConfirmacao(Instant dataHoraConfirmacao) {
        this.dataHoraConfirmacao = dataHoraConfirmacao;
        return this;
    }

    public void setDataHoraConfirmacao(Instant dataHoraConfirmacao) {
        this.dataHoraConfirmacao = dataHoraConfirmacao;
    }

    public SolicitacaoRetirada getSolicitacaoRetirada() {
        return solicitacaoRetirada;
    }

    public Retirada solicitacaoRetirada(SolicitacaoRetirada solicitacaoRetirada) {
        this.solicitacaoRetirada = solicitacaoRetirada;
        return this;
    }

    public void setSolicitacaoRetirada(SolicitacaoRetirada solicitacaoRetirada) {
        this.solicitacaoRetirada = solicitacaoRetirada;
    }

    public Coletor getColetor() {
        return coletor;
    }

    public Retirada coletor(Coletor coletor) {
        this.coletor = coletor;
        return this;
    }

    public void setColetor(Coletor coletor) {
        this.coletor = coletor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Retirada retirada = (Retirada) o;
        if (retirada.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), retirada.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Retirada{" +
            "id=" + getId() +
            ", dataHoraAgendada='" + getDataHoraAgendada() + "'" +
            ", dataHoraRealizada='" + getDataHoraRealizada() + "'" +
            ", dataHoraConfirmacao='" + getDataHoraConfirmacao() + "'" +
            "}";
    }
}
