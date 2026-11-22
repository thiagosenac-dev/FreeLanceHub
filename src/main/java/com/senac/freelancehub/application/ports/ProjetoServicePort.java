package com.senac.freelancehub.application.ports;

import com.senac.freelancehub.application.DTOs.AtualizarStatusProjetoRequest;
import com.senac.freelancehub.application.DTOs.ProjetoRequest;
import com.senac.freelancehub.application.DTOs.ProjetoResponse;
import java.util.List;

// Porta (interface) do serviço de projetos: quem usa (controllers, filtro) depende desta interface, não da classe
public interface ProjetoServicePort {

    // lista os projetos (admin vê todos, o cliente só os dele)
    List<ProjetoResponse> ListarTodosProjetosGrid();

    // lista os projetos abertos, sem login
    List<ProjetoResponse> listarProjetosPublicos();

    // busca um projeto aberto, sem login
    ProjetoResponse buscarPublicoPorId(Long id);

    // lista os projetos abertos das habilidades do freelancer logado
    List<ProjetoResponse> listarProjetosDoFreelancer();

    // busca o projeto (só o dono ou o admin)
    ProjetoResponse buscarPorId(Long id);

    // cria (id 0) ou atualiza o projeto
    ProjetoResponse salvarProjeto(ProjetoRequest request, Long id);

    // altera o status do projeto
    boolean atualizarStatus(Long id, AtualizarStatusProjetoRequest statusRequest);

    // exclusão lógica (o projeto fica cancelado)
    boolean excluir(Long id);
}
