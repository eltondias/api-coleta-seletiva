package com.coletaseletiva.api.web.rest;

import com.coletaseletiva.api.ColetaseletivaApp;

import com.coletaseletiva.api.domain.Participante;
import com.coletaseletiva.api.repository.ParticipanteRepository;
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

import com.coletaseletiva.api.domain.enumeration.EstadoParticipante;
/**
 * Test class for the ParticipanteResource REST controller.
 *
 * @see ParticipanteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ColetaseletivaApp.class)
public class ParticipanteResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_URL_FOTO_PERFIL = "AAAAAAAAAA";
    private static final String UPDATED_URL_FOTO_PERFIL = "BBBBBBBBBB";

    private static final String DEFAULT_CPF_CNPJ = "AAAAAAAAAA";
    private static final String UPDATED_CPF_CNPJ = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATA_CADASTRO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CADASTRO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_RANKING = 1;
    private static final Integer UPDATED_RANKING = 2;

    private static final EstadoParticipante DEFAULT_ESTADO = EstadoParticipante.ATIVO;
    private static final EstadoParticipante UPDATED_ESTADO = EstadoParticipante.INATIVO;

    @Autowired
    private ParticipanteRepository participanteRepository;

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

    private MockMvc restParticipanteMockMvc;

    private Participante participante;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParticipanteResource participanteResource = new ParticipanteResource(participanteRepository);
        this.restParticipanteMockMvc = MockMvcBuilders.standaloneSetup(participanteResource)
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
    public static Participante createEntity(EntityManager em) {
        Participante participante = new Participante()
            .nome(DEFAULT_NOME)
            .urlFotoPerfil(DEFAULT_URL_FOTO_PERFIL)
            .cpfCnpj(DEFAULT_CPF_CNPJ)
            .dataCadastro(DEFAULT_DATA_CADASTRO)
            .ranking(DEFAULT_RANKING)
            .estado(DEFAULT_ESTADO);
        return participante;
    }

    @Before
    public void initTest() {
        participante = createEntity(em);
    }

    @Test
    @Transactional
    public void createParticipante() throws Exception {
        int databaseSizeBeforeCreate = participanteRepository.findAll().size();

        // Create the Participante
        restParticipanteMockMvc.perform(post("/api/participantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participante)))
            .andExpect(status().isCreated());

        // Validate the Participante in the database
        List<Participante> participanteList = participanteRepository.findAll();
        assertThat(participanteList).hasSize(databaseSizeBeforeCreate + 1);
        Participante testParticipante = participanteList.get(participanteList.size() - 1);
        assertThat(testParticipante.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testParticipante.getUrlFotoPerfil()).isEqualTo(DEFAULT_URL_FOTO_PERFIL);
        assertThat(testParticipante.getCpfCnpj()).isEqualTo(DEFAULT_CPF_CNPJ);
        assertThat(testParticipante.getDataCadastro()).isEqualTo(DEFAULT_DATA_CADASTRO);
        assertThat(testParticipante.getRanking()).isEqualTo(DEFAULT_RANKING);
        assertThat(testParticipante.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    public void createParticipanteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = participanteRepository.findAll().size();

        // Create the Participante with an existing ID
        participante.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParticipanteMockMvc.perform(post("/api/participantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participante)))
            .andExpect(status().isBadRequest());

        // Validate the Participante in the database
        List<Participante> participanteList = participanteRepository.findAll();
        assertThat(participanteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = participanteRepository.findAll().size();
        // set the field null
        participante.setNome(null);

        // Create the Participante, which fails.

        restParticipanteMockMvc.perform(post("/api/participantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participante)))
            .andExpect(status().isBadRequest());

        List<Participante> participanteList = participanteRepository.findAll();
        assertThat(participanteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCpfCnpjIsRequired() throws Exception {
        int databaseSizeBeforeTest = participanteRepository.findAll().size();
        // set the field null
        participante.setCpfCnpj(null);

        // Create the Participante, which fails.

        restParticipanteMockMvc.perform(post("/api/participantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participante)))
            .andExpect(status().isBadRequest());

        List<Participante> participanteList = participanteRepository.findAll();
        assertThat(participanteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = participanteRepository.findAll().size();
        // set the field null
        participante.setEstado(null);

        // Create the Participante, which fails.

        restParticipanteMockMvc.perform(post("/api/participantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participante)))
            .andExpect(status().isBadRequest());

        List<Participante> participanteList = participanteRepository.findAll();
        assertThat(participanteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllParticipantes() throws Exception {
        // Initialize the database
        participanteRepository.saveAndFlush(participante);

        // Get all the participanteList
        restParticipanteMockMvc.perform(get("/api/participantes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(participante.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].urlFotoPerfil").value(hasItem(DEFAULT_URL_FOTO_PERFIL.toString())))
            .andExpect(jsonPath("$.[*].cpfCnpj").value(hasItem(DEFAULT_CPF_CNPJ.toString())))
            .andExpect(jsonPath("$.[*].dataCadastro").value(hasItem(DEFAULT_DATA_CADASTRO.toString())))
            .andExpect(jsonPath("$.[*].ranking").value(hasItem(DEFAULT_RANKING)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())));
    }
    
    @Test
    @Transactional
    public void getParticipante() throws Exception {
        // Initialize the database
        participanteRepository.saveAndFlush(participante);

        // Get the participante
        restParticipanteMockMvc.perform(get("/api/participantes/{id}", participante.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(participante.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.urlFotoPerfil").value(DEFAULT_URL_FOTO_PERFIL.toString()))
            .andExpect(jsonPath("$.cpfCnpj").value(DEFAULT_CPF_CNPJ.toString()))
            .andExpect(jsonPath("$.dataCadastro").value(DEFAULT_DATA_CADASTRO.toString()))
            .andExpect(jsonPath("$.ranking").value(DEFAULT_RANKING))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingParticipante() throws Exception {
        // Get the participante
        restParticipanteMockMvc.perform(get("/api/participantes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParticipante() throws Exception {
        // Initialize the database
        participanteRepository.saveAndFlush(participante);

        int databaseSizeBeforeUpdate = participanteRepository.findAll().size();

        // Update the participante
        Participante updatedParticipante = participanteRepository.findById(participante.getId()).get();
        // Disconnect from session so that the updates on updatedParticipante are not directly saved in db
        em.detach(updatedParticipante);
        updatedParticipante
            .nome(UPDATED_NOME)
            .urlFotoPerfil(UPDATED_URL_FOTO_PERFIL)
            .cpfCnpj(UPDATED_CPF_CNPJ)
            .dataCadastro(UPDATED_DATA_CADASTRO)
            .ranking(UPDATED_RANKING)
            .estado(UPDATED_ESTADO);

        restParticipanteMockMvc.perform(put("/api/participantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedParticipante)))
            .andExpect(status().isOk());

        // Validate the Participante in the database
        List<Participante> participanteList = participanteRepository.findAll();
        assertThat(participanteList).hasSize(databaseSizeBeforeUpdate);
        Participante testParticipante = participanteList.get(participanteList.size() - 1);
        assertThat(testParticipante.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testParticipante.getUrlFotoPerfil()).isEqualTo(UPDATED_URL_FOTO_PERFIL);
        assertThat(testParticipante.getCpfCnpj()).isEqualTo(UPDATED_CPF_CNPJ);
        assertThat(testParticipante.getDataCadastro()).isEqualTo(UPDATED_DATA_CADASTRO);
        assertThat(testParticipante.getRanking()).isEqualTo(UPDATED_RANKING);
        assertThat(testParticipante.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingParticipante() throws Exception {
        int databaseSizeBeforeUpdate = participanteRepository.findAll().size();

        // Create the Participante

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParticipanteMockMvc.perform(put("/api/participantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participante)))
            .andExpect(status().isBadRequest());

        // Validate the Participante in the database
        List<Participante> participanteList = participanteRepository.findAll();
        assertThat(participanteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteParticipante() throws Exception {
        // Initialize the database
        participanteRepository.saveAndFlush(participante);

        int databaseSizeBeforeDelete = participanteRepository.findAll().size();

        // Delete the participante
        restParticipanteMockMvc.perform(delete("/api/participantes/{id}", participante.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Participante> participanteList = participanteRepository.findAll();
        assertThat(participanteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Participante.class);
        Participante participante1 = new Participante();
        participante1.setId(1L);
        Participante participante2 = new Participante();
        participante2.setId(participante1.getId());
        assertThat(participante1).isEqualTo(participante2);
        participante2.setId(2L);
        assertThat(participante1).isNotEqualTo(participante2);
        participante1.setId(null);
        assertThat(participante1).isNotEqualTo(participante2);
    }
}
