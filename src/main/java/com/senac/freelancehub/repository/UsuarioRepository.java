package com.senac.freelancehub.repository;
import com.senac.freelancehub.entities.EnumStatusUsuario;
import com.senac.freelancehub.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    boolean existsUsuarioByEmailAndSenha(String email, String senha);

    Optional<List<Usuario>> findByStatus(EnumStatusUsuario status);

    Optional<Usuario> findByEmail(String email);

}
