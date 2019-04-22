package com.coletaseletiva.api.web.rest;

import com.coletaseletiva.api.ColetaseletivaApp;

import com.coletaseletiva.api.domain.HorarioPreferencialRetirada;
import com.coletaseletiva.api.domain.SolicitacaoRetirada;
import com.coletaseletiva.api.repository.HorarioPreferencialRetiradaRepository;
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
 * Test class for the HorarioPreferencialRetiradaResource REST controller.
 *
 * @see HorarioPreferencialRetiradaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ColetaseletivaApp.class)
public class HorarioPreferencialRetiradaResourceIntTest {

    private static final Instant DEFAULT_DATA_HORA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_HORA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private HorarioPreferencialRetiradaRepository horarioPreferencialRetiradaRepository;

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

    private MockMvc restHorarioPreferencialRetiradaMockMvc;

    private HorarioPreferencialRetirada horarioPreferencialRetirada;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HorarioPreferencialRetiradaResource horarioPreferencialRetiradaResource = new HorarioPreferencialRetiradaResource(horarioPreferencialRetiradaRepository);
        this.restHorarioPreferencialRetiradaMockMvc = MockMvcBuilders.standaloneSetup(horarioPreferencialRetiradaResource)
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
    public static HorarioPreferencialRetirada createEntity(EntityManager em) {
        HorarioPreferencialRetirada horarioPreferencialRetirada = new HorarioPreferencialRetirada()
            .dataHora(DEFAULT_DATA_HORA);
        // Add required entity
        SolicitacaoRetirada solicitacaoRetirada = SolicitacaoRetiradaResourceIntTest.createEntity(em);
        em.persist(solicitacaoRetirada);
        em.flush();
        horarioPreferencialRetirada.setSolicitacaoRetirada(solicitacaoRetirada);
        return horarioPreferencialRetirada;
    }

    @Before
    public void initTest() {
        horarioPreferencialRetirada = createEntity(em);
    }

