package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.Categoria;
import com.senac.freelancehub.domain.entities.EnumStatus;

// dados da categoria devolvidos pela API
public record CategoriaResponse(long id, String nome, String descricao, EnumStatus status) {

    public CategoriaResponse(Categoria categoria) {
        this(
                categoria.getId(),
                categoria.getNome(),
                categoria.getDescricao(),
                categoria.getStatus()
        );
    }
}
