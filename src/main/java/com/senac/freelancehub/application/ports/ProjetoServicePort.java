package com.senac.freelancehub.application.ports;

import com.senac.freelancehub.application.DTOs.AtualizarStatusProjetoRequest;
import com.senac.freelancehub.application.DTOs.ProjetoRequest;
import com.senac.freelancehub.application.DTOs.ProjetoResponse;
import java.util.List;

// Porta (interface) do serviço de projetos: quem usa (controllers, filtro) depende desta interface, não da classe
public interface ProjetoServicePort {

    List<ProjetoResponse> ListarTodosProjetosGrid();

    List<ProjetoResponse> listarProjetosPublicos();

    ProjetoResponse buscarPublicoPorId(Long id);

    List<ProjetoResponse> listarProjetosDoFreelancer();

    ProjetoResponse buscarPorId(Long id);

    ProjetoResponse salvarProjeto(ProjetoRequest request, Long id);

    boolean atualizarStatus(Long id, AtualizarStatusProjetoRequest statusRequest);

    boolean excluir(Long id);
}
