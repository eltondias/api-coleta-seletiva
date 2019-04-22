package com.coletaseletiva.api.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TipoResiduo.
 */
@Entity
@Table(name = "tipo_residuo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TipoResiduo implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "cor")
    private String cor;

    @Column(name = "icone")
    private String icone;

    @ManyToMany(mappedBy = "tipoResiduos")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<SolicitacaoRetirada> solicitacaoRetiradas = new HashSet<>();

    @ManyToMany(mappedBy = "tipoResiduos")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Coletor> coletors = new HashSet<>();

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

    public TipoResiduo nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public TipoResiduo descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCor() {
        return cor;
    }

    public TipoResiduo cor(String cor) {
        this.cor = cor;
        return this;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public String getIcone() {
        return icone;
    }

    public TipoResiduo icone(String icone) {
        this.icone = icone;
        return this;
    }

    public void setIcone(String icone) {
        this.icone = icone;
    }

    public Set<SolicitacaoRetirada> getSolicitacaoRetiradas() {
        return solicitacaoRetiradas;
    }

    public TipoResiduo solicitacaoRetiradas(Set<SolicitacaoRetirada> solicitacaoRetiradas) {
        this.solicitacaoRetiradas = solicitacaoRetiradas;
        return this;
    }

    public TipoResiduo addSolicitacaoRetirada(SolicitacaoRetirada solicitacaoRetirada) {
        this.solicitacaoRetiradas.add(solicitacaoRetirada);
        solicitacaoRetirada.getTipoResiduos().add(this);
        return this;
    }

    public TipoResiduo removeSolicitacaoRetirada(SolicitacaoRetirada solicitacaoRetirada) {
        this.solicitacaoRetiradas.remove(solicitacaoRetirada);
        solicitacaoRetirada.getTipoResiduos().remove(this);
        return this;
    }

    public void setSolicitacaoRetiradas(Set<SolicitacaoRetirada> solicitacaoRetiradas) {
        this.solicitacaoRetiradas = solicitacaoRetiradas;
    }

    public Set<Coletor> getColetors() {
        return coletors;
    }

    public TipoResiduo coletors(Set<Coletor> coletors) {
        this.coletors = coletors;
        return this;
    }

    public TipoResiduo addColetor(Coletor coletor) {
        this.coletors.add(coletor);
        coletor.getTipoResiduos().add(this);
        return this;
    }

    public TipoResiduo removeColetor(Coletor coletor) {
        this.coletors.remove(coletor);
        coletor.getTipoResiduos().remove(this);
        return this;
    }

    public void setColetors(Set<Coletor> coletors) {
        this.coletors = coletors;
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
        TipoResiduo tipoResiduo = (TipoResiduo) o;
        if (tipoResiduo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoResiduo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoResiduo{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", cor='" + getCor() + "'" +
            ", icone='" + getIcone() + "'" +
            "}";
    }
}
