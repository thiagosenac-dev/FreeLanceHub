package com.senac.freelancehub.application.services;

import com.senac.freelancehub.application.DTOs.LoginRequest;
import com.senac.freelancehub.application.DTOs.LoginResponse;
import com.senac.freelancehub.application.DTOs.UsuarioResponse;
import com.senac.freelancehub.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public LoginResponse validarUsuarioAutenticadoRetornaToken (LoginRequest request){

        if (usuarioRepository.existsUsuarioByEmailAndSenha(request.email(), request.senha())) {

            var token = tokenService.gerarToken(request.email());

            return new LoginResponse((token));
        }
        return null;
    }


    public List<UsuarioResponse> ListarTodosUsuariosGrid() {


        return usuarioRepository
                .findAll()
                .stream()
                .map(UsuarioResponse::new)
                .toList();

    }
}
