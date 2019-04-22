package com.coletaseletiva.api.web.rest;

import com.coletaseletiva.api.ColetaseletivaApp;

import com.coletaseletiva.api.domain.Retirada;
import com.coletaseletiva.api.domain.SolicitacaoRetirada;
import com.coletaseletiva.api.domain.Coletor;
import com.coletaseletiva.api.repository.RetiradaRepository;
import com.coletaseletiva.api.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
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
import java.util.List;


import static com.coletaseletiva.api.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RetiradaResource REST controller.
 *
 * @see RetiradaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ColetaseletivaApp.class)
public class RetiradaResourceIntTest {

    private static final Instant DEFAULT_DATA_HORA_AGENDADA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_HORA_AGENDADA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATA_HORA_REALIZADA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_HORA_REALIZADA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATA_HORA_CONFIRMACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_HORA_CONFIRMACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private RetiradaRepository retiradaRepository;

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

    private MockMvc restRetiradaMockMvc;

    private Retirada retirada;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RetiradaResource retiradaResource = new RetiradaResource(retiradaRepository);
        this.restRetiradaMockMvc = MockMvcBuilders.standaloneSetup(retiradaResource)
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
    public static Retirada createEntity(EntityManager em) {
        Retirada retirada = new Retirada()
            .dataHoraAgendada(DEFAULT_DATA_HORA_AGENDADA)
            .dataHoraRealizada(DEFAULT_DATA_HORA_REALIZADA)
            .dataHoraConfirmacao(DEFAULT_DATA_HORA_CONFIRMACAO);
        // Add required entity
        SolicitacaoRetirada solicitacaoRetirada = SolicitacaoRetiradaResourceIntTest.createEntity(em);
        em.persist(solicitacaoRetirada);
        em.flush();
        retirada.setSolicitacaoRetirada(solicitacaoRetirada);
        // Add required entity
        Coletor coletor = ColetorResourceIntTest.createEntity(em);
        em.persist(coletor);
        em.flush();
        retirada.setColetor(coletor);
        return retirada;
    }

    @Before
    public void initTest() {
        retirada = createEntity(em);
    }

