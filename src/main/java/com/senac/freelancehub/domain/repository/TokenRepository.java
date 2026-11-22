package com.senac.freelancehub.domain.repository;

import com.senac.freelancehub.domain.entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// acesso ao banco dos tokens
@Repository
public interface TokenRepository extends JpaRepository<Token,Long> {


    // busca o token salvo no banco
    Optional<Token> findTokenByToken(String token);
}