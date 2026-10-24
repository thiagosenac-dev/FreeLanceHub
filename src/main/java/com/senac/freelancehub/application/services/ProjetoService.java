package com.senac.freelancehub.application.services;

import com.senac.freelancehub.application.DTOs.AtualizarStatusProjetoRequest;
import com.senac.freelancehub.application.DTOs.ProjetoRequest;
import com.senac.freelancehub.application.DTOs.ProjetoResponse;
import com.senac.freelancehub.domain.entities.EnumStatusProjeto;
import com.senac.freelancehub.domain.entities.Projeto;
import com.senac.freelancehub.domain.repository.ProjetoRepository;
import com.senac.freelancehub.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjetoService {

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    // lista os projetos: admin e gerente veem todos, o usuário comum só os que criou
    public List<ProjetoResponse> ListarTodosProjetosGrid() {

        var usuarioLogado = usuarioService.getUsuarioLogado();

        if (usuarioLogado.veTudo()) {
            return projetoRepository
                    .findAll()
                    .stream()
                    .map(ProjetoResponse::new)
                    .toList();
        }

        return projetoRepository
                .getProjetosByUsuario_Id(usuarioLogado.id())
                .stream()
                .map(ProjetoResponse::new)
                .toList();
    }

    // busca o projeto pelo id, devolve null se não existir
    public ProjetoResponse buscarPorId(Long id) {

        var projeto = projetoRepository.findById(id).orElse(null);
        if (projeto == null) {
            return null;
        }

        return new ProjetoResponse(projeto);
    }

    // id 0 cria um projeto novo, qualquer outro id atualiza o existente (null se não achar)
    public ProjetoResponse salvarProjeto(ProjetoRequest request, Long id) {

        Projeto projeto;

        if (id == 0L) {
            // novo projeto, guarda o usuário que criou
            var usuarioLogado = usuarioService.getUsuarioLogado();

            projeto = new Projeto();
            projeto.setStatus(EnumStatusProjeto.ABERTO);
            projeto.setUsuario(usuarioRepository.findById(usuarioLogado.id()).orElse(null));
        } else {
            // projeto existente
            projeto = projetoRepository.findById(id).orElse(null);
            if (projeto == null) {
                return null;
            }
        }

        projeto.setNome(request.nome());
        projeto.setDescricao(request.descricao());
        projeto.setValor(request.valor());
        projeto.setPrazo(request.prazo());
        projeto.setCategoriaId(request.categoriaId());
        if (request.status() != null) {
            projeto.setStatus(request.status());
        }

        projetoRepository.save(projeto);
        return new ProjetoResponse(projeto);
    }

    // altera o status do projeto, devolve false se ele não existir
    public boolean atualizarStatus(Long id, AtualizarStatusProjetoRequest statusRequest) {

        Projeto projetoBanco = projetoRepository.findById(id).orElse(null);
        if (projetoBanco == null) {
            return false;
        }
        projetoBanco.setStatus(statusRequest.status());
        projetoRepository.save(projetoBanco);
        return true;
    }

    // cancela o projeto (status CANCELADO), devolve false se ele não existir
    public boolean excluir(Long id) {

        Projeto projetoBanco = projetoRepository.findById(id).orElse(null);
        if (projetoBanco == null) {
            return false;
        }

        projetoBanco.setStatus(EnumStatusProjeto.CANCELADO);
        projetoRepository.save(projetoBanco);
        return true;
    }
}