package com.senac.freelancehub.controllers;

import com.senac.freelancehub.entities.Projeto;
import com.senac.freelancehub.repository.ProjetoRepository;
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
    public ResponseEntity<?> ListarTodos() {

        return ResponseEntity.ok(projetoRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Projeto> criar(@RequestBody Projeto projeto) {
        var projetoBanco = projetoRepository.save(projeto);
        return ResponseEntity.ok(projetoBanco);
    }

}