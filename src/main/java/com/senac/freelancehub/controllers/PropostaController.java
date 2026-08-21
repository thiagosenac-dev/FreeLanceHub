package com.senac.freelancehub.controllers;

import com.senac.freelancehub.entities.Proposta;
import com.senac.freelancehub.repository.PropostaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/propostas")
public class PropostaController {

    @Autowired
    private PropostaRepository propostaRepository;

    @GetMapping
    public ResponseEntity<?> ListarTodos() {

        return ResponseEntity.ok(propostaRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Proposta> criar(@RequestBody Proposta proposta) {
        var propostaBanco = propostaRepository.save(proposta);
        return ResponseEntity.ok(propostaBanco);
    }

}