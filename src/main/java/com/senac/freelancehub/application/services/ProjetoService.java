package com.senac.freelancehub.application.services;

import com.senac.freelancehub.application.DTOs.AtualizarStatusProjetoRequest;
import com.senac.freelancehub.application.DTOs.ProjetoRequest;
import com.senac.freelancehub.application.DTOs.ProjetoResponse;
import com.senac.freelancehub.domain.entities.EnumStatusProjeto;
import com.senac.freelancehub.domain.entities.Projeto;
import com.senac.freelancehub.domain.repository.ProjetoRepository;
import com.senac.freelancehub.domain.entities.Usuario;
import com.senac.freelancehub.domain.repository.CategoriaRepository;
import com.senac.freelancehub.domain.repository.ClienteRepository;
import com.senac.freelancehub.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import com.senac.freelancehub.application.ports.ProjetoServicePort;
import com.senac.freelancehub.application.ports.UsuarioServicePort;

@Service
public class ProjetoService implements ProjetoServicePort {

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository; // MUDANÇA: para buscar o freelancer logado (habilidades)

    @Autowired
    private UsuarioServicePort usuarioService;

    // lista os projetos: admin vê todos, a empresa só os do cliente dela (MUDANÇA: filtro por cliente_id, igual ao empresa_id do professor)
    public List<ProjetoResponse> ListarTodosProjetosGrid() {

        var usuarioLogado = usuarioService.getUsuarioLogado();

        if (usuarioLogado.ehAdmin()) {
            return projetoRepository
                    .findAll()
                    .stream()
                    .map(ProjetoResponse::new)
                    .toList();
        }

        return projetoRepository
                .getProjetosByCliente_Id(usuarioLogado.cliente_id())
                .stream()
                .map(ProjetoResponse::new)
                .toList();
    }

    // MUDANÇA (novo): lista pública, só os projetos abertos (sem login)
    public List<ProjetoResponse> listarProjetosPublicos() {

        return projetoRepository
                .findByStatus(EnumStatusProjeto.ABERTO)
                .orElse(new ArrayList<>())
                .stream()
                .map(ProjetoResponse::new)
                .toList();
    }

    // MUDANÇA (novo): admin vê todos, a empresa só os projetos do cliente dela
    private boolean ehDoUsuario(Projeto projeto) {

        var usuarioLogado = usuarioService.getUsuarioLogado();

        return usuarioLogado.ehAdmin()
                || (projeto.getCliente() != null
                && projeto.getCliente().getId().equals(usuarioLogado.cliente_id()));
    }

    // MUDANÇA (novo): consulta pública por id, só projeto aberto (sem login)
    public ProjetoResponse buscarPublicoPorId(Long id) {

        var projeto = projetoRepository.findById(id).orElse(null);
        if (projeto == null || projeto.getStatus() != EnumStatusProjeto.ABERTO) {
            return null;
        }

        return new ProjetoResponse(projeto);
    }

    // MUDANÇA (novo): projetos abertos que combinam com as habilidades do freelancer logado
    public List<ProjetoResponse> listarProjetosDoFreelancer() {

        Usuario freelancer = usuarioRepository.findById(usuarioService.getUsuarioLogado().id()).orElse(null);

        List<Long> categorias = freelancer.getHabilidades()
                .stream()
                .map(c -> c.getId())
                .toList();

        // sem habilidade cadastrada não vê nenhum projeto
        if (categorias.isEmpty()) {
            return new ArrayList<>();
        }

        return projetoRepository
                .getProjetosByStatusAndCategoria_IdIn(EnumStatusProjeto.ABERTO, categorias)
                .stream()
                .map(ProjetoResponse::new)
                .toList();
    }

    // busca o projeto pelo id, devolve null se não existir
    public ProjetoResponse buscarPorId(Long id) {

        var projeto = projetoRepository.findById(id).orElse(null);
        // MUDANÇA: a empresa só vê projeto do cliente dela (admin vê todos)
        if (projeto == null || !ehDoUsuario(projeto)) {
            return null;
        }

        return new ProjetoResponse(projeto);
    }

    // id 0 cria um projeto novo, qualquer outro id atualiza o existente (null se não achar)
    public ProjetoResponse salvarProjeto(ProjetoRequest request, Long id) {

        Projeto projeto;

        if (id == 0L) {
            // novo projeto, guarda o cliente (empresa) do usuário logado (MUDANÇA: antes guardava o usuário)
            var usuarioLogado = usuarioService.getUsuarioLogado();

            projeto = new Projeto();
            projeto.setStatus(EnumStatusProjeto.ABERTO);
            projeto.setCliente(clienteRepository.findById(usuarioLogado.cliente_id()).orElse(null));
        } else {
            // projeto existente (MUDANÇA: só do cliente da empresa)
            projeto = projetoRepository.findById(id).orElse(null);
            if (projeto == null || !ehDoUsuario(projeto)) {
                return null;
            }
        }

        projeto.setNome(request.nome());
        projeto.setDescricao(request.descricao());
        projeto.setValor(request.valor());
        projeto.setPrazo(request.prazo());
        // a categoria precisa existir
        var categoria = request.categoriaId() == null ? null : categoriaRepository.findById(request.categoriaId()).orElse(null);
        if (categoria == null) {
            throw new IllegalArgumentException("Categoria não encontrada!");
        }
        projeto.setCategoria(categoria);
        // MUDANÇA: o status só muda na edição, no cadastro o projeto sempre nasce ABERTO
        if (id != 0L && request.status() != null) {
            projeto.setStatus(request.status());
        }

        projetoRepository.save(projeto);
        return new ProjetoResponse(projeto);
    }

    // altera o status do projeto, devolve false se ele não existir
    public boolean atualizarStatus(Long id, AtualizarStatusProjetoRequest statusRequest) {

        Projeto projetoBanco = projetoRepository.findById(id).orElse(null);
        if (projetoBanco == null || !ehDoUsuario(projetoBanco)) { // MUDANÇA: só do cliente da empresa
            return false;
        }
        projetoBanco.setStatus(statusRequest.status());
        projetoRepository.save(projetoBanco);
        return true;
    }

    // cancela o projeto (status CANCELADO), devolve false se ele não existir
    public boolean excluir(Long id) {

        Projeto projetoBanco = projetoRepository.findById(id).orElse(null);
        if (projetoBanco == null || !ehDoUsuario(projetoBanco)) { // MUDANÇA: só do cliente da empresa
            return false;
        }

        projetoBanco.setStatus(EnumStatusProjeto.CANCELADO);
        projetoRepository.save(projetoBanco);
        return true;
    }
}