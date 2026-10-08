package com.senac.freelancehub.presentation;

import com.senac.freelancehub.application.DTOs.AtualizarStatusProjetoRequest;
import com.senac.freelancehub.application.services.ProjetoService;
import com.senac.freelancehub.domain.entities.EnumStatusProjeto;
import com.senac.freelancehub.domain.entities.Projeto;
import com.senac.freelancehub.domain.repository.ProjetoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/projetos")
@Tag(name = "Projetos", description = "grupo de API responsável por controlar a estrutura dos projetos do sistema")
public class ProjetoController {

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private ProjetoService projetoService;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de usuários!", description = "Método responsável pela colsulta de todos os projetos sem filtro")
    public ResponseEntity<?> ListarTodos() {

        return ResponseEntity.ok(projetoService.ListarTodosProjetosGrid());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Método de consulta de lista de usuários POR ID", description = "Método responsável pela colsulta dos projetos por ID")
    public ResponseEntity<Projeto> BuscarPorId(@PathVariable Long id){

        return projetoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de consulta de lista de usuários!", description = "Método responsável pela colsulta de todos os projetos sem filtro")
    public ResponseEntity<Projeto> criar(@RequestBody Projeto projeto) {
        return ResponseEntity.ok(projetoService.criar(projeto));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Método de aletrar Status", description = "Método responsável aletração dos status dos projetos")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusProjetoRequest statusRequest){

        if (projetoService.atualizarStatus(id, statusRequest)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método de alterar iformações do usuário", description = "Método responsável pela alteração de projetos")
    public ResponseEntity<Projeto> atualizarProjeto(@PathVariable Long id, @RequestBody Projeto projeto){

        if (projetoService.atualizarProjeto(id, projeto)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}/excluir")
    @Operation(summary = "Método de inativação de cadastro", description = "Método responsável inativação do cadastro do projeto")
    public ResponseEntity<Void> excluir(@PathVariable Long id){

        if (projetoService.excluir(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}