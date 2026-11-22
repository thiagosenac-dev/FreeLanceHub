package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.EnumStatus;

// dados para criar ou atualizar a categoria
public record CategoriaRequest(String nome, String descricao, EnumStatus status) {
}
