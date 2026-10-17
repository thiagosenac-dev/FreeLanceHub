package com.senac.freelancehub.application.DTOs;
import com.senac.freelancehub.domain.entities.EnumStatus;

// serve pra usuário e cliente, os dois usam o mesmo enum
public record AtualizarStatusRequest(EnumStatus status) {
}
