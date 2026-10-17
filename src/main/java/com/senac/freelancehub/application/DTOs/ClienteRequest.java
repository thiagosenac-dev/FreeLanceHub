package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.EnumStatus;

public record ClienteRequest(String nome, String cpf, String email, String telefone, EnumStatus status) {
}
