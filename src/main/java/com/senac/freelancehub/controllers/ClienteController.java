package com.senac.freelancehub.controllers;

import com.senac.freelancehub.entities.Cliente;
import com.senac.freelancehub.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public ResponseEntity<?> ListarTodos() {

        return ResponseEntity.ok(clienteRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Cliente> criar(@RequestBody Cliente cliente) {
        var clienteBanco = clienteRepository.save(cliente);
        return ResponseEntity.ok(clienteBanco);
    }

}