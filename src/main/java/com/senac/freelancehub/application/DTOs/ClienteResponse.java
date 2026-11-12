package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.Cliente;
import com.senac.freelancehub.domain.entities.EnumStatus;

public record ClienteResponse (long id, String nome, String cpf, String email, String telefone, EnumStatus status,
                              String cep, String logradouro, String bairro, String cidade, String uf) {

    public ClienteResponse (Cliente clienteIdentidade) {
        this (
                clienteIdentidade.getId(),
                clienteIdentidade.getNome(),
                clienteIdentidade.getCpf(),
                clienteIdentidade.getEmail(),
                clienteIdentidade.getTelefone(),
                clienteIdentidade.getStatus(),
                clienteIdentidade.getCep(),
                clienteIdentidade.getLogradouro(),
                clienteIdentidade.getBairro(),
                clienteIdentidade.getCidade(),
                clienteIdentidade.getUf()
        );
    }
}
