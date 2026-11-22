package com.senac.freelancehub.application.DTOs;

// dados para criar o admin (precisa da secretKey)
public record CriarAdminRequest(String nome, String email, String senha, String cpf, String secretKey) {

}
