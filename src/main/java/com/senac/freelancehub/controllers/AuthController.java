package com.senac.freelancehub.controllers;

import com.senac.freelancehub.DTOs.LoginRequest;
import com.senac.freelancehub.DTOs.LoginResponse;
import com.senac.freelancehub.repository.UsuarioRepository;
import com.senac.freelancehub.services.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.HttpURLConnection;


@RestController
@RequestMapping("/auth")
@Tag(name = "Authenticador Controler 'Login'", description = "grupo de API responsável por controlar a estrutura de criação e consulta de usuários do sistema")
public class AuthController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;


    @PostMapping("/login")
    @Operation(summary = "Autenticação de usuários", description = "Método de login")
    public ResponseEntity<?> login (@RequestBody LoginRequest request){

        if (usuarioRepository.existsUsuarioByEmailAndSenha(request.email(), request.senha())){

            var token = tokenService.gerarToken(request.email());

            return ResponseEntity.ok(new LoginResponse(token));
        }

        return ResponseEntity.status(HttpURLConnection.HTTP_UNAUTHORIZED).body("Usuário ou senha inválidos!");
    }
}