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

import com.coletaseletiva.api.domain.enumeration.TipoColetor;

/**
 * A Coletor.
 */
@Entity
@Table(name = "coletor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Coletor implements Serializable {

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
    private TipoColetor tipo;

    @OneToOne(optional = false)    @NotNull

    @JoinColumn(unique = true)
    private Participante participante;

    @OneToMany(mappedBy = "coletor")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Retirada> retiradas = new HashSet<>();
    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @NotNull
    @JoinTable(name = "coletor_tipo_residuo",
               joinColumns = @JoinColumn(name = "coletor_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tipo_residuo_id", referencedColumnName = "id"))
    private Set<TipoResiduo> tipoResiduos = new HashSet<>();

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

    public Coletor nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Instant getDataCadastro() {
        return dataCadastro;
    }

    public Coletor dataCadastro(Instant dataCadastro) {
        this.dataCadastro = dataCadastro;
        return this;
    }

    public void setDataCadastro(Instant dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public TipoColetor getTipo() {
        return tipo;
    }

    public Coletor tipo(TipoColetor tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoColetor tipo) {
        this.tipo = tipo;
    }

    public Participante getParticipante() {
        return participante;
    }

    public Coletor participante(Participante participante) {
        this.participante = participante;
        return this;
    }

    public void setParticipante(Participante participante) {
        this.participante = participante;
    }

    public Set<Retirada> getRetiradas() {
        return retiradas;
    }

    public Coletor retiradas(Set<Retirada> retiradas) {
        this.retiradas = retiradas;
        return this;
    }

    public Coletor addRetirada(Retirada retirada) {
        this.retiradas.add(retirada);
        retirada.setColetor(this);
        return this;
    }

    public Coletor removeRetirada(Retirada retirada) {
        this.retiradas.remove(retirada);
        retirada.setColetor(null);
        return this;
    }

    public void setRetiradas(Set<Retirada> retiradas) {
        this.retiradas = retiradas;
    }

    public Set<TipoResiduo> getTipoResiduos() {
        return tipoResiduos;
    }

    public Coletor tipoResiduos(Set<TipoResiduo> tipoResiduos) {
        this.tipoResiduos = tipoResiduos;
        return this;
    }

    public Coletor addTipoResiduo(TipoResiduo tipoResiduo) {
        this.tipoResiduos.add(tipoResiduo);
        tipoResiduo.getColetors().add(this);
        return this;
    }

    public Coletor removeTipoResiduo(TipoResiduo tipoResiduo) {
        this.tipoResiduos.remove(tipoResiduo);
        tipoResiduo.getColetors().remove(this);
        return this;
    }

    public void setTipoResiduos(Set<TipoResiduo> tipoResiduos) {
        this.tipoResiduos = tipoResiduos;
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
        Coletor coletor = (Coletor) o;
        if (coletor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), coletor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Coletor{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", dataCadastro='" + getDataCadastro() + "'" +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
