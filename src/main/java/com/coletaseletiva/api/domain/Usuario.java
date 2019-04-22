package com.coletaseletiva.api.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Usuario.
 */
@Entity
@Table(name = "usuario")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "login")
    private String login;

    @Column(name = "senha")
    private String senha;

    @Column(name = "data_cadastro")
    private Instant dataCadastro;

    @OneToOne(optional = false)    @NotNull

    @JoinColumn(unique = true)
    private Participante participante;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public Usuario login(String login) {
        this.login = login;
        return this;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public Usuario senha(String senha) {
        this.senha = senha;
        return this;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Instant getDataCadastro() {
        return dataCadastro;
    }

    public Usuario dataCadastro(Instant dataCadastro) {
        this.dataCadastro = dataCadastro;
        return this;
    }

    public void setDataCadastro(Instant dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public Participante getParticipante() {
        return participante;
    }

    public Usuario participante(Participante participante) {
        this.participante = participante;
        return this;
    }

    public void setParticipante(Participante participante) {
        this.participante = participante;
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
        Usuario usuario = (Usuario) o;
        if (usuario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), usuario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Usuario{" +
            "id=" + getId() +
            ", login='" + getLogin() + "'" +
            ", senha='" + getSenha() + "'" +
            ", dataCadastro='" + getDataCadastro() + "'" +
            "}";
    }
}
