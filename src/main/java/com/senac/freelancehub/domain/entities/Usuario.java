package com.senac.freelancehub.domain.entities;

import com.senac.freelancehub.application.DTOs.CriarAdminRequest;
import com.senac.freelancehub.application.DTOs.UsuarioLogado;
import com.senac.freelancehub.application.DTOs.UsuarioRequest;
import com.senac.freelancehub.domain.valueobject.CPF;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    private String nome;

    @Embedded
    private CPF cpf;

    private String senha;

    private String email;

    private String role = "ROLE_USER";

    // status do usuário, começa ativo
    private EnumStatus status = EnumStatus.ATIVO;

    // projetos que o usuário criou
    @OneToMany(mappedBy = "usuario")
    private List<Projeto> projetos;

    // propostas que o usuário criou
    @OneToMany(mappedBy = "usuario")
    private List<Proposta> propostas;

    // valida o email antes de salvar
    public void setEmail(String email) {
        if (!email.isEmpty() && !email.contains("@")) {
            throw new IllegalArgumentException("Email Invalido!");
        }
        this.email = email;
    }

    // cria um admin a partir do request
    public Usuario(CriarAdminRequest criarAdminRequest) {
        this.setCpf(new CPF(criarAdminRequest.cpf()));
        this.setNome(criarAdminRequest.nome());
        this.setSenha(criarAdminRequest.senha());
        this.setEmail(criarAdminRequest.email());
        this.setRole("ROLE_ADMIN");
    }

    // cria um usuário comum a partir do request
    public Usuario(UsuarioRequest usuario) {
        this.setCpf(new CPF(usuario.cpf()));
        this.setNome(usuario.nome());
        this.setSenha(usuario.senha());
        this.setEmail(usuario.email());
        this.setRole("ROLE_USER");
    }

    public UsuarioLogado getUsuarioLogado(){
        return (UsuarioLogado) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role));
    }

    @Override
    public @Nullable String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return "";
    }
}