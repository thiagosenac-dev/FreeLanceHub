package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.Usuario;
import com.senac.freelancehub.domain.valueobject.CPF;

public record UsuarioLogado(Long id, String email, CPF cpf,
                            java.util.Collection<? extends org.springframework.security.core.GrantedAuthority> authorities) {

    public UsuarioLogado(Usuario usuario){
        this(
                usuario.getId(),
                usuario.getEmail(),
                usuario.getCpf(),
                usuario.getAuthorities()
        );
    }

    // admin e gerente veem todos os cadastros
    public boolean veTudo(){
        return authorities.stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN")
                        || a.getAuthority().equals("ROLE_GERENTE"));
    }
}