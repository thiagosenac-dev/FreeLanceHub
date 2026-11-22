package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.EnumStatusProposta;

// dado para aceitar ou recusar a proposta
public record AtualizarStatusPropostaRequest(EnumStatusProposta status) {
}
