package com.senac.freelancehub.domain.repository;
import com.senac.freelancehub.domain.entities.Cliente;
import com.senac.freelancehub.domain.entities.EnumStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// acesso ao banco dos clientes
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    // busca os clientes por status
    Optional<List<Cliente>> findByStatus(EnumStatus status);

}
