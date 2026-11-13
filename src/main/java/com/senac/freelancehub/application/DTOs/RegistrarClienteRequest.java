package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.EnumTipoCliente;

// MUDANÇA (novo): cadastro público do cliente (pessoa ou empresa). Pessoa usa o cpf, empresa usa razaoSocial e cnpj
public record RegistrarClienteRequest(EnumTipoCliente tipo, String nome, String razaoSocial, String cpf, String cnpj,
                                      String email, String telefone, String senha,
                                      String cep, String logradouro, String bairro, String cidade, String uf) {
}
