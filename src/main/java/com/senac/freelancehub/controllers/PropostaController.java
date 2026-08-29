package com.senac.freelancehub.controllers;

import com.senac.freelancehub.DTOs.AtualizarStatusPropostaRequest;
import com.senac.freelancehub.entities.EnumStatusProposta;
import com.senac.freelancehub.entities.Proposta;
import com.senac.freelancehub.repository.PropostaRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/propostas")
@Tag(name = "Propostas", description = "grupo de API responsável por controlar a estrutura de criação e edição das propostas para os usuários")
public class PropostaController {

    @Autowired
    private PropostaRepository propostaRepository;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de usuários!", description = "Método responsável pela colsulta de todas os usuários sem filtro")
    public ResponseEntity<?> ListarTodos() {

        return ResponseEntity.ok(propostaRepository.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Método de consulta de lista de usuários POR ID", description = "Método responsável pela colsulta de usuários por ID")
    public ResponseEntity<Proposta> BuscarPorId(@PathVariable Long id){

        Proposta propostaBanco = propostaRepository.findById(id).orElse(null);
        if (propostaBanco != null){
            return ResponseEntity.ok(propostaBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de consulta de lista de usuários!", description = "Método responsável pela colsulta de todas os usuários sem filtro")
    public ResponseEntity<Proposta> criar(@RequestBody Proposta proposta) {
        var propostaBanco = propostaRepository.save(proposta);
        return ResponseEntity.ok(propostaBanco);
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Método de aletrar Status", description = "Método responsável aletração dos status das propostas")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusPropostaRequest statusRequest){

        Proposta propostaBanco = propostaRepository.findById(id).orElse(null);
        if (propostaBanco != null){
            propostaBanco.setStatus(statusRequest.status());
            propostaRepository.save(propostaBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método de alterar iformações do usuário", description = "Método responsável pela alteração de propostas")
    public ResponseEntity<Proposta> atualizarProposta(@PathVariable Long id, @RequestBody Proposta proposta){

        try {
            Proposta propostaBanco = propostaRepository.findById(id).orElse(null);

            if (propostaBanco != null){
                propostaBanco.setStatus(proposta.getStatus());
                propostaBanco.setDescricao(proposta.getDescricao());
                propostaBanco.setValor(proposta.getValor());
                propostaBanco.setPrazo(proposta.getPrazo());
                propostaRepository.save(propostaBanco);

                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}/excluir")
    @Operation(summary = "Método de inativação de cadastro", description = "Método responsável inativação do cadastro da proposta")
    public ResponseEntity<Void> excluir(@PathVariable Long id){

        Proposta propostaBanco = propostaRepository.findById(id).orElse(null);
        if (propostaBanco != null){
            propostaBanco.setStatus(EnumStatusProposta.CANCELADA);
            propostaRepository.save(propostaBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
