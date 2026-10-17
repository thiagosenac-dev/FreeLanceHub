package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.EnumStatusProjeto;
import com.senac.freelancehub.domain.entities.Projeto;

public record ProjetoResponse (long id, String nome, String descricao, Double valor, String prazo, EnumStatusProjeto status, Long categoriaId) {

    public ProjetoResponse (Projeto projetoIdentidade) {
        this (
                projetoIdentidade.getId(),
                projetoIdentidade.getNome(),
                projetoIdentidade.getDescricao(),
                projetoIdentidade.getValor(),
                projetoIdentidade.getPrazo(),
                projetoIdentidade.getStatus(),
                projetoIdentidade.getCategoriaId()
        );
    }
}
