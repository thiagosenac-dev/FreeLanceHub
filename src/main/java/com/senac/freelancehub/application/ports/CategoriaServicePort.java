package com.senac.freelancehub.application.ports;

import com.senac.freelancehub.application.DTOs.AtualizarStatusRequest;
import com.senac.freelancehub.application.DTOs.CategoriaRequest;
import com.senac.freelancehub.application.DTOs.CategoriaResponse;
import java.util.List;

// Porta (interface) do serviço de categorias: quem usa (controllers, filtro) depende desta interface, não da classe
public interface CategoriaServicePort {

    List<CategoriaResponse> listarTodasCategoriasGrid();

    List<CategoriaResponse> listarCategoriasPublicas();

    CategoriaResponse buscarPorId(Long id);

    CategoriaResponse salvarCategoria(CategoriaRequest request, Long id);

    boolean atualizarStatus(Long id, AtualizarStatusRequest statusRequest);

    boolean excluir(Long id);
}
