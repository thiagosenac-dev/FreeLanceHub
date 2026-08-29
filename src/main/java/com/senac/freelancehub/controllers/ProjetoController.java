package com.senac.freelancehub.controllers;

import com.senac.freelancehub.DTOs.AtualizarStatusProjetoRequest;
import com.senac.freelancehub.entities.EnumStatusProjeto;
import com.senac.freelancehub.entities.Projeto;
import com.senac.freelancehub.repository.ProjetoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/projetos")
@Tag(name = "Projetos", description = "grupo de API responsável por controlar a estrutura de criação e consulta de usuários do sistema")
public class ProjetoController {

    @Autowired
    private ProjetoRepository projetoRepository;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de usuários!", description = "Método responsável pela colsulta de todas os usuários sem filtro")
    public ResponseEntity<?> ListarTodos() {

        return ResponseEntity.ok(projetoRepository.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Método de consulta de lista de usuários POR ID", description = "Método responsável pela colsulta de usuários por ID")
    public ResponseEntity<Projeto> BuscarPorId(@PathVariable Long id){

        Projeto projetoBanco = projetoRepository.findById(id).orElse(null);
        if (projetoBanco != null){
            return ResponseEntity.ok(projetoBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de consulta de lista de usuários!", description = "Método responsável pela colsulta de todas os usuários sem filtro")
    public ResponseEntity<Projeto> criar(@RequestBody Projeto projeto) {
        var projetoBanco = projetoRepository.save(projeto);
        return ResponseEntity.ok(projetoBanco);
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Método de aletrar Status", description = "Método responsável aletração dos status dos projetos")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusProjetoRequest statusRequest){

        Projeto projetoBanco = projetoRepository.findById(id).orElse(null);
        if (projetoBanco != null){
            projetoBanco.setStatus(statusRequest.status());
            projetoRepository.save(projetoBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método de alterar iformações do usuário", description = "Método responsável pela alteração de projetos")
    public ResponseEntity<Projeto> atualizarProjeto(@PathVariable Long id, @RequestBody Projeto projeto){

        try {
            Projeto projetoBanco = projetoRepository.findById(id).orElse(null);

            if (projetoBanco != null){
                projetoBanco.setStatus(projeto.getStatus());
                projetoBanco.setNome(projeto.getNome());
                projetoBanco.setDescricao(projeto.getDescricao());
                projetoBanco.setValor(projeto.getValor());
                projetoBanco.setPrazo(projeto.getPrazo());
                projetoRepository.save(projetoBanco);

                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}/excluir")
    @Operation(summary = "Método de inativação de cadastro", description = "Método responsável inativação do cadastro do projeto")
    public ResponseEntity<Void> excluir(@PathVariable Long id){

        Projeto projetoBanco = projetoRepository.findById(id).orElse(null);
        if (projetoBanco != null){
            projetoBanco.setStatus(EnumStatusProjeto.CANCELADO);
            projetoRepository.save(projetoBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
