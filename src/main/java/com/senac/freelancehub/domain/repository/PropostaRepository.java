package com.senac.freelancehub.domain.repository;
import com.senac.freelancehub.domain.entities.EnumStatusProposta;
import com.senac.freelancehub.domain.entities.Proposta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PropostaRepository extends JpaRepository<Proposta, Long> {

    Optional<List<Proposta>> findByStatus(EnumStatusProposta status);

}
