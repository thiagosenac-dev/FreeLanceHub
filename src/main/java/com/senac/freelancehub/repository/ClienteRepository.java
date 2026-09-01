package com.senac.freelancehub.repository;
import com.senac.freelancehub.entities.Cliente;
import com.senac.freelancehub.entities.EnumStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    Optional<List<Cliente>> findByStatus(EnumStatus status);

}