    @Test
    @Transactional
    public void createHorarioPreferencialRetirada() throws Exception {
        int databaseSizeBeforeCreate = horarioPreferencialRetiradaRepository.findAll().size();

        // Create the HorarioPreferencialRetirada
        restHorarioPreferencialRetiradaMockMvc.perform(post("/api/horario-preferencial-retiradas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horarioPreferencialRetirada)))
            .andExpect(status().isCreated());

        // Validate the HorarioPreferencialRetirada in the database
        List<HorarioPreferencialRetirada> horarioPreferencialRetiradaList = horarioPreferencialRetiradaRepository.findAll();
        assertThat(horarioPreferencialRetiradaList).hasSize(databaseSizeBeforeCreate + 1);
        HorarioPreferencialRetirada testHorarioPreferencialRetirada = horarioPreferencialRetiradaList.get(horarioPreferencialRetiradaList.size() - 1);
        assertThat(testHorarioPreferencialRetirada.getDataHora()).isEqualTo(DEFAULT_DATA_HORA);
    }

    @Test
    @Transactional
    public void createHorarioPreferencialRetiradaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = horarioPreferencialRetiradaRepository.findAll().size();

        // Create the HorarioPreferencialRetirada with an existing ID
        horarioPreferencialRetirada.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHorarioPreferencialRetiradaMockMvc.perform(post("/api/horario-preferencial-retiradas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horarioPreferencialRetirada)))
            .andExpect(status().isBadRequest());

        // Validate the HorarioPreferencialRetirada in the database
        List<HorarioPreferencialRetirada> horarioPreferencialRetiradaList = horarioPreferencialRetiradaRepository.findAll();
        assertThat(horarioPreferencialRetiradaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHorarioPreferencialRetiradas() throws Exception {
        // Initialize the database
        horarioPreferencialRetiradaRepository.saveAndFlush(horarioPreferencialRetirada);

        // Get all the horarioPreferencialRetiradaList
        restHorarioPreferencialRetiradaMockMvc.perform(get("/api/horario-preferencial-retiradas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(horarioPreferencialRetirada.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataHora").value(hasItem(DEFAULT_DATA_HORA.toString())));
    }
    
    @Test
    @Transactional
    public void getHorarioPreferencialRetirada() throws Exception {
        // Initialize the database
        horarioPreferencialRetiradaRepository.saveAndFlush(horarioPreferencialRetirada);

        // Get the horarioPreferencialRetirada
        restHorarioPreferencialRetiradaMockMvc.perform(get("/api/horario-preferencial-retiradas/{id}", horarioPreferencialRetirada.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(horarioPreferencialRetirada.getId().intValue()))
            .andExpect(jsonPath("$.dataHora").value(DEFAULT_DATA_HORA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHorarioPreferencialRetirada() throws Exception {
        // Get the horarioPreferencialRetirada
        restHorarioPreferencialRetiradaMockMvc.perform(get("/api/horario-preferencial-retiradas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHorarioPreferencialRetirada() throws Exception {
        // Initialize the database
        horarioPreferencialRetiradaRepository.saveAndFlush(horarioPreferencialRetirada);

        int databaseSizeBeforeUpdate = horarioPreferencialRetiradaRepository.findAll().size();

        // Update the horarioPreferencialRetirada
        HorarioPreferencialRetirada updatedHorarioPreferencialRetirada = horarioPreferencialRetiradaRepository.findById(horarioPreferencialRetirada.getId()).get();
        // Disconnect from session so that the updates on updatedHorarioPreferencialRetirada are not directly saved in db
        em.detach(updatedHorarioPreferencialRetirada);
        updatedHorarioPreferencialRetirada
            .dataHora(UPDATED_DATA_HORA);

        restHorarioPreferencialRetiradaMockMvc.perform(put("/api/horario-preferencial-retiradas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHorarioPreferencialRetirada)))
            .andExpect(status().isOk());

        // Validate the HorarioPreferencialRetirada in the database
        List<HorarioPreferencialRetirada> horarioPreferencialRetiradaList = horarioPreferencialRetiradaRepository.findAll();
        assertThat(horarioPreferencialRetiradaList).hasSize(databaseSizeBeforeUpdate);
        HorarioPreferencialRetirada testHorarioPreferencialRetirada = horarioPreferencialRetiradaList.get(horarioPreferencialRetiradaList.size() - 1);
        assertThat(testHorarioPreferencialRetirada.getDataHora()).isEqualTo(UPDATED_DATA_HORA);
    }

    @Test
    @Transactional
    public void updateNonExistingHorarioPreferencialRetirada() throws Exception {
        int databaseSizeBeforeUpdate = horarioPreferencialRetiradaRepository.findAll().size();

        // Create the HorarioPreferencialRetirada

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHorarioPreferencialRetiradaMockMvc.perform(put("/api/horario-preferencial-retiradas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horarioPreferencialRetirada)))
            .andExpect(status().isBadRequest());

        // Validate the HorarioPreferencialRetirada in the database
        List<HorarioPreferencialRetirada> horarioPreferencialRetiradaList = horarioPreferencialRetiradaRepository.findAll();
        assertThat(horarioPreferencialRetiradaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHorarioPreferencialRetirada() throws Exception {
        // Initialize the database
        horarioPreferencialRetiradaRepository.saveAndFlush(horarioPreferencialRetirada);

        int databaseSizeBeforeDelete = horarioPreferencialRetiradaRepository.findAll().size();

        // Delete the horarioPreferencialRetirada
        restHorarioPreferencialRetiradaMockMvc.perform(delete("/api/horario-preferencial-retiradas/{id}", horarioPreferencialRetirada.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HorarioPreferencialRetirada> horarioPreferencialRetiradaList = horarioPreferencialRetiradaRepository.findAll();
        assertThat(horarioPreferencialRetiradaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HorarioPreferencialRetirada.class);
        HorarioPreferencialRetirada horarioPreferencialRetirada1 = new HorarioPreferencialRetirada();
        horarioPreferencialRetirada1.setId(1L);
        HorarioPreferencialRetirada horarioPreferencialRetirada2 = new HorarioPreferencialRetirada();
        horarioPreferencialRetirada2.setId(horarioPreferencialRetirada1.getId());
        assertThat(horarioPreferencialRetirada1).isEqualTo(horarioPreferencialRetirada2);
        horarioPreferencialRetirada2.setId(2L);
        assertThat(horarioPreferencialRetirada1).isNotEqualTo(horarioPreferencialRetirada2);
        horarioPreferencialRetirada1.setId(null);
        assertThat(horarioPreferencialRetirada1).isNotEqualTo(horarioPreferencialRetirada2);
    }
}
