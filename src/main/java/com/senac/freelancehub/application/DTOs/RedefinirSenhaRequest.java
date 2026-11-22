package com.senac.freelancehub.application.DTOs;

// token e nova senha da recuperação (rota hoje comentada no AuthController)
public record RedefinirSenhaRequest(String token, String novaSenha) {
}
