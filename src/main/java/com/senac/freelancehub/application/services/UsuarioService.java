package com.senac.freelancehub.application.services;

import com.senac.freelancehub.application.DTOs.*;
import com.senac.freelancehub.domain.entities.EnumStatus;
import com.senac.freelancehub.domain.entities.Usuario;
import com.senac.freelancehub.application.DTOs.CategoriaResponse;
import com.senac.freelancehub.application.DTOs.HabilidadeRequest;
import com.senac.freelancehub.domain.entities.Categoria;
import com.senac.freelancehub.domain.repository.CategoriaRepository;
import com.senac.freelancehub.domain.repository.ClienteRepository;
import com.senac.freelancehub.domain.repository.UsuarioRepository;
import com.senac.freelancehub.domain.valueobject.CPF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import com.senac.freelancehub.application.ports.TokenServicePort;
import com.senac.freelancehub.application.ports.UsuarioServicePort;

@Service
public class UsuarioService implements UsuarioServicePort {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private TokenServicePort tokenService;

    @Value("${spring.secretkey}")
    private String secret;

    // valida email e senha e devolve o token, ou null se estiver errado
    public LoginResponse validarUsuarioAutenticadoRetornaToken(LoginRequest request) {

        if (usuarioRepository.existsUsuarioByEmailAndSenha(request.email(), request.senha())) {
            // MUDANÇA: devolve também o perfil (role) para o front saber o que mostrar
            var usuario = usuarioRepository.findAll()
                    .stream().filter(u -> u.getEmail().equals(request.email()))
                    .findFirst().orElse(null);
            // usuário bloqueado ou excluído não consegue entrar
            if (usuario.getStatus() == EnumStatus.BLOQUEADO || usuario.getStatus() == EnumStatus.EXCLUIDO) {
                return null;
            }
            // empresa (cliente) bloqueada ou excluída também não entra
            if (usuario.getCliente() != null
                    && (usuario.getCliente().getStatus() == EnumStatus.BLOQUEADO
                    || usuario.getCliente().getStatus() == EnumStatus.EXCLUIDO)) {
                return null;
            }
            var token = tokenService.gerarToken(request);
            return new LoginResponse(token, usuario.getRole());
        }
        return null;
    }

    // pega o usuário que está logado (vem do token, colocado pelo JwtFilter)
    public UsuarioLogado getUsuarioLogado() {
        return (UsuarioLogado) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    // busca todos os usuários e devolve já convertidos pra response
    public List<UsuarioResponse> listarTodosUsuariosGrid() {

        return usuarioRepository.findAll()
                .stream()
                .map(UsuarioResponse::new)
                .toList();
    }


    // busca o usuário pelo id, devolve null se não existir
    public UsuarioResponse buscarPorId(Long id) {

        var usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario == null) {
            return null;
        }

        return new UsuarioResponse(usuario);
    }

    // id 0 cria um usuário novo, qualquer outro id atualiza o existente (null se não achar)
    public UsuarioResponse salvarUsuario(UsuarioRequest request, Long id) {

        var usuarioLogado = getUsuarioLogado();

        // novo usuário (MUDANÇA: criado pelo admin, é do tipo empresa e fica ligado a um cliente)
        if (id == 0L) {
            if (request.clienteId() == null) {
                throw new IllegalArgumentException("Informe o clienteId!");
            }
            var cliente = clienteRepository.findById(request.clienteId()).orElse(null);
            if (cliente == null) {
                throw new IllegalArgumentException("Cliente não encontrado!");
            }
            if (usuarioRepository.existsByEmail(request.email())) {
                throw new IllegalArgumentException("E-mail já cadastrado!");
            }
            Usuario usuarioNovo = new Usuario(request);
            usuarioNovo.setRole("ROLE_EMPRESA");
            usuarioNovo.setCliente(cliente);
            usuarioRepository.save(usuarioNovo);
            return new UsuarioResponse(usuarioNovo);
        }

        // usuário existente
        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if (usuarioBanco == null) {
            return null;
        }

        if (!request.email().equals(usuarioBanco.getEmail()) && usuarioRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("E-mail já cadastrado!");
        }

        usuarioBanco.setNome(request.nome());
        usuarioBanco.setCpf(new CPF(request.cpf()));
        usuarioBanco.setEmail(request.email());
        usuarioBanco.setSenha(request.senha());
        usuarioRepository.save(usuarioBanco);
        return new UsuarioResponse(usuarioBanco);
    }