    @Test
    @Transactional
    public void createRetirada() throws Exception {
        int databaseSizeBeforeCreate = retiradaRepository.findAll().size();

        // Create the Retirada
        restRetiradaMockMvc.perform(post("/api/retiradas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(retirada)))
            .andExpect(status().isCreated());

        // Validate the Retirada in the database
        List<Retirada> retiradaList = retiradaRepository.findAll();
        assertThat(retiradaList).hasSize(databaseSizeBeforeCreate + 1);
        Retirada testRetirada = retiradaList.get(retiradaList.size() - 1);
        assertThat(testRetirada.getDataHoraAgendada()).isEqualTo(DEFAULT_DATA_HORA_AGENDADA);
        assertThat(testRetirada.getDataHoraRealizada()).isEqualTo(DEFAULT_DATA_HORA_REALIZADA);
        assertThat(testRetirada.getDataHoraConfirmacao()).isEqualTo(DEFAULT_DATA_HORA_CONFIRMACAO);
    }

    @Test
    @Transactional
    public void createRetiradaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = retiradaRepository.findAll().size();

        // Create the Retirada with an existing ID
        retirada.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRetiradaMockMvc.perform(post("/api/retiradas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(retirada)))
            .andExpect(status().isBadRequest());

        // Validate the Retirada in the database
        List<Retirada> retiradaList = retiradaRepository.findAll();
        assertThat(retiradaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRetiradas() throws Exception {
        // Initialize the database
        retiradaRepository.saveAndFlush(retirada);

        // Get all the retiradaList
        restRetiradaMockMvc.perform(get("/api/retiradas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(retirada.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataHoraAgendada").value(hasItem(DEFAULT_DATA_HORA_AGENDADA.toString())))
            .andExpect(jsonPath("$.[*].dataHoraRealizada").value(hasItem(DEFAULT_DATA_HORA_REALIZADA.toString())))
            .andExpect(jsonPath("$.[*].dataHoraConfirmacao").value(hasItem(DEFAULT_DATA_HORA_CONFIRMACAO.toString())));
    }
    
    @Test
    @Transactional
    public void getRetirada() throws Exception {
        // Initialize the database
        retiradaRepository.saveAndFlush(retirada);

        // Get the retirada
        restRetiradaMockMvc.perform(get("/api/retiradas/{id}", retirada.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(retirada.getId().intValue()))
            .andExpect(jsonPath("$.dataHoraAgendada").value(DEFAULT_DATA_HORA_AGENDADA.toString()))
            .andExpect(jsonPath("$.dataHoraRealizada").value(DEFAULT_DATA_HORA_REALIZADA.toString()))
            .andExpect(jsonPath("$.dataHoraConfirmacao").value(DEFAULT_DATA_HORA_CONFIRMACAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRetirada() throws Exception {
        // Get the retirada
        restRetiradaMockMvc.perform(get("/api/retiradas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRetirada() throws Exception {
        // Initialize the database
        retiradaRepository.saveAndFlush(retirada);

        int databaseSizeBeforeUpdate = retiradaRepository.findAll().size();

        // Update the retirada
        Retirada updatedRetirada = retiradaRepository.findById(retirada.getId()).get();
        // Disconnect from session so that the updates on updatedRetirada are not directly saved in db
        em.detach(updatedRetirada);
        updatedRetirada
            .dataHoraAgendada(UPDATED_DATA_HORA_AGENDADA)
            .dataHoraRealizada(UPDATED_DATA_HORA_REALIZADA)
            .dataHoraConfirmacao(UPDATED_DATA_HORA_CONFIRMACAO);

        restRetiradaMockMvc.perform(put("/api/retiradas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRetirada)))
            .andExpect(status().isOk());

        // Validate the Retirada in the database
        List<Retirada> retiradaList = retiradaRepository.findAll();
        assertThat(retiradaList).hasSize(databaseSizeBeforeUpdate);
        Retirada testRetirada = retiradaList.get(retiradaList.size() - 1);
        assertThat(testRetirada.getDataHoraAgendada()).isEqualTo(UPDATED_DATA_HORA_AGENDADA);
        assertThat(testRetirada.getDataHoraRealizada()).isEqualTo(UPDATED_DATA_HORA_REALIZADA);
        assertThat(testRetirada.getDataHoraConfirmacao()).isEqualTo(UPDATED_DATA_HORA_CONFIRMACAO);
    }

    @Test
    @Transactional
    public void updateNonExistingRetirada() throws Exception {
        int databaseSizeBeforeUpdate = retiradaRepository.findAll().size();

        // Create the Retirada

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRetiradaMockMvc.perform(put("/api/retiradas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(retirada)))
            .andExpect(status().isBadRequest());

        // Validate the Retirada in the database
        List<Retirada> retiradaList = retiradaRepository.findAll();
        assertThat(retiradaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRetirada() throws Exception {
        // Initialize the database
        retiradaRepository.saveAndFlush(retirada);

        int databaseSizeBeforeDelete = retiradaRepository.findAll().size();

        // Delete the retirada
        restRetiradaMockMvc.perform(delete("/api/retiradas/{id}", retirada.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Retirada> retiradaList = retiradaRepository.findAll();
        assertThat(retiradaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Retirada.class);
        Retirada retirada1 = new Retirada();
        retirada1.setId(1L);
        Retirada retirada2 = new Retirada();
        retirada2.setId(retirada1.getId());
        assertThat(retirada1).isEqualTo(retirada2);
        retirada2.setId(2L);
        assertThat(retirada1).isNotEqualTo(retirada2);
        retirada1.setId(null);
        assertThat(retirada1).isNotEqualTo(retirada2);
    }
}
