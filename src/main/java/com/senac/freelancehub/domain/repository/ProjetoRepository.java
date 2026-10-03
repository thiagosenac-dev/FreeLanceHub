package com.senac.freelancehub.domain.repository;
import com.senac.freelancehub.domain.entities.EnumStatusProjeto;
import com.senac.freelancehub.domain.entities.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjetoRepository extends JpaRepository<Projeto, Long> {

    Optional<List<Projeto>> findByStatus(EnumStatusProjeto status);

}
