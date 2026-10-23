package com.senac.freelancehub.application.services;

import com.senac.freelancehub.application.DTOs.*;
import com.senac.freelancehub.domain.entities.EnumStatus;
import com.senac.freelancehub.domain.entities.Usuario;
import com.senac.freelancehub.domain.repository.UsuarioRepository;
import com.senac.freelancehub.domain.valueobject.CPF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenService tokenService;

    @Value("${spring.secretkey}")
    private String secret;

    // valida email e senha e devolve o token, ou null se estiver errado
    public LoginResponse validarUsuarioAutenticadoRetornaToken(LoginRequest request) {

        if (usuarioRepository.existsUsuarioByEmailAndSenha(request.email(), request.senha())) {
            var token = tokenService.gerarToken(request);
            return new LoginResponse(token);
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

        // novo usuário
        if (id == 0L) {
            Usuario usuarioNovo = new Usuario(request);
            usuarioRepository.save(usuarioNovo);
            return new UsuarioResponse(usuarioNovo);
        }

        // usuário existente
        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if (usuarioBanco == null) {
            return null;
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
            return new CriarAdminResponse(0L, "Chave secreta inválida!");
        }

        Usuario usuarioAdminSalvar = new Usuario(criarAdminRequest);
        usuarioAdminSalvar.setStatus(EnumStatus.ATIVO);
        usuarioRepository.save(usuarioAdminSalvar);

        return new CriarAdminResponse(usuarioAdminSalvar.getId(), "Usuario Salvo com sucesso!");
    }
}