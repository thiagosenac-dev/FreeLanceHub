package com.senac.freelancehub.application.DTOs;

// token da recuperação de senha (rota hoje comentada no AuthController)
public record EsqueciSenhaResponse(String tokenRecuperacao) {
}
