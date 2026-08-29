package com.senac.freelancehub.repository;
import com.senac.freelancehub.entities.EnumStatusProposta;
import com.senac.freelancehub.entities.Proposta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PropostaRepository extends JpaRepository<Proposta, Long> {

    Optional<List<Proposta>> findByStatus(EnumStatusProposta status);

}
