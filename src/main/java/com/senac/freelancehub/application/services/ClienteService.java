package com.senac.freelancehub.application.services;

import com.senac.freelancehub.application.DTOs.*;
import com.senac.freelancehub.domain.entities.Cliente;
import com.senac.freelancehub.domain.entities.EnumStatus;
import com.senac.freelancehub.domain.repository.ClienteRepository;
import com.senac.freelancehub.domain.valueobject.CPF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import com.senac.freelancehub.application.ports.ClienteServicePort;

@Service
public class ClienteService implements ClienteServicePort {

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

    // busca o cliente pelo id, devolve null se não existir
    public ClienteResponse buscarPorId(Long id) {

        var cliente = clienteRepository.findById(id).orElse(null);
        if (cliente == null) {
            return null;
        }

        return new ClienteResponse(cliente);
    }

    // id 0 cria um cliente novo, qualquer outro id atualiza o existente (null se não achar)
    public ClienteResponse salvarCliente(ClienteRequest request, Long id) {

        Cliente cliente;

        if (id == 0L) {
            // novo cliente
            cliente = new Cliente();
            cliente.setStatus(EnumStatus.ATIVO);
        } else {
            // cliente existente
            cliente = clienteRepository.findById(id).orElse(null);
            if (cliente == null) {
                return null;
            }
        }

        // valida cpf e email antes de salvar
        if (!CPF.isValidCpf(request.cpf())) throw new IllegalArgumentException("CPF Invalido!");
        if (request.email() == null || !request.email().contains("@")) throw new IllegalArgumentException("Email Invalido!");

        cliente.setNome(request.nome());
        cliente.setCpf(request.cpf());
        cliente.setEmail(request.email());
        cliente.setTelefone(request.telefone());
        if (request.status() != null) {
            cliente.setStatus(request.status());
        }

        clienteRepository.save(cliente);
        return new ClienteResponse(cliente);
    }

    // altera o status do cliente, devolve false se ele não existir
    public boolean atualizarStatus(Long id, AtualizarStatusRequest statusRequest) {

        Cliente clienteBanco = clienteRepository.findById(id).orElse(null);
        if (clienteBanco == null) {
            return false;
        }
        clienteBanco.setStatus(statusRequest.status());
        clienteRepository.save(clienteBanco);
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
