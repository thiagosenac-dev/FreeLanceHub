package com.senac.freelancehub.presentation;

import com.senac.freelancehub.application.DTOs.HabilidadeRequest;
import com.senac.freelancehub.application.ports.ProjetoServicePort;
import com.senac.freelancehub.application.ports.UsuarioServicePort;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// MUDANÇA (novo): área do freelancer logado (habilidades e projetos que combinam com elas)
@RestController
@RequestMapping("/freelancer")
@Tag(name = "Freelancer", description = "grupo de API do freelancer: habilidades e projetos disponíveis para ele")
public class FreelancerController {

    @Autowired
    private UsuarioServicePort usuarioService;

    @Autowired
    private ProjetoServicePort projetoService;

    // lista as habilidades (categorias) do freelancer
    @GetMapping("/habilidades")
    @Operation(summary = "Lista as habilidades do freelancer", description = "Método responsável pela consulta das categorias cadastradas como habilidade")
    public ResponseEntity<?> listarHabilidades() {
        return ResponseEntity.ok(usuarioService.listarHabilidades());
    }

    // adiciona uma habilidade (igual ao matricular do professor)
    @PatchMapping("/habilidades")
    @Operation(summary = "Adiciona uma habilidade", description = "Método responsável por cadastrar uma categoria como habilidade do freelancer")
    public ResponseEntity<?> adicionarHabilidade(@RequestBody HabilidadeRequest habilidadeRequest) {

        if (usuarioService.adicionarHabilidade(habilidadeRequest)) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }

    // remove uma habilidade
    @DeleteMapping("/habilidades/{categoriaId}")
    @Operation(summary = "Remove uma habilidade", description = "Método responsável por remover uma categoria das habilidades do freelancer")
    public ResponseEntity<Void> removerHabilidade(@PathVariable Long categoriaId) {

        if (usuarioService.removerHabilidade(categoriaId)) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }

    // lista os projetos abertos que combinam com as habilidades do freelancer
    @GetMapping("/projetos")
    @Operation(summary = "Projetos para o freelancer", description = "Método responsável pela consulta dos projetos abertos das categorias que o freelancer domina")
    public ResponseEntity<?> listarProjetos() {
        return ResponseEntity.ok(projetoService.listarProjetosDoFreelancer());
    }
}
