package com.senac.freelancehub.domain.repository;
import com.senac.freelancehub.domain.entities.EnumStatus;
import com.senac.freelancehub.domain.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// acesso ao banco dos usuários
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    // confere se existe usuário com esse e-mail e senha (login)
    boolean existsUsuarioByEmailAndSenha(String email, String senha);

    // confere se o e-mail já está cadastrado
    boolean existsByEmail(String email);

    // busca os usuários com status diferente do informado
    Optional<List<Usuario>> findByStatusNot(EnumStatus status);

    // MUDANÇA: usuários (logins) de um cliente, para manter o nome igual quando o admin edita o cliente
    List<Usuario> findByCliente_Id(Long clienteId);
}