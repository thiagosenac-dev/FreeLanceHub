package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.EnumStatus;

public record CategoriaRequest(String nome, String descricao, EnumStatus status) {
}
