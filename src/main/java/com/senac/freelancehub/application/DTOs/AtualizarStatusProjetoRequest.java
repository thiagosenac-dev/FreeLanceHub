package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.EnumStatusProjeto;

// dado para trocar o status do projeto
public record AtualizarStatusProjetoRequest(EnumStatusProjeto status) {
}
