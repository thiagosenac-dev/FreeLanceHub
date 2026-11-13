package com.senac.freelancehub.application.DTOs;

// MUDANÇA: saiu o clienteId (o admin não liga mais usuário a empresa), entrou o endereço (ViaCEP) do freelancer
public record UsuarioRequest(String nome,String email,String senha,String cpf,
                             String cep, String logradouro, String bairro, String cidade, String uf) {
}
