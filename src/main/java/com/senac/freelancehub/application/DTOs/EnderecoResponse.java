package com.senac.freelancehub.application.DTOs;

// endereço devolvido pela consulta de CEP
public record EnderecoResponse(String cep, String logradouro, String bairro, String cidade, String uf) {
}
