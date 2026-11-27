package com.senac.freelancehub.application.services;

import com.senac.freelancehub.application.DTOs.*;
import com.senac.freelancehub.domain.entities.Cliente;
import com.senac.freelancehub.domain.entities.Usuario;
import com.senac.freelancehub.domain.repository.ClienteRepository;
import com.senac.freelancehub.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import com.senac.freelancehub.application.ports.ClienteServicePort;

// regras de negócio dos clientes (consulta, edição, status e exclusão)
@Service
public class ClienteService implements ClienteServicePort {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

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
            cliente.ativar();
        } else {
            // cliente existente
            cliente = clienteRepository.findById(id).orElse(null);
            if (cliente == null) {
                return null;
            }
        }

        // o tipo do cliente não muda, usa o que já está salvo (cliente antigo sem tipo é pessoa)
        // a entidade valida o cpf (pessoa) ou o cnpj (empresa) e o email
        cliente.definirDocumento(cliente.ehEmpresa() ? request.razaoSocial() : null, request.cpf(), request.cnpj());
        cliente.definirEmail(request.email());

        cliente.setNome(request.nome());
        cliente.setTelefone(request.telefone());
        cliente.atualizarEndereco(request.cep(), request.logradouro(), request.bairro(), request.cidade(), request.uf());
        if (request.status() != null) {
            cliente.alterarStatus(request.status());
        }

        clienteRepository.save(cliente);

        // MUDANÇA: o nome do login do cliente (mostrado no cabeçalho) acompanha o nome do cliente
        for (Usuario usuarioCliente : usuarioRepository.findByCliente_Id(cliente.getId())) {
            usuarioCliente.setNome(cliente.getNome());
            usuarioRepository.save(usuarioCliente);
        }

        return new ClienteResponse(cliente);
    }

    // altera o status do cliente, devolve false se ele não existir
    public boolean atualizarStatus(Long id, AtualizarStatusRequest statusRequest) {

        Cliente clienteBanco = clienteRepository.findById(id).orElse(null);
        if (clienteBanco == null) {
            return false;
        }
        clienteBanco.alterarStatus(statusRequest.status());
        clienteRepository.save(clienteBanco);
        return true;
    }

    // inativa o cliente (status EXCLUIDO), devolve false se ele não existir
    public boolean excluir(Long id) {

        Cliente clienteBanco = clienteRepository.findById(id).orElse(null);

        if (clienteBanco == null) {
            return false;
        }

        clienteBanco.excluir();
        clienteRepository.save(clienteBanco);
        return true;
    }
}
