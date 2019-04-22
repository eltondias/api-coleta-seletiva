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

import com.coletaseletiva.api.domain.enumeration.EstadoParticipante;

/**
 * A Participante.
 */
@Entity
@Table(name = "participante")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Participante implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "url_foto_perfil")
    private String urlFotoPerfil;

    @NotNull
    @Column(name = "cpf_cnpj", nullable = false)
    private String cpfCnpj;

    @Column(name = "data_cadastro")
    private Instant dataCadastro;

    @Column(name = "ranking")
    private Integer ranking;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private EstadoParticipante estado;

    @OneToMany(mappedBy = "participante")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Endereco> enderecos = new HashSet<>();
    @OneToMany(mappedBy = "participante")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Telefone> telefones = new HashSet<>();
    @OneToMany(mappedBy = "participante")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Email> emails = new HashSet<>();
    @OneToMany(mappedBy = "participante")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RedeSocial> redeSocials = new HashSet<>();
    @OneToOne(mappedBy = "participante")
    @JsonIgnore
    private Usuario usuario;

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

    public Participante nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getUrlFotoPerfil() {
        return urlFotoPerfil;
    }

    public Participante urlFotoPerfil(String urlFotoPerfil) {
        this.urlFotoPerfil = urlFotoPerfil;
        return this;
    }

    public void setUrlFotoPerfil(String urlFotoPerfil) {
        this.urlFotoPerfil = urlFotoPerfil;
    }

    public String getCpfCnpj() {
        return cpfCnpj;
    }

    public Participante cpfCnpj(String cpfCnpj) {
        this.cpfCnpj = cpfCnpj;
        return this;
    }

    public void setCpfCnpj(String cpfCnpj) {
        this.cpfCnpj = cpfCnpj;
    }

    public Instant getDataCadastro() {
        return dataCadastro;
    }

    public Participante dataCadastro(Instant dataCadastro) {
        this.dataCadastro = dataCadastro;
        return this;
    }

    public void setDataCadastro(Instant dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public Integer getRanking() {
        return ranking;
    }

    public Participante ranking(Integer ranking) {
        this.ranking = ranking;
        return this;
    }

    public void setRanking(Integer ranking) {
        this.ranking = ranking;
    }

    public EstadoParticipante getEstado() {
        return estado;
    }

    public Participante estado(EstadoParticipante estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(EstadoParticipante estado) {
        this.estado = estado;
    }

    public Set<Endereco> getEnderecos() {
        return enderecos;
    }

    public Participante enderecos(Set<Endereco> enderecos) {
        this.enderecos = enderecos;
        return this;
    }

    public Participante addEndereco(Endereco endereco) {
        this.enderecos.add(endereco);
        endereco.setParticipante(this);
        return this;
    }

    public Participante removeEndereco(Endereco endereco) {
        this.enderecos.remove(endereco);
        endereco.setParticipante(null);
        return this;
    }

    public void setEnderecos(Set<Endereco> enderecos) {
        this.enderecos = enderecos;
    }

    public Set<Telefone> getTelefones() {
        return telefones;
    }

    public Participante telefones(Set<Telefone> telefones) {
        this.telefones = telefones;
        return this;
    }

    public Participante addTelefone(Telefone telefone) {
        this.telefones.add(telefone);
        telefone.setParticipante(this);
        return this;
    }

    public Participante removeTelefone(Telefone telefone) {
        this.telefones.remove(telefone);
        telefone.setParticipante(null);
        return this;
    }

    public void setTelefones(Set<Telefone> telefones) {
        this.telefones = telefones;
    }

    public Set<Email> getEmails() {
        return emails;
    }

    public Participante emails(Set<Email> emails) {
        this.emails = emails;
        return this;
    }

    public Participante addEmail(Email email) {
        this.emails.add(email);
        email.setParticipante(this);
        return this;
    }

    public Participante removeEmail(Email email) {
        this.emails.remove(email);
        email.setParticipante(null);
        return this;
    }

    public void setEmails(Set<Email> emails) {
        this.emails = emails;
    }

    public Set<RedeSocial> getRedeSocials() {
        return redeSocials;
    }

    public Participante redeSocials(Set<RedeSocial> redeSocials) {
        this.redeSocials = redeSocials;
        return this;
    }

    public Participante addRedeSocial(RedeSocial redeSocial) {
        this.redeSocials.add(redeSocial);
        redeSocial.setParticipante(this);
        return this;
    }

    public Participante removeRedeSocial(RedeSocial redeSocial) {
        this.redeSocials.remove(redeSocial);
        redeSocial.setParticipante(null);
        return this;
    }

    public void setRedeSocials(Set<RedeSocial> redeSocials) {
        this.redeSocials = redeSocials;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Participante usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
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
        Participante participante = (Participante) o;
        if (participante.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), participante.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Participante{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", urlFotoPerfil='" + getUrlFotoPerfil() + "'" +
            ", cpfCnpj='" + getCpfCnpj() + "'" +
            ", dataCadastro='" + getDataCadastro() + "'" +
            ", ranking=" + getRanking() +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
