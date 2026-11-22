package com.senac.freelancehub.application.ports;

import com.senac.freelancehub.application.DTOs.AtualizarStatusRequest;
import com.senac.freelancehub.application.DTOs.CategoriaRequest;
import com.senac.freelancehub.application.DTOs.CategoriaResponse;
import java.util.List;

// Porta (interface) do serviço de categorias: quem usa (controllers, filtro) depende desta interface, não da classe
public interface CategoriaServicePort {

    // lista todas as categorias (tela do admin)
    List<CategoriaResponse> listarTodasCategoriasGrid();

    // lista as categorias sem login (área pública)
    List<CategoriaResponse> listarCategoriasPublicas();

    // busca a categoria pelo id
    CategoriaResponse buscarPorId(Long id);

    // cria (id 0) ou atualiza a categoria
    CategoriaResponse salvarCategoria(CategoriaRequest request, Long id);

    // altera o status da categoria (ativo ou bloqueado)
    boolean atualizarStatus(Long id, AtualizarStatusRequest statusRequest);

    // exclusão lógica (status EXCLUIDO)
    boolean excluir(Long id);
}
