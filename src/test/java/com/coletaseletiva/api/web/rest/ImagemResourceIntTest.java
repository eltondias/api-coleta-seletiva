package com.coletaseletiva.api.web.rest;

import com.coletaseletiva.api.ColetaseletivaApp;

import com.coletaseletiva.api.domain.Imagem;
import com.coletaseletiva.api.domain.SolicitacaoRetirada;
import com.coletaseletiva.api.repository.ImagemRepository;
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
 * Test class for the ImagemResource REST controller.
 *
 * @see ImagemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ColetaseletivaApp.class)
public class ImagemResourceIntTest {

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private ImagemRepository imagemRepository;

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

    private MockMvc restImagemMockMvc;

    private Imagem imagem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ImagemResource imagemResource = new ImagemResource(imagemRepository);
        this.restImagemMockMvc = MockMvcBuilders.standaloneSetup(imagemResource)
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
    public static Imagem createEntity(EntityManager em) {
        Imagem imagem = new Imagem()
            .url(DEFAULT_URL)
            .descricao(DEFAULT_DESCRICAO);
        // Add required entity
        SolicitacaoRetirada solicitacaoRetirada = SolicitacaoRetiradaResourceIntTest.createEntity(em);
        em.persist(solicitacaoRetirada);
        em.flush();
        imagem.setSolicitacaoRetirada(solicitacaoRetirada);
        return imagem;
    }

    @Before
    public void initTest() {
        imagem = createEntity(em);
    }

    @Test
    @Transactional
    public void createImagem() throws Exception {
        int databaseSizeBeforeCreate = imagemRepository.findAll().size();

        // Create the Imagem
        restImagemMockMvc.perform(post("/api/imagems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imagem)))
            .andExpect(status().isCreated());

        // Validate the Imagem in the database
        List<Imagem> imagemList = imagemRepository.findAll();
        assertThat(imagemList).hasSize(databaseSizeBeforeCreate + 1);
        Imagem testImagem = imagemList.get(imagemList.size() - 1);
        assertThat(testImagem.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testImagem.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    public void createImagemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = imagemRepository.findAll().size();

        // Create the Imagem with an existing ID
        imagem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImagemMockMvc.perform(post("/api/imagems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imagem)))
            .andExpect(status().isBadRequest());

        // Validate the Imagem in the database
        List<Imagem> imagemList = imagemRepository.findAll();
        assertThat(imagemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllImagems() throws Exception {
        // Initialize the database
        imagemRepository.saveAndFlush(imagem);

        // Get all the imagemList
        restImagemMockMvc.perform(get("/api/imagems?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(imagem.getId().intValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())));
    }
    
    @Test
    @Transactional
    public void getImagem() throws Exception {
        // Initialize the database
        imagemRepository.saveAndFlush(imagem);

        // Get the imagem
        restImagemMockMvc.perform(get("/api/imagems/{id}", imagem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(imagem.getId().intValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingImagem() throws Exception {
        // Get the imagem
        restImagemMockMvc.perform(get("/api/imagems/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImagem() throws Exception {
        // Initialize the database
        imagemRepository.saveAndFlush(imagem);

        int databaseSizeBeforeUpdate = imagemRepository.findAll().size();

        // Update the imagem
        Imagem updatedImagem = imagemRepository.findById(imagem.getId()).get();
        // Disconnect from session so that the updates on updatedImagem are not directly saved in db
        em.detach(updatedImagem);
        updatedImagem
            .url(UPDATED_URL)
            .descricao(UPDATED_DESCRICAO);

        restImagemMockMvc.perform(put("/api/imagems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedImagem)))
            .andExpect(status().isOk());

        // Validate the Imagem in the database
        List<Imagem> imagemList = imagemRepository.findAll();
        assertThat(imagemList).hasSize(databaseSizeBeforeUpdate);
        Imagem testImagem = imagemList.get(imagemList.size() - 1);
        assertThat(testImagem.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testImagem.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    public void updateNonExistingImagem() throws Exception {
        int databaseSizeBeforeUpdate = imagemRepository.findAll().size();

        // Create the Imagem

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImagemMockMvc.perform(put("/api/imagems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imagem)))
            .andExpect(status().isBadRequest());

        // Validate the Imagem in the database
        List<Imagem> imagemList = imagemRepository.findAll();
        assertThat(imagemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteImagem() throws Exception {
        // Initialize the database
        imagemRepository.saveAndFlush(imagem);

        int databaseSizeBeforeDelete = imagemRepository.findAll().size();

        // Delete the imagem
        restImagemMockMvc.perform(delete("/api/imagems/{id}", imagem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Imagem> imagemList = imagemRepository.findAll();
        assertThat(imagemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Imagem.class);
        Imagem imagem1 = new Imagem();
        imagem1.setId(1L);
        Imagem imagem2 = new Imagem();
        imagem2.setId(imagem1.getId());
        assertThat(imagem1).isEqualTo(imagem2);
        imagem2.setId(2L);
        assertThat(imagem1).isNotEqualTo(imagem2);
        imagem1.setId(null);
        assertThat(imagem1).isNotEqualTo(imagem2);
    }
}
