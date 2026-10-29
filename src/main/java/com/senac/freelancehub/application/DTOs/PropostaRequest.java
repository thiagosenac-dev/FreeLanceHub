package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.EnumStatusProposta;

public record PropostaRequest(String descricao, Double valor, String prazo, EnumStatusProposta status, Long projetoId) {
}
