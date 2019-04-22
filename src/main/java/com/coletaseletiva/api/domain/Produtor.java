package com.coletaseletiva.api.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.coletaseletiva.api.domain.enumeration.TipoProdutor;

/**
 * A Produtor.
 */
@Entity
@Table(name = "produtor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Produtor implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "data_cadastro")
    private Instant dataCadastro;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private TipoProdutor tipo;

    @OneToOne(optional = false)    @NotNull

    @JoinColumn(unique = true)
    private Participante participante;

    @OneToMany(mappedBy = "produtor")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SolicitacaoRetirada> solicitacaoRetiradas = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Produtor nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Instant getDataCadastro() {
        return dataCadastro;
    }

    public Produtor dataCadastro(Instant dataCadastro) {
        this.dataCadastro = dataCadastro;
        return this;
    }

    public void setDataCadastro(Instant dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public TipoProdutor getTipo() {
        return tipo;
    }

    public Produtor tipo(TipoProdutor tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoProdutor tipo) {
        this.tipo = tipo;
    }

    public Participante getParticipante() {
        return participante;
    }

    public Produtor participante(Participante participante) {
        this.participante = participante;
        return this;
    }

    public void setParticipante(Participante participante) {
        this.participante = participante;
    }

    public Set<SolicitacaoRetirada> getSolicitacaoRetiradas() {
        return solicitacaoRetiradas;
    }

    public Produtor solicitacaoRetiradas(Set<SolicitacaoRetirada> solicitacaoRetiradas) {
        this.solicitacaoRetiradas = solicitacaoRetiradas;
        return this;
    }

    public Produtor addSolicitacaoRetirada(SolicitacaoRetirada solicitacaoRetirada) {
        this.solicitacaoRetiradas.add(solicitacaoRetirada);
        solicitacaoRetirada.setProdutor(this);
        return this;
    }

    public Produtor removeSolicitacaoRetirada(SolicitacaoRetirada solicitacaoRetirada) {
        this.solicitacaoRetiradas.remove(solicitacaoRetirada);
        solicitacaoRetirada.setProdutor(null);
        return this;
    }

    public void setSolicitacaoRetiradas(Set<SolicitacaoRetirada> solicitacaoRetiradas) {
        this.solicitacaoRetiradas = solicitacaoRetiradas;
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
        Produtor produtor = (Produtor) o;
        if (produtor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), produtor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Produtor{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", dataCadastro='" + getDataCadastro() + "'" +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
