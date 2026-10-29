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

    // propostas enviadas por um usuário (freelancer)
    List<Proposta> getPropostasByUsuario_Id(Long usuario);

    // MUDANÇA: propostas recebidas pelos projetos de um cliente (empresa)
    List<Proposta> getPropostasByProjeto_Cliente_Id(Long cliente);

    // MUDANÇA: propostas de um projeto
    List<Proposta> getPropostasByProjeto_Id(Long projeto);

    // MUDANÇA: confere se o freelancer já enviou proposta para o projeto
    boolean existsByUsuario_IdAndProjeto_Id(Long usuario, Long projeto);

}