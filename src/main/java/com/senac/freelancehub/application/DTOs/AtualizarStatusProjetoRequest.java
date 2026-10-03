package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.EnumStatusProjeto;

public record AtualizarStatusProjetoRequest(EnumStatusProjeto status) {
}
