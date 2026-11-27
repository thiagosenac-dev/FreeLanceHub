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

// regras de negócio dos projetos (cada cliente só vê os dele)
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
                .filter(this::clienteAtivo)
                .map(ProjetoResponse::new)
                .toList();
    }

    // MUDANÇA (novo): projeto de cliente bloqueado ou excluído não aparece nas vagas (e não recebe proposta)
    public boolean clienteAtivo(Projeto projeto) {
        return projeto.clienteAtivo();
    }

    // MUDANÇA (novo): admin vê todos, a empresa só os projetos do cliente dela
    private boolean ehDoUsuario(Projeto projeto) {

        var usuarioLogado = usuarioService.getUsuarioLogado();

        return projeto.podeSerAcessadoPor(usuarioLogado.ehAdmin(), usuarioLogado.cliente_id());
    }

    // MUDANÇA (novo): consulta pública por id, só projeto aberto (sem login)
    public ProjetoResponse buscarPublicoPorId(Long id) {

        var projeto = projetoRepository.findById(id).orElse(null);
        if (projeto == null || !projeto.estaDisponivel()) {
            return null;
        }

        return new ProjetoResponse(projeto);
    }

    // MUDANÇA (novo): projetos abertos que combinam com as habilidades do freelancer logado
    public List<ProjetoResponse> listarProjetosDoFreelancer() {

        Usuario freelancer = usuarioRepository.findById(usuarioService.getUsuarioLogado().id()).orElse(null);

        // a entidade diz quais categorias o freelancer pode atender (sem habilidade, nenhuma)
        List<Long> categorias = freelancer.categoriasQuePodeAtender();

        return categorias.isEmpty() ? new ArrayList<>() : projetoRepository
                .getProjetosByStatusAndCategoria_IdIn(EnumStatusProjeto.ABERTO, categorias)
                .stream()
                .filter(this::clienteAtivo)
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
            projeto.abrir(clienteRepository.findById(usuarioLogado.cliente_id()).orElse(null));
        } else {
            // projeto existente (MUDANÇA: só do cliente da empresa)
            projeto = projetoRepository.findById(id).orElse(null);
            if (projeto == null || !ehDoUsuario(projeto)) {
                return null;
            }
            // só dá para editar um projeto que ainda está aberto (regra na entidade)
            projeto.validarEdicao();
        }

        // a categoria precisa existir (a entidade recusa categoria nula)
        var categoria = request.categoriaId() == null ? null : categoriaRepository.findById(request.categoriaId()).orElse(null);
        projeto.atualizarDados(request.nome(), request.descricao(), request.valor(), request.prazo(), categoria);
        // no cadastro o projeto sempre nasce ABERTO; na edição a entidade troca o status se veio um novo
        if (id != 0L) {
            projeto.alterarStatus(request.status());
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
        projetoBanco.alterarStatus(statusRequest.status());
        projetoRepository.save(projetoBanco);
        return true;
    }

    // cancela o projeto (status CANCELADO), devolve false se ele não existir
    public boolean excluir(Long id) {

        Projeto projetoBanco = projetoRepository.findById(id).orElse(null);
        if (projetoBanco == null || !ehDoUsuario(projetoBanco)) { // MUDANÇA: só do cliente da empresa
            return false;
        }

        projetoBanco.cancelar();
        projetoRepository.save(projetoBanco);
        return true;
    }
}