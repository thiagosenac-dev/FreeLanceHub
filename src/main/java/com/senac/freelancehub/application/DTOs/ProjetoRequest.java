package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.EnumStatusProjeto;

// dados para criar ou atualizar o projeto
public record ProjetoRequest(String nome, String descricao, Double valor, String prazo, EnumStatusProjeto status, Long categoriaId) {
}
