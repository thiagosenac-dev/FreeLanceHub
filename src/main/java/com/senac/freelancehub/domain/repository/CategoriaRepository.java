package com.senac.freelancehub.domain.repository;

import com.senac.freelancehub.domain.entities.Categoria;
import com.senac.freelancehub.domain.entities.EnumStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    Optional<List<Categoria>> findByStatus(EnumStatus status);

}
