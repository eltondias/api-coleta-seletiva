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
 * A HorarioPreferencialRetirada.
 */
@Entity
@Table(name = "horario_preferencial_retirada")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HorarioPreferencialRetirada implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_hora")
    private Instant dataHora;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("horarioPreferencialRetiradas")
    private SolicitacaoRetirada solicitacaoRetirada;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDataHora() {
        return dataHora;
    }

    public HorarioPreferencialRetirada dataHora(Instant dataHora) {
        this.dataHora = dataHora;
        return this;
    }

    public void setDataHora(Instant dataHora) {
        this.dataHora = dataHora;
    }

    public SolicitacaoRetirada getSolicitacaoRetirada() {
        return solicitacaoRetirada;
    }

    public HorarioPreferencialRetirada solicitacaoRetirada(SolicitacaoRetirada solicitacaoRetirada) {
        this.solicitacaoRetirada = solicitacaoRetirada;
        return this;
    }

    public void setSolicitacaoRetirada(SolicitacaoRetirada solicitacaoRetirada) {
        this.solicitacaoRetirada = solicitacaoRetirada;
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
        HorarioPreferencialRetirada horarioPreferencialRetirada = (HorarioPreferencialRetirada) o;
        if (horarioPreferencialRetirada.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), horarioPreferencialRetirada.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HorarioPreferencialRetirada{" +
            "id=" + getId() +
            ", dataHora='" + getDataHora() + "'" +
            "}";
    }
}
