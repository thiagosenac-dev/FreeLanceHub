package com.senac.freelancehub.controllers;

import com.senac.freelancehub.DTOs.AtualizarStatusClienteRequest;
import com.senac.freelancehub.entities.Cliente;
import com.senac.freelancehub.entities.EnumStatus;
import com.senac.freelancehub.repository.ClienteRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clientes")
@Tag(name = "Clientes", description = "grupo de API responsável por controlar a estrutura de criação e consulta de usuários do sistema")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de usuários!", description = "Método responsável pela colsulta de todas os usuários sem filtro")
    public ResponseEntity<?> ListarTodos() {

        return ResponseEntity.ok(clienteRepository.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Método de consulta de lista de usuários POR ID", description = "Método responsável pela colsulta de usuários por ID")
    public ResponseEntity<Cliente> BuscarPorId(@PathVariable Long id){

        Cliente clienteBanco = clienteRepository.findById(id).orElse(null);
        if (clienteBanco != null){
            return ResponseEntity.ok(clienteBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método criar novos usuários!", description = "Método responsável pela colsulta de todas os usuários sem filtro")
    public ResponseEntity<Cliente> criar(@RequestBody Cliente cliente) {
        var clienteBanco = clienteRepository.save(cliente);
        return ResponseEntity.ok(clienteBanco);
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Método de aletrar Status", description = "Método responsável aletração dos status dos clientes")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusClienteRequest statusRequest){

        Cliente clienteBanco = clienteRepository.findById(id).orElse(null);
        if (clienteBanco != null){
            clienteBanco.setStatus(statusRequest.status());
            clienteRepository.save(clienteBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método de alterar iformações do usuário", description = "Método responsável pela alteração de usuários")
    public ResponseEntity<Cliente> atualizarCliente(@PathVariable Long id, @RequestBody Cliente cliente){

        try {
            Cliente clienteBanco = clienteRepository.findById(id).orElse(null);

            if (clienteBanco != null){
                clienteBanco.setStatus(cliente.getStatus());
                clienteBanco.setNome(cliente.getNome());
                clienteBanco.setEmail(cliente.getEmail());
                clienteBanco.setCpf(cliente.getCpf());
                clienteBanco.setTelefone(cliente.getTelefone());
                clienteRepository.save(clienteBanco);

                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}/excluir")
    @Operation(summary = "Método de inativação de cadastro", description = "Método responsável inativação do cadastro do cliente")
    public ResponseEntity<Void> excluir(@PathVariable Long id){

        Cliente clienteBanco = clienteRepository.findById(id).orElse(null);
        if (clienteBanco != null){
            clienteBanco.setStatus(EnumStatus.EXCLUIDO);
            clienteRepository.save(clienteBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
