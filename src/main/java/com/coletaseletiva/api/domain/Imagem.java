package com.coletaseletiva.api.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Imagem.
 */
@Entity
@Table(name = "imagem")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Imagem implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "url")
    private String url;

    @Column(name = "descricao")
    private String descricao;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("imagems")
    private SolicitacaoRetirada solicitacaoRetirada;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public Imagem url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescricao() {
        return descricao;
    }

    public Imagem descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public SolicitacaoRetirada getSolicitacaoRetirada() {
        return solicitacaoRetirada;
    }

    public Imagem solicitacaoRetirada(SolicitacaoRetirada solicitacaoRetirada) {
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
        Imagem imagem = (Imagem) o;
        if (imagem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), imagem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Imagem{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
