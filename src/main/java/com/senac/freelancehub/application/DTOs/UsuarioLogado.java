package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.Usuario;
import com.senac.freelancehub.domain.valueobject.CPF;

// MUDANÇA: saiu o empresa_id fixo e o veTudo (gerente), entrou o cliente_id (igual ao empresa_id do professor)
public record UsuarioLogado(Long id, String email, CPF cpf,
                            Long cliente_id,
                            java.util.Collection<? extends org.springframework.security.core.GrantedAuthority> authorities) {

    public UsuarioLogado(Usuario usuario){
        this(
                usuario.getId(),
                usuario.getEmail(),
                usuario.getCpf(),
                // cliente (empresa) do usuário, fica null se ele não tiver (admin e freelancer)
                usuario.getCliente() != null ? usuario.getCliente().getId() : null,
                usuario.getAuthorities()
        );
    }

    // true se o usuário é admin
    public boolean ehAdmin(){
        return authorities.stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
    }
}
