package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.Cliente;
import com.senac.freelancehub.domain.entities.EnumStatus;
import com.senac.freelancehub.domain.entities.EnumTipoCliente;

public record ClienteResponse (long id, String nome, String cpf, String email, String telefone, EnumStatus status,
                              String cep, String logradouro, String bairro, String cidade, String uf,
                              EnumTipoCliente tipo, String razaoSocial, String cnpj) {

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
                clienteIdentidade.getUf(),
                // cliente antigo (sem tipo) é tratado como pessoa
                clienteIdentidade.getTipo() != null ? clienteIdentidade.getTipo() : EnumTipoCliente.PESSOA,
                clienteIdentidade.getRazaoSocial(),
                clienteIdentidade.getCnpj()
        );
    }
}
