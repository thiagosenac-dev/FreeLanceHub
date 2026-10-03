package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.Usuario;

public record UsuarioResponse (long id, String nome, String cpf, String email, Enum status) {

    public UsuarioResponse (Usuario usuarioIdentidade) {
        this (
            usuarioIdentidade.getId(),
            usuarioIdentidade.getNome(),
            usuarioIdentidade.getCpf(),
            usuarioIdentidade.getEmail(),
            usuarioIdentidade.getStatus()
        );

    }
}
