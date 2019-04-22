package com.coletaseletiva.api.web.rest;

import com.coletaseletiva.api.ColetaseletivaApp;

import com.coletaseletiva.api.domain.SolicitacaoRetirada;
import com.coletaseletiva.api.domain.TipoResiduo;
import com.coletaseletiva.api.domain.Produtor;
import com.coletaseletiva.api.repository.SolicitacaoRetiradaRepository;
import com.coletaseletiva.api.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;


import static com.coletaseletiva.api.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SolicitacaoRetiradaResource REST controller.
 *
 * @see SolicitacaoRetiradaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ColetaseletivaApp.class)
public class SolicitacaoRetiradaResourceIntTest {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATA_HORA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_HORA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private SolicitacaoRetiradaRepository solicitacaoRetiradaRepository;

    @Mock
    private SolicitacaoRetiradaRepository solicitacaoRetiradaRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSolicitacaoRetiradaMockMvc;

    private SolicitacaoRetirada solicitacaoRetirada;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SolicitacaoRetiradaResource solicitacaoRetiradaResource = new SolicitacaoRetiradaResource(solicitacaoRetiradaRepository);
        this.restSolicitacaoRetiradaMockMvc = MockMvcBuilders.standaloneSetup(solicitacaoRetiradaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SolicitacaoRetirada createEntity(EntityManager em) {
        SolicitacaoRetirada solicitacaoRetirada = new SolicitacaoRetirada()
            .descricao(DEFAULT_DESCRICAO)
            .dataHora(DEFAULT_DATA_HORA);
        // Add required entity
        TipoResiduo tipoResiduo = TipoResiduoResourceIntTest.createEntity(em);
        em.persist(tipoResiduo);
        em.flush();
        solicitacaoRetirada.getTipoResiduos().add(tipoResiduo);
        // Add required entity
        Produtor produtor = ProdutorResourceIntTest.createEntity(em);
        em.persist(produtor);
        em.flush();
        solicitacaoRetirada.setProdutor(produtor);
        return solicitacaoRetirada;
    }

    @Before
    public void initTest() {
        solicitacaoRetirada = createEntity(em);
    }

    @Test
    @Transactional
    public void createSolicitacaoRetirada() throws Exception {
        int databaseSizeBeforeCreate = solicitacaoRetiradaRepository.findAll().size();

        // Create the SolicitacaoRetirada
        restSolicitacaoRetiradaMockMvc.perform(post("/api/solicitacao-retiradas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitacaoRetirada)))
            .andExpect(status().isCreated());

        // Validate the SolicitacaoRetirada in the database
        List<SolicitacaoRetirada> solicitacaoRetiradaList = solicitacaoRetiradaRepository.findAll();
        assertThat(solicitacaoRetiradaList).hasSize(databaseSizeBeforeCreate + 1);
        SolicitacaoRetirada testSolicitacaoRetirada = solicitacaoRetiradaList.get(solicitacaoRetiradaList.size() - 1);
        assertThat(testSolicitacaoRetirada.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testSolicitacaoRetirada.getDataHora()).isEqualTo(DEFAULT_DATA_HORA);
    }

    @Test
    @Transactional
    public void createSolicitacaoRetiradaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = solicitacaoRetiradaRepository.findAll().size();

        // Create the SolicitacaoRetirada with an existing ID
        solicitacaoRetirada.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSolicitacaoRetiradaMockMvc.perform(post("/api/solicitacao-retiradas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitacaoRetirada)))
            .andExpect(status().isBadRequest());

        // Validate the SolicitacaoRetirada in the database
        List<SolicitacaoRetirada> solicitacaoRetiradaList = solicitacaoRetiradaRepository.findAll();
        assertThat(solicitacaoRetiradaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSolicitacaoRetiradas() throws Exception {
        // Initialize the database
        solicitacaoRetiradaRepository.saveAndFlush(solicitacaoRetirada);

        // Get all the solicitacaoRetiradaList
        restSolicitacaoRetiradaMockMvc.perform(get("/api/solicitacao-retiradas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(solicitacaoRetirada.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].dataHora").value(hasItem(DEFAULT_DATA_HORA.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllSolicitacaoRetiradasWithEagerRelationshipsIsEnabled() throws Exception {
        SolicitacaoRetiradaResource solicitacaoRetiradaResource = new SolicitacaoRetiradaResource(solicitacaoRetiradaRepositoryMock);
        when(solicitacaoRetiradaRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restSolicitacaoRetiradaMockMvc = MockMvcBuilders.standaloneSetup(solicitacaoRetiradaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restSolicitacaoRetiradaMockMvc.perform(get("/api/solicitacao-retiradas?eagerload=true"))
        .andExpect(status().isOk());

        verify(solicitacaoRetiradaRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllSolicitacaoRetiradasWithEagerRelationshipsIsNotEnabled() throws Exception {
        SolicitacaoRetiradaResource solicitacaoRetiradaResource = new SolicitacaoRetiradaResource(solicitacaoRetiradaRepositoryMock);
            when(solicitacaoRetiradaRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restSolicitacaoRetiradaMockMvc = MockMvcBuilders.standaloneSetup(solicitacaoRetiradaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restSolicitacaoRetiradaMockMvc.perform(get("/api/solicitacao-retiradas?eagerload=true"))
        .andExpect(status().isOk());

            verify(solicitacaoRetiradaRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getSolicitacaoRetirada() throws Exception {
        // Initialize the database
        solicitacaoRetiradaRepository.saveAndFlush(solicitacaoRetirada);

        // Get the solicitacaoRetirada
        restSolicitacaoRetiradaMockMvc.perform(get("/api/solicitacao-retiradas/{id}", solicitacaoRetirada.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(solicitacaoRetirada.getId().intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()))
            .andExpect(jsonPath("$.dataHora").value(DEFAULT_DATA_HORA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSolicitacaoRetirada() throws Exception {
        // Get the solicitacaoRetirada
        restSolicitacaoRetiradaMockMvc.perform(get("/api/solicitacao-retiradas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSolicitacaoRetirada() throws Exception {
        // Initialize the database
        solicitacaoRetiradaRepository.saveAndFlush(solicitacaoRetirada);

        int databaseSizeBeforeUpdate = solicitacaoRetiradaRepository.findAll().size();

        // Update the solicitacaoRetirada
        SolicitacaoRetirada updatedSolicitacaoRetirada = solicitacaoRetiradaRepository.findById(solicitacaoRetirada.getId()).get();
        // Disconnect from session so that the updates on updatedSolicitacaoRetirada are not directly saved in db
        em.detach(updatedSolicitacaoRetirada);
        updatedSolicitacaoRetirada
            .descricao(UPDATED_DESCRICAO)
            .dataHora(UPDATED_DATA_HORA);

        restSolicitacaoRetiradaMockMvc.perform(put("/api/solicitacao-retiradas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSolicitacaoRetirada)))
            .andExpect(status().isOk());

        // Validate the SolicitacaoRetirada in the database
        List<SolicitacaoRetirada> solicitacaoRetiradaList = solicitacaoRetiradaRepository.findAll();
        assertThat(solicitacaoRetiradaList).hasSize(databaseSizeBeforeUpdate);
        SolicitacaoRetirada testSolicitacaoRetirada = solicitacaoRetiradaList.get(solicitacaoRetiradaList.size() - 1);
        assertThat(testSolicitacaoRetirada.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testSolicitacaoRetirada.getDataHora()).isEqualTo(UPDATED_DATA_HORA);
    }

    @Test
    @Transactional
    public void updateNonExistingSolicitacaoRetirada() throws Exception {
        int databaseSizeBeforeUpdate = solicitacaoRetiradaRepository.findAll().size();

        // Create the SolicitacaoRetirada

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSolicitacaoRetiradaMockMvc.perform(put("/api/solicitacao-retiradas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitacaoRetirada)))
            .andExpect(status().isBadRequest());

        // Validate the SolicitacaoRetirada in the database
        List<SolicitacaoRetirada> solicitacaoRetiradaList = solicitacaoRetiradaRepository.findAll();
        assertThat(solicitacaoRetiradaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSolicitacaoRetirada() throws Exception {
        // Initialize the database
        solicitacaoRetiradaRepository.saveAndFlush(solicitacaoRetirada);

        int databaseSizeBeforeDelete = solicitacaoRetiradaRepository.findAll().size();

        // Delete the solicitacaoRetirada
        restSolicitacaoRetiradaMockMvc.perform(delete("/api/solicitacao-retiradas/{id}", solicitacaoRetirada.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SolicitacaoRetirada> solicitacaoRetiradaList = solicitacaoRetiradaRepository.findAll();
        assertThat(solicitacaoRetiradaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SolicitacaoRetirada.class);
        SolicitacaoRetirada solicitacaoRetirada1 = new SolicitacaoRetirada();
        solicitacaoRetirada1.setId(1L);
        SolicitacaoRetirada solicitacaoRetirada2 = new SolicitacaoRetirada();
        solicitacaoRetirada2.setId(solicitacaoRetirada1.getId());
        assertThat(solicitacaoRetirada1).isEqualTo(solicitacaoRetirada2);
        solicitacaoRetirada2.setId(2L);
        assertThat(solicitacaoRetirada1).isNotEqualTo(solicitacaoRetirada2);
        solicitacaoRetirada1.setId(null);
        assertThat(solicitacaoRetirada1).isNotEqualTo(solicitacaoRetirada2);
    }
}
