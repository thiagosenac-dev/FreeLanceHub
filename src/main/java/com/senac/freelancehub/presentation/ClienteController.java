package com.senac.freelancehub.presentation;
import com.senac.freelancehub.application.DTOs.AtualizarStatusClienteRequest;
import com.senac.freelancehub.application.DTOs.ClienteResponse;
import com.senac.freelancehub.application.DTOs.UsuarioResponse;
import com.senac.freelancehub.application.services.ClienteService;
import com.senac.freelancehub.domain.entities.Cliente;
import com.senac.freelancehub.domain.entities.EnumStatus;
import com.senac.freelancehub.domain.repository.ClienteRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
@Tag(name = "Clientes", description = "grupo de API responsável por controlar a estrutura de criação e consulta de usuários do sistema")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de clientes!", description = "Método responsável pela colsulta de todas os usuários sem filtro")
    public ResponseEntity<List<ClienteResponse>> ListarTodos() {

        return ResponseEntity.ok(clienteService.ListarTodosClientesGrid());
    }


    @GetMapping("/{id}")
    @Operation(summary = "Método de consulta de lista de usuários POR ID", description = "Método responsável pela colsulta de usuários por ID")
    public ResponseEntity<Cliente> BuscarPorId(@PathVariable Long id){

        return clienteService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método criar novos usuários!", description = "Método responsável pela colsulta de todas os usuários sem filtro")
    public ResponseEntity<Cliente> criar(@RequestBody Cliente cliente) {

        return ResponseEntity.ok(clienteService.criar(cliente));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Método de aletrar Status", description = "Método responsável aletração dos status dos clientes")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusClienteRequest statusRequest){

        if (clienteService.atualizarStatus(id, statusRequest)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método de alterar iformações do usuário", description = "Método responsável pela alteração de usuários")
    public ResponseEntity<Cliente> atualizarCliente(@PathVariable Long id, @RequestBody Cliente cliente){

        if (clienteService.atualizarCliente(id, cliente)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}/excluir")
    @Operation(summary = "Método de inativação de cadastro", description = "Método responsável inativação do cadastro do cliente")
    public ResponseEntity<Void> excluir(@PathVariable Long id){

        if (clienteService.excluir(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
