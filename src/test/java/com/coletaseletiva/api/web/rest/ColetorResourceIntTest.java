package com.coletaseletiva.api.web.rest;

import com.coletaseletiva.api.ColetaseletivaApp;

import com.coletaseletiva.api.domain.Coletor;
import com.coletaseletiva.api.domain.Participante;
import com.coletaseletiva.api.domain.TipoResiduo;
import com.coletaseletiva.api.repository.ColetorRepository;
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

import com.coletaseletiva.api.domain.enumeration.TipoColetor;
/**
 * Test class for the ColetorResource REST controller.
 *
 * @see ColetorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ColetaseletivaApp.class)
public class ColetorResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATA_CADASTRO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CADASTRO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final TipoColetor DEFAULT_TIPO = TipoColetor.PESSOA;
    private static final TipoColetor UPDATED_TIPO = TipoColetor.EMPRESA;

    @Autowired
    private ColetorRepository coletorRepository;

    @Mock
    private ColetorRepository coletorRepositoryMock;

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

    private MockMvc restColetorMockMvc;

    private Coletor coletor;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ColetorResource coletorResource = new ColetorResource(coletorRepository);
        this.restColetorMockMvc = MockMvcBuilders.standaloneSetup(coletorResource)
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
    public static Coletor createEntity(EntityManager em) {
        Coletor coletor = new Coletor()
            .nome(DEFAULT_NOME)
            .dataCadastro(DEFAULT_DATA_CADASTRO)
            .tipo(DEFAULT_TIPO);
        // Add required entity
        Participante participante = ParticipanteResourceIntTest.createEntity(em);
        em.persist(participante);
        em.flush();
        coletor.setParticipante(participante);
        // Add required entity
        TipoResiduo tipoResiduo = TipoResiduoResourceIntTest.createEntity(em);
        em.persist(tipoResiduo);
        em.flush();
        coletor.getTipoResiduos().add(tipoResiduo);
        return coletor;
    }

    @Before
    public void initTest() {
        coletor = createEntity(em);
    }

    @Test
    @Transactional
    public void createColetor() throws Exception {
        int databaseSizeBeforeCreate = coletorRepository.findAll().size();

        // Create the Coletor
        restColetorMockMvc.perform(post("/api/coletors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coletor)))
            .andExpect(status().isCreated());

        // Validate the Coletor in the database
        List<Coletor> coletorList = coletorRepository.findAll();
        assertThat(coletorList).hasSize(databaseSizeBeforeCreate + 1);
        Coletor testColetor = coletorList.get(coletorList.size() - 1);
        assertThat(testColetor.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testColetor.getDataCadastro()).isEqualTo(DEFAULT_DATA_CADASTRO);
        assertThat(testColetor.getTipo()).isEqualTo(DEFAULT_TIPO);
    }

    @Test
    @Transactional
    public void createColetorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = coletorRepository.findAll().size();

        // Create the Coletor with an existing ID
        coletor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restColetorMockMvc.perform(post("/api/coletors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coletor)))
            .andExpect(status().isBadRequest());

        // Validate the Coletor in the database
        List<Coletor> coletorList = coletorRepository.findAll();
        assertThat(coletorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTipoIsRequired() throws Exception {
        int databaseSizeBeforeTest = coletorRepository.findAll().size();
        // set the field null
        coletor.setTipo(null);

        // Create the Coletor, which fails.

        restColetorMockMvc.perform(post("/api/coletors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coletor)))
            .andExpect(status().isBadRequest());

        List<Coletor> coletorList = coletorRepository.findAll();
        assertThat(coletorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllColetors() throws Exception {
        // Initialize the database
        coletorRepository.saveAndFlush(coletor);

        // Get all the coletorList
        restColetorMockMvc.perform(get("/api/coletors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(coletor.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].dataCadastro").value(hasItem(DEFAULT_DATA_CADASTRO.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllColetorsWithEagerRelationshipsIsEnabled() throws Exception {
        ColetorResource coletorResource = new ColetorResource(coletorRepositoryMock);
        when(coletorRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restColetorMockMvc = MockMvcBuilders.standaloneSetup(coletorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restColetorMockMvc.perform(get("/api/coletors?eagerload=true"))
        .andExpect(status().isOk());

        verify(coletorRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllColetorsWithEagerRelationshipsIsNotEnabled() throws Exception {
        ColetorResource coletorResource = new ColetorResource(coletorRepositoryMock);
            when(coletorRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restColetorMockMvc = MockMvcBuilders.standaloneSetup(coletorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restColetorMockMvc.perform(get("/api/coletors?eagerload=true"))
        .andExpect(status().isOk());

            verify(coletorRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getColetor() throws Exception {
        // Initialize the database
        coletorRepository.saveAndFlush(coletor);

        // Get the coletor
        restColetorMockMvc.perform(get("/api/coletors/{id}", coletor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(coletor.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.dataCadastro").value(DEFAULT_DATA_CADASTRO.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingColetor() throws Exception {
        // Get the coletor
        restColetorMockMvc.perform(get("/api/coletors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateColetor() throws Exception {
        // Initialize the database
        coletorRepository.saveAndFlush(coletor);

        int databaseSizeBeforeUpdate = coletorRepository.findAll().size();

        // Update the coletor
        Coletor updatedColetor = coletorRepository.findById(coletor.getId()).get();
        // Disconnect from session so that the updates on updatedColetor are not directly saved in db
        em.detach(updatedColetor);
        updatedColetor
            .nome(UPDATED_NOME)
            .dataCadastro(UPDATED_DATA_CADASTRO)
            .tipo(UPDATED_TIPO);

        restColetorMockMvc.perform(put("/api/coletors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedColetor)))
            .andExpect(status().isOk());

        // Validate the Coletor in the database
        List<Coletor> coletorList = coletorRepository.findAll();
        assertThat(coletorList).hasSize(databaseSizeBeforeUpdate);
        Coletor testColetor = coletorList.get(coletorList.size() - 1);
        assertThat(testColetor.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testColetor.getDataCadastro()).isEqualTo(UPDATED_DATA_CADASTRO);
        assertThat(testColetor.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    public void updateNonExistingColetor() throws Exception {
        int databaseSizeBeforeUpdate = coletorRepository.findAll().size();

        // Create the Coletor

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restColetorMockMvc.perform(put("/api/coletors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coletor)))
            .andExpect(status().isBadRequest());

        // Validate the Coletor in the database
        List<Coletor> coletorList = coletorRepository.findAll();
        assertThat(coletorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteColetor() throws Exception {
        // Initialize the database
        coletorRepository.saveAndFlush(coletor);

        int databaseSizeBeforeDelete = coletorRepository.findAll().size();

        // Delete the coletor
        restColetorMockMvc.perform(delete("/api/coletors/{id}", coletor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Coletor> coletorList = coletorRepository.findAll();
        assertThat(coletorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Coletor.class);
        Coletor coletor1 = new Coletor();
        coletor1.setId(1L);
        Coletor coletor2 = new Coletor();
        coletor2.setId(coletor1.getId());
        assertThat(coletor1).isEqualTo(coletor2);
        coletor2.setId(2L);
        assertThat(coletor1).isNotEqualTo(coletor2);
        coletor1.setId(null);
        assertThat(coletor1).isNotEqualTo(coletor2);
    }
}
