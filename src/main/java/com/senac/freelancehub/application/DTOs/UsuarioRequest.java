package com.senac.freelancehub.application.DTOs;

public record UsuarioRequest(String nome,String email,String senha,String cpf, Long clienteId) {
}