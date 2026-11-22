package com.senac.freelancehub.application.DTOs;

// token JWT e perfil (role) devolvidos no login
public record LoginResponse(String token, String role) {
}