    // altera o status do usuário, devolve false se ele não existir
    public boolean atualizarStatus(Long id, AtualizarStatusRequest statusRequest) {

        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if (usuarioBanco == null) {
            return false;
        }

        usuarioBanco.setStatus(statusRequest.status());
        usuarioRepository.save(usuarioBanco);
        return true;
    }

    // inativa o usuário (status EXCLUIDO), devolve false se ele não existir
    public boolean excluir(Long id) {

        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if (usuarioBanco == null) {
            return false;
        }

        usuarioBanco.setStatus(EnumStatus.EXCLUIDO);
        usuarioRepository.save(usuarioBanco);
        return true;
    }

    // cria o admin só se a secretKey bater com a do application.properties
    public CriarAdminResponse criarAdmin(CriarAdminRequest criarAdminRequest) {

        if (!criarAdminRequest.secretKey().equals(secret)) {
            throw new IllegalArgumentException("Chave secreta inválida!");
        }

        if (usuarioRepository.existsByEmail(criarAdminRequest.email())) {
            throw new IllegalArgumentException("E-mail já cadastrado!");
        }

        Usuario usuarioAdminSalvar = new Usuario(criarAdminRequest);
        usuarioAdminSalvar.setStatus(EnumStatus.ATIVO);
        usuarioRepository.save(usuarioAdminSalvar);

        return new CriarAdminResponse(usuarioAdminSalvar.getId(), "Usuario Salvo com sucesso!");
    }

    // MUDANÇA (novo): lista as habilidades (categorias) do freelancer logado
    public List<CategoriaResponse> listarHabilidades() {

        Usuario usuarioBanco = usuarioRepository.findById(getUsuarioLogado().id()).orElse(null);

        return usuarioBanco.getHabilidades()
                .stream()
                .map(CategoriaResponse::new)
                .toList();
    }

    // MUDANÇA (novo): adiciona uma habilidade ao freelancer logado (igual ao matricularAluno do professor)
    public boolean adicionarHabilidade(HabilidadeRequest habilidadeRequest) {

        Usuario usuarioBanco = usuarioRepository.findById(getUsuarioLogado().id()).orElse(null);
        Categoria categoriaBanco = categoriaRepository.findById(habilidadeRequest.categoria_id()).orElse(null);
        if (usuarioBanco != null && categoriaBanco != null) {

            var habilidade = usuarioBanco.getHabilidades().stream()
                    .anyMatch(c -> c.getId().equals(categoriaBanco.getId()));

            if (habilidade) {
                return true;
            } else {
                usuarioBanco.getHabilidades().add(categoriaBanco);
                usuarioRepository.save(usuarioBanco);
                return true;
            }
        }
        return false;
    }

    // MUDANÇA (novo): remove uma habilidade do freelancer logado
    public boolean removerHabilidade(Long categoriaId) {

        Usuario usuarioBanco = usuarioRepository.findById(getUsuarioLogado().id()).orElse(null);
        if (usuarioBanco == null) {
            return false;
        }

        usuarioBanco.getHabilidades().removeIf(c -> c.getId().equals(categoriaId));
        usuarioRepository.save(usuarioBanco);
        return true;
    }

    // busca os dados do usuário que está logado (vem do token)
    public UsuarioResponse BuscarUsuarioLogado() {
        try {
            var usuarioLogado = getUsuarioLogado();
            return usuarioRepository.findById(usuarioLogado.id())
                    .stream()
                    .map(UsuarioResponse::new).findFirst().orElse(null);

        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar usuario logado!");
        }
    }

    // MUDANÇA (novo): cadastro público, cria um usuário freelancer
    public UsuarioResponse registrarFreelancer(UsuarioRequest request) {

        if (usuarioRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("E-mail já cadastrado!");
        }

        Usuario freelancer = new Usuario(request);
        usuarioRepository.save(freelancer);

        return new UsuarioResponse(freelancer);
    }
}