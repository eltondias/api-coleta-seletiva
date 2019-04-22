package com.coletaseletiva.api.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A SolicitacaoRetirada.
 */
@Entity
@Table(name = "solicitacao_retirada")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SolicitacaoRetirada implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "data_hora")
    private Instant dataHora;

    @OneToMany(mappedBy = "solicitacaoRetirada")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<HorarioPreferencialRetirada> horarioPreferencialRetiradas = new HashSet<>();
    @OneToMany(mappedBy = "solicitacaoRetirada")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Imagem> imagems = new HashSet<>();
    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @NotNull
    @JoinTable(name = "solicitacao_retirada_tipo_residuo",
               joinColumns = @JoinColumn(name = "solicitacao_retirada_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tipo_residuo_id", referencedColumnName = "id"))
    private Set<TipoResiduo> tipoResiduos = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("solicitacaoRetiradas")
    private Produtor produtor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public SolicitacaoRetirada descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Instant getDataHora() {
        return dataHora;
    }

    public SolicitacaoRetirada dataHora(Instant dataHora) {
        this.dataHora = dataHora;
        return this;
    }

    public void setDataHora(Instant dataHora) {
        this.dataHora = dataHora;
    }

    public Set<HorarioPreferencialRetirada> getHorarioPreferencialRetiradas() {
        return horarioPreferencialRetiradas;
    }

    public SolicitacaoRetirada horarioPreferencialRetiradas(Set<HorarioPreferencialRetirada> horarioPreferencialRetiradas) {
        this.horarioPreferencialRetiradas = horarioPreferencialRetiradas;
        return this;
    }

    public SolicitacaoRetirada addHorarioPreferencialRetirada(HorarioPreferencialRetirada horarioPreferencialRetirada) {
        this.horarioPreferencialRetiradas.add(horarioPreferencialRetirada);
        horarioPreferencialRetirada.setSolicitacaoRetirada(this);
        return this;
    }

    public SolicitacaoRetirada removeHorarioPreferencialRetirada(HorarioPreferencialRetirada horarioPreferencialRetirada) {
        this.horarioPreferencialRetiradas.remove(horarioPreferencialRetirada);
        horarioPreferencialRetirada.setSolicitacaoRetirada(null);
        return this;
    }

    public void setHorarioPreferencialRetiradas(Set<HorarioPreferencialRetirada> horarioPreferencialRetiradas) {
        this.horarioPreferencialRetiradas = horarioPreferencialRetiradas;
    }

    public Set<Imagem> getImagems() {
        return imagems;
    }

    public SolicitacaoRetirada imagems(Set<Imagem> imagems) {
        this.imagems = imagems;
        return this;
    }

    public SolicitacaoRetirada addImagem(Imagem imagem) {
        this.imagems.add(imagem);
        imagem.setSolicitacaoRetirada(this);
        return this;
    }

    public SolicitacaoRetirada removeImagem(Imagem imagem) {
        this.imagems.remove(imagem);
        imagem.setSolicitacaoRetirada(null);
        return this;
    }

    public void setImagems(Set<Imagem> imagems) {
        this.imagems = imagems;
    }

    public Set<TipoResiduo> getTipoResiduos() {
        return tipoResiduos;
    }

    public SolicitacaoRetirada tipoResiduos(Set<TipoResiduo> tipoResiduos) {
        this.tipoResiduos = tipoResiduos;
        return this;
    }

    public SolicitacaoRetirada addTipoResiduo(TipoResiduo tipoResiduo) {
        this.tipoResiduos.add(tipoResiduo);
        tipoResiduo.getSolicitacaoRetiradas().add(this);
        return this;
    }

    public SolicitacaoRetirada removeTipoResiduo(TipoResiduo tipoResiduo) {
        this.tipoResiduos.remove(tipoResiduo);
        tipoResiduo.getSolicitacaoRetiradas().remove(this);
        return this;
    }

    public void setTipoResiduos(Set<TipoResiduo> tipoResiduos) {
        this.tipoResiduos = tipoResiduos;
    }

    public Produtor getProdutor() {
        return produtor;
    }

    public SolicitacaoRetirada produtor(Produtor produtor) {
        this.produtor = produtor;
        return this;
    }

    public void setProdutor(Produtor produtor) {
        this.produtor = produtor;
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
        SolicitacaoRetirada solicitacaoRetirada = (SolicitacaoRetirada) o;
        if (solicitacaoRetirada.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), solicitacaoRetirada.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SolicitacaoRetirada{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", dataHora='" + getDataHora() + "'" +
            "}";
    }
}
