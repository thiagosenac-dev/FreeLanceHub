package com.senac.freelancehub.application.ports;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.senac.freelancehub.application.DTOs.LoginRequest;
import com.senac.freelancehub.application.DTOs.UsuarioLogado;

// Porta (interface) do serviço de token JWT: quem usa (controllers, filtro) depende desta interface, não da classe
public interface TokenServicePort {

    String gerarToken(LoginRequest loginResquestDto);

    UsuarioLogado verificarToken(String token) throws JWTVerificationException;
}
