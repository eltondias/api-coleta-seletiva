package com.coletaseletiva.api.web.rest;

import com.coletaseletiva.api.ColetaseletivaApp;

import com.coletaseletiva.api.domain.Produtor;
import com.coletaseletiva.api.domain.Participante;
import com.coletaseletiva.api.repository.ProdutorRepository;
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

import com.coletaseletiva.api.domain.enumeration.TipoProdutor;
/**
 * Test class for the ProdutorResource REST controller.
 *
 * @see ProdutorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ColetaseletivaApp.class)
public class ProdutorResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATA_CADASTRO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CADASTRO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final TipoProdutor DEFAULT_TIPO = TipoProdutor.RESIDENCIAL;
    private static final TipoProdutor UPDATED_TIPO = TipoProdutor.COMERCIAL;

    @Autowired
    private ProdutorRepository produtorRepository;

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

    private MockMvc restProdutorMockMvc;

    private Produtor produtor;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProdutorResource produtorResource = new ProdutorResource(produtorRepository);
        this.restProdutorMockMvc = MockMvcBuilders.standaloneSetup(produtorResource)
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
    public static Produtor createEntity(EntityManager em) {
        Produtor produtor = new Produtor()
            .nome(DEFAULT_NOME)
            .dataCadastro(DEFAULT_DATA_CADASTRO)
            .tipo(DEFAULT_TIPO);
        // Add required entity
        Participante participante = ParticipanteResourceIntTest.createEntity(em);
        em.persist(participante);
        em.flush();
        produtor.setParticipante(participante);
        return produtor;
    }

    @Before
    public void initTest() {
        produtor = createEntity(em);
    }

    @Test
    @Transactional
    public void createProdutor() throws Exception {
        int databaseSizeBeforeCreate = produtorRepository.findAll().size();

        // Create the Produtor
        restProdutorMockMvc.perform(post("/api/produtors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtor)))
            .andExpect(status().isCreated());

        // Validate the Produtor in the database
        List<Produtor> produtorList = produtorRepository.findAll();
        assertThat(produtorList).hasSize(databaseSizeBeforeCreate + 1);
        Produtor testProdutor = produtorList.get(produtorList.size() - 1);
        assertThat(testProdutor.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testProdutor.getDataCadastro()).isEqualTo(DEFAULT_DATA_CADASTRO);
        assertThat(testProdutor.getTipo()).isEqualTo(DEFAULT_TIPO);
    }

    @Test
    @Transactional
    public void createProdutorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = produtorRepository.findAll().size();

        // Create the Produtor with an existing ID
        produtor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProdutorMockMvc.perform(post("/api/produtors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtor)))
            .andExpect(status().isBadRequest());

        // Validate the Produtor in the database
        List<Produtor> produtorList = produtorRepository.findAll();
        assertThat(produtorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTipoIsRequired() throws Exception {
        int databaseSizeBeforeTest = produtorRepository.findAll().size();
        // set the field null
        produtor.setTipo(null);

        // Create the Produtor, which fails.

        restProdutorMockMvc.perform(post("/api/produtors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtor)))
            .andExpect(status().isBadRequest());

        List<Produtor> produtorList = produtorRepository.findAll();
        assertThat(produtorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProdutors() throws Exception {
        // Initialize the database
        produtorRepository.saveAndFlush(produtor);

        // Get all the produtorList
        restProdutorMockMvc.perform(get("/api/produtors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(produtor.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].dataCadastro").value(hasItem(DEFAULT_DATA_CADASTRO.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())));
    }
    
    @Test
    @Transactional
    public void getProdutor() throws Exception {
        // Initialize the database
        produtorRepository.saveAndFlush(produtor);

        // Get the produtor
        restProdutorMockMvc.perform(get("/api/produtors/{id}", produtor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(produtor.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.dataCadastro").value(DEFAULT_DATA_CADASTRO.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProdutor() throws Exception {
        // Get the produtor
        restProdutorMockMvc.perform(get("/api/produtors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProdutor() throws Exception {
        // Initialize the database
        produtorRepository.saveAndFlush(produtor);

        int databaseSizeBeforeUpdate = produtorRepository.findAll().size();

        // Update the produtor
        Produtor updatedProdutor = produtorRepository.findById(produtor.getId()).get();
        // Disconnect from session so that the updates on updatedProdutor are not directly saved in db
        em.detach(updatedProdutor);
        updatedProdutor
            .nome(UPDATED_NOME)
            .dataCadastro(UPDATED_DATA_CADASTRO)
            .tipo(UPDATED_TIPO);

        restProdutorMockMvc.perform(put("/api/produtors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProdutor)))
            .andExpect(status().isOk());

        // Validate the Produtor in the database
        List<Produtor> produtorList = produtorRepository.findAll();
        assertThat(produtorList).hasSize(databaseSizeBeforeUpdate);
        Produtor testProdutor = produtorList.get(produtorList.size() - 1);
        assertThat(testProdutor.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testProdutor.getDataCadastro()).isEqualTo(UPDATED_DATA_CADASTRO);
        assertThat(testProdutor.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    public void updateNonExistingProdutor() throws Exception {
        int databaseSizeBeforeUpdate = produtorRepository.findAll().size();

        // Create the Produtor

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProdutorMockMvc.perform(put("/api/produtors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtor)))
            .andExpect(status().isBadRequest());

        // Validate the Produtor in the database
        List<Produtor> produtorList = produtorRepository.findAll();
        assertThat(produtorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProdutor() throws Exception {
        // Initialize the database
        produtorRepository.saveAndFlush(produtor);

        int databaseSizeBeforeDelete = produtorRepository.findAll().size();

        // Delete the produtor
        restProdutorMockMvc.perform(delete("/api/produtors/{id}", produtor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Produtor> produtorList = produtorRepository.findAll();
        assertThat(produtorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Produtor.class);
        Produtor produtor1 = new Produtor();
        produtor1.setId(1L);
        Produtor produtor2 = new Produtor();
        produtor2.setId(produtor1.getId());
        assertThat(produtor1).isEqualTo(produtor2);
        produtor2.setId(2L);
        assertThat(produtor1).isNotEqualTo(produtor2);
        produtor1.setId(null);
        assertThat(produtor1).isNotEqualTo(produtor2);
    }
}
