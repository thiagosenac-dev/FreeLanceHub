package com.senac.freelancehub.application.services;

import com.senac.freelancehub.application.DTOs.*;
import com.senac.freelancehub.domain.entities.EnumStatus;
import com.senac.freelancehub.domain.entities.Usuario;
import java.util.Optional;
import com.senac.freelancehub.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.web.bind.annotation.RequestBody;

import java.net.HttpURLConnection;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenService tokenService;

    @Value("${spring.secretkey}")
    private String secret;


    public LoginResponse validarUsuarioAutenticadoRetornaToken (LoginRequest request){

        if (usuarioRepository.existsUsuarioByEmailAndSenha(request.email(), request.senha())) {
            var token = tokenService.gerarToken(request.email());
            return new LoginResponse((token));
        }
        return null;
    }

    // busca todos os usuários, devolve vazio se não existir
    public List<UsuarioResponse> ListarTodosUsuariosGrid() {


        return usuarioRepository
                .findAll()
                .stream()
                .map(UsuarioResponse::new)
                .toList();

    }

    // busca o usuário pelo id, devolve vazio se não existir
    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    // salva um novo usuário no banco e devolve ele já com o id
    public Usuario criar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // altera o status do usuário, devolve false se ele não existir
    public boolean atualizarStatus(Long id, AtualizarStatusUsuarioRequest statusRequest) {

        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco == null) {
            return false;
        }

        usuarioBanco.setStatus(statusRequest.status());
        usuarioRepository.save(usuarioBanco);
        return true;
    }

    // altera os dados do usuário, devolve false se ele não existir
    public boolean atualizarUsuario(Long id, Usuario usuario) {

        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco == null) {
            return false;
        }

        usuarioBanco.setStatus(usuario.getStatus());
        usuarioBanco.setNome(usuario.getNome());
        usuarioBanco.setEmail(usuario.getEmail());
        usuarioBanco.setCpf(usuario.getCpf());
        usuarioBanco.setSenha(usuario.getSenha());
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



    public CriarAdminResponse criarAdmin(CriarAdminRequest criarAdminRequest) {

        if(!criarAdminRequest.secretKey().equals(secret)){
            return new CriarAdminResponse(0L,"Usuario Salvo com sucesso!");

        }

        Usuario usuarioAdminSalvar = new Usuario(criarAdminRequest);
        usuarioAdminSalvar.setStatus(EnumStatus.ATIVO);
        usuarioRepository.save(usuarioAdminSalvar);

        return new CriarAdminResponse(usuarioAdminSalvar.getId(),"Usuario Salvo com sucesso!");
    }
}



