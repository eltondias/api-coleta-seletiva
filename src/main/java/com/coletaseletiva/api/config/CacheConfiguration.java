package com.coletaseletiva.api.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.coletaseletiva.api.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Estado.class.getName(), jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Estado.class.getName() + ".cidades", jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Cidade.class.getName(), jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Cidade.class.getName() + ".enderecos", jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Endereco.class.getName(), jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Participante.class.getName(), jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Participante.class.getName() + ".enderecos", jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Participante.class.getName() + ".telefones", jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Participante.class.getName() + ".emails", jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Participante.class.getName() + ".redeSocials", jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Telefone.class.getName(), jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Email.class.getName(), jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.RedeSocial.class.getName(), jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Usuario.class.getName(), jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Coletor.class.getName(), jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Coletor.class.getName() + ".retiradas", jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Coletor.class.getName() + ".tipoResiduos", jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Produtor.class.getName(), jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Produtor.class.getName() + ".solicitacaoRetiradas", jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.SolicitacaoRetirada.class.getName(), jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.SolicitacaoRetirada.class.getName() + ".horarioPreferencialRetiradas", jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.SolicitacaoRetirada.class.getName() + ".imagems", jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.SolicitacaoRetirada.class.getName() + ".tipoResiduos", jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.TipoResiduo.class.getName(), jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.TipoResiduo.class.getName() + ".solicitacaoRetiradas", jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.TipoResiduo.class.getName() + ".coletors", jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Retirada.class.getName(), jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.HorarioPreferencialRetirada.class.getName(), jcacheConfiguration);
            cm.createCache(com.coletaseletiva.api.domain.Imagem.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
