package com.coletaseletiva.api.web.rest;

import com.coletaseletiva.api.ColetaseletivaApp;

import com.coletaseletiva.api.domain.TipoResiduo;
import com.coletaseletiva.api.repository.TipoResiduoRepository;
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
import java.util.List;


import static com.coletaseletiva.api.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TipoResiduoResource REST controller.
 *
 * @see TipoResiduoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ColetaseletivaApp.class)
public class TipoResiduoResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String DEFAULT_COR = "AAAAAAAAAA";
    private static final String UPDATED_COR = "BBBBBBBBBB";

    private static final String DEFAULT_ICONE = "AAAAAAAAAA";
    private static final String UPDATED_ICONE = "BBBBBBBBBB";

    @Autowired
    private TipoResiduoRepository tipoResiduoRepository;

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

    private MockMvc restTipoResiduoMockMvc;

    private TipoResiduo tipoResiduo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoResiduoResource tipoResiduoResource = new TipoResiduoResource(tipoResiduoRepository);
        this.restTipoResiduoMockMvc = MockMvcBuilders.standaloneSetup(tipoResiduoResource)
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
    public static TipoResiduo createEntity(EntityManager em) {
        TipoResiduo tipoResiduo = new TipoResiduo()
            .nome(DEFAULT_NOME)
            .descricao(DEFAULT_DESCRICAO)
            .cor(DEFAULT_COR)
            .icone(DEFAULT_ICONE);
        return tipoResiduo;
    }

    @Before
    public void initTest() {
        tipoResiduo = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoResiduo() throws Exception {
        int databaseSizeBeforeCreate = tipoResiduoRepository.findAll().size();

        // Create the TipoResiduo
        restTipoResiduoMockMvc.perform(post("/api/tipo-residuos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoResiduo)))
            .andExpect(status().isCreated());

        // Validate the TipoResiduo in the database
        List<TipoResiduo> tipoResiduoList = tipoResiduoRepository.findAll();
        assertThat(tipoResiduoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoResiduo testTipoResiduo = tipoResiduoList.get(tipoResiduoList.size() - 1);
        assertThat(testTipoResiduo.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTipoResiduo.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testTipoResiduo.getCor()).isEqualTo(DEFAULT_COR);
        assertThat(testTipoResiduo.getIcone()).isEqualTo(DEFAULT_ICONE);
    }

    @Test
    @Transactional
    public void createTipoResiduoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoResiduoRepository.findAll().size();

        // Create the TipoResiduo with an existing ID
        tipoResiduo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoResiduoMockMvc.perform(post("/api/tipo-residuos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoResiduo)))
            .andExpect(status().isBadRequest());

        // Validate the TipoResiduo in the database
        List<TipoResiduo> tipoResiduoList = tipoResiduoRepository.findAll();
        assertThat(tipoResiduoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTipoResiduos() throws Exception {
        // Initialize the database
        tipoResiduoRepository.saveAndFlush(tipoResiduo);

        // Get all the tipoResiduoList
        restTipoResiduoMockMvc.perform(get("/api/tipo-residuos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoResiduo.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].cor").value(hasItem(DEFAULT_COR.toString())))
            .andExpect(jsonPath("$.[*].icone").value(hasItem(DEFAULT_ICONE.toString())));
    }
    
    @Test
    @Transactional
    public void getTipoResiduo() throws Exception {
        // Initialize the database
        tipoResiduoRepository.saveAndFlush(tipoResiduo);

        // Get the tipoResiduo
        restTipoResiduoMockMvc.perform(get("/api/tipo-residuos/{id}", tipoResiduo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoResiduo.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()))
            .andExpect(jsonPath("$.cor").value(DEFAULT_COR.toString()))
            .andExpect(jsonPath("$.icone").value(DEFAULT_ICONE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoResiduo() throws Exception {
        // Get the tipoResiduo
        restTipoResiduoMockMvc.perform(get("/api/tipo-residuos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoResiduo() throws Exception {
        // Initialize the database
        tipoResiduoRepository.saveAndFlush(tipoResiduo);

        int databaseSizeBeforeUpdate = tipoResiduoRepository.findAll().size();

        // Update the tipoResiduo
        TipoResiduo updatedTipoResiduo = tipoResiduoRepository.findById(tipoResiduo.getId()).get();
        // Disconnect from session so that the updates on updatedTipoResiduo are not directly saved in db
        em.detach(updatedTipoResiduo);
        updatedTipoResiduo
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO)
            .cor(UPDATED_COR)
            .icone(UPDATED_ICONE);

        restTipoResiduoMockMvc.perform(put("/api/tipo-residuos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoResiduo)))
            .andExpect(status().isOk());

        // Validate the TipoResiduo in the database
        List<TipoResiduo> tipoResiduoList = tipoResiduoRepository.findAll();
        assertThat(tipoResiduoList).hasSize(databaseSizeBeforeUpdate);
        TipoResiduo testTipoResiduo = tipoResiduoList.get(tipoResiduoList.size() - 1);
        assertThat(testTipoResiduo.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTipoResiduo.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testTipoResiduo.getCor()).isEqualTo(UPDATED_COR);
        assertThat(testTipoResiduo.getIcone()).isEqualTo(UPDATED_ICONE);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoResiduo() throws Exception {
        int databaseSizeBeforeUpdate = tipoResiduoRepository.findAll().size();

        // Create the TipoResiduo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoResiduoMockMvc.perform(put("/api/tipo-residuos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoResiduo)))
            .andExpect(status().isBadRequest());

        // Validate the TipoResiduo in the database
        List<TipoResiduo> tipoResiduoList = tipoResiduoRepository.findAll();
        assertThat(tipoResiduoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoResiduo() throws Exception {
        // Initialize the database
        tipoResiduoRepository.saveAndFlush(tipoResiduo);

        int databaseSizeBeforeDelete = tipoResiduoRepository.findAll().size();

        // Delete the tipoResiduo
        restTipoResiduoMockMvc.perform(delete("/api/tipo-residuos/{id}", tipoResiduo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TipoResiduo> tipoResiduoList = tipoResiduoRepository.findAll();
        assertThat(tipoResiduoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoResiduo.class);
        TipoResiduo tipoResiduo1 = new TipoResiduo();
        tipoResiduo1.setId(1L);
        TipoResiduo tipoResiduo2 = new TipoResiduo();
        tipoResiduo2.setId(tipoResiduo1.getId());
        assertThat(tipoResiduo1).isEqualTo(tipoResiduo2);
        tipoResiduo2.setId(2L);
        assertThat(tipoResiduo1).isNotEqualTo(tipoResiduo2);
        tipoResiduo1.setId(null);
        assertThat(tipoResiduo1).isNotEqualTo(tipoResiduo2);
    }
}
