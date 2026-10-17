package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.EnumStatusProposta;
import com.senac.freelancehub.domain.entities.Proposta;

public record PropostaResponse (long id, String descricao, Double valor, String prazo, EnumStatusProposta status) {

    public PropostaResponse (Proposta propostaIdentidade) {
        this (
                propostaIdentidade.getId(),
                propostaIdentidade.getDescricao(),
                propostaIdentidade.getValor(),
                propostaIdentidade.getPrazo(),
                propostaIdentidade.getStatus()
        );
    }
}
