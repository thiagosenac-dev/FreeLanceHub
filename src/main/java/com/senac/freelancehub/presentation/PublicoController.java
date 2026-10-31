package com.senac.freelancehub.presentation;

import com.senac.freelancehub.application.DTOs.ProjetoResponse;
import com.senac.freelancehub.application.services.CategoriaService;
import com.senac.freelancehub.application.services.ProjetoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// MUDANÇA (novo): área pública, qualquer pessoa vê os projetos sem fazer login
@RestController
@RequestMapping("/publico")
@Tag(name = "Publico", description = "grupo de API aberta (sem login) com os dados públicos dos projetos")
public class PublicoController {

    @Autowired
    private ProjetoService projetoService;

    @Autowired
    private CategoriaService categoriaService;

    // lista os projetos abertos
    @GetMapping("/projetos")
    @Operation(summary = "Lista pública de projetos", description = "Método responsável pela consulta dos projetos abertos, sem login")
    public ResponseEntity<?> listarProjetos() {
        return ResponseEntity.ok(projetoService.listarProjetosPublicos());
    }

    // busca um projeto aberto pelo id, 404 se não existir
    @GetMapping("/projetos/{id}")
    @Operation(summary = "Consulta pública de projeto POR ID", description = "Método responsável pela consulta de um projeto aberto por ID, sem login")
    public ResponseEntity<ProjetoResponse> buscarProjeto(@PathVariable Long id) {
        ProjetoResponse projetoBanco = projetoService.buscarPublicoPorId(id);
        if (projetoBanco != null) {
            return ResponseEntity.ok(projetoBanco);
        }
        return ResponseEntity.notFound().build();
    }

    // lista as categorias (para mostrar o nome da categoria dos projetos)
    @GetMapping("/categorias")
    @Operation(summary = "Lista pública de categorias", description = "Método responsável pela consulta das categorias, sem login")
    public ResponseEntity<?> listarCategorias() {
        return ResponseEntity.ok(categoriaService.listarCategoriasPublicas());
    }
}
