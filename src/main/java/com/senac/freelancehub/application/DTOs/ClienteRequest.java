package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.EnumStatus;
import com.senac.freelancehub.domain.entities.EnumTipoCliente;

public record ClienteRequest(String nome, String cpf, String email, String telefone, EnumStatus status,
                             String cep, String logradouro, String bairro, String cidade, String uf,
                             EnumTipoCliente tipo, String razaoSocial, String cnpj) {
}
