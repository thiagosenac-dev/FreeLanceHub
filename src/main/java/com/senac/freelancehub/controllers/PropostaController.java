package com.senac.freelancehub.controllers;

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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de consulta de lista de usuários!", description = "Método responsável pela colsulta de todas os usuários sem filtro")
    public ResponseEntity<Proposta> criar(@RequestBody Proposta proposta) {
        var propostaBanco = propostaRepository.save(proposta);
        return ResponseEntity.ok(propostaBanco);
    }

}