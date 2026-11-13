package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.EnumStatus;
import com.senac.freelancehub.domain.entities.Usuario;

// MUDANÇA: entrou o perfil (role) e o endereço do freelancer, para o admin ver e editar
public record UsuarioResponse(Long id, String nome, String cpf, String email, EnumStatus status, String role,
                              String cep, String logradouro, String bairro, String cidade, String uf) {

    public UsuarioResponse(Usuario usuarioEntidade){

        this(
                usuarioEntidade.getId(),
                usuarioEntidade.getNome(),
                // MUDANÇA: usuário do cliente empresa não tem cpf
                usuarioEntidade.getCpf() != null ? usuarioEntidade.getCpf().toString() : "",
                usuarioEntidade.getEmail(),
                usuarioEntidade.getStatus(),
                usuarioEntidade.getRole(),
                usuarioEntidade.getCep(),
                usuarioEntidade.getLogradouro(),
                usuarioEntidade.getBairro(),
                usuarioEntidade.getCidade(),
                usuarioEntidade.getUf()
        );
    }
}
