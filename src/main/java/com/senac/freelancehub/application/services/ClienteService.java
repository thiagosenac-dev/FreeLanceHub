package com.senac.freelancehub.application.services;

import com.senac.freelancehub.application.DTOs.AtualizarStatusClienteRequest;
import com.senac.freelancehub.application.DTOs.AtualizarStatusUsuarioRequest;
import com.senac.freelancehub.application.DTOs.ClienteResponse;
import com.senac.freelancehub.application.DTOs.UsuarioResponse;
import com.senac.freelancehub.domain.entities.Cliente;
import com.senac.freelancehub.domain.entities.EnumStatus;
import com.senac.freelancehub.domain.entities.Usuario;
import com.senac.freelancehub.domain.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    // busca todos os clientes, devolve vazio se não existir
    public List<ClienteResponse> ListarTodosClientesGrid() {



        return clienteRepository
                .findAll()
                .stream()
                .map(ClienteResponse::new)
                .toList();

    }
    // busca o cliente pelo id, devolve vazio se não existir
    public Optional<Cliente> buscarPorId(Long id) {
        return clienteRepository.findById(id);
    }
    // salva um novo cliente no banco e devolve ele já com o id
    public Cliente criar(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    // altera o status do cliente, devolve false se ele não existir
    public boolean atualizarStatus(Long id, AtualizarStatusClienteRequest statusRequest) {

        Cliente clienteBanco = clienteRepository.findById(id).orElse(null);
        if (clienteBanco == null) {
            return false;
        }
        clienteBanco.setStatus(statusRequest.status());
        clienteRepository.save(clienteBanco);
        return true;
    }
    // altera os dados do cliente, devolve false se ele não existir
    public boolean atualizarCliente(Long id, Cliente cliente) {

        Cliente clienetBanco = clienteRepository.findById(id).orElse(null);

        if (clienetBanco == null) {
            return false;
        }

        clienetBanco.setStatus(cliente.getStatus());
        clienetBanco.setNome(cliente.getNome());
        clienetBanco.setEmail(cliente.getEmail());
        clienetBanco.setTelefone(cliente.getTelefone());
        clienetBanco.setCpf(cliente.getCpf());
        clienteRepository.save(clienetBanco);
        return true;
    }

    // inativa o cliente (status EXCLUIDO), devolve false se ele não existir
    public boolean excluir(Long id) {

        Cliente clienteBanco = clienteRepository.findById(id).orElse(null);

        if (clienteBanco == null) {
            return false;
        }

        clienteBanco.setStatus(EnumStatus.EXCLUIDO);
        clienteRepository.save(clienteBanco);
        return true;
    }

}
