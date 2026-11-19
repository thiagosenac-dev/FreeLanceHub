package com.senac.freelancehub.application.DTOs;

import com.senac.freelancehub.domain.entities.EnumStatus;
import com.senac.freelancehub.domain.entities.EnumStatusProjeto;
import com.senac.freelancehub.domain.entities.EnumStatusProposta;
import com.senac.freelancehub.domain.entities.Proposta;

// MUDANÇA: entrou o contato do freelancer (nome e e-mail) e o nome do projeto
// MUDANÇA: entrou o projetoAberto (false se o projeto não está mais aberto ou a empresa está bloqueada/excluída)
public record PropostaResponse (long id, String descricao, Double valor, String prazo, EnumStatusProposta status, Long projetoId,
                                String freelancerNome, String freelancerEmail, String projetoNome, boolean projetoAberto) {

    public PropostaResponse (Proposta propostaIdentidade) {
        this (
                propostaIdentidade.getId(),
                propostaIdentidade.getDescricao(),
                propostaIdentidade.getValor(),
                propostaIdentidade.getPrazo(),
                propostaIdentidade.getStatus(),
                propostaIdentidade.getProjeto() != null ? propostaIdentidade.getProjeto().getId() : null,
                propostaIdentidade.getUsuario() != null ? propostaIdentidade.getUsuario().getNome() : null,
                propostaIdentidade.getUsuario() != null ? propostaIdentidade.getUsuario().getEmail() : null,
                propostaIdentidade.getProjeto() != null ? propostaIdentidade.getProjeto().getNome() : null,
                propostaIdentidade.getProjeto() != null
                        && propostaIdentidade.getProjeto().getStatus() == EnumStatusProjeto.ABERTO
                        && (propostaIdentidade.getProjeto().getCliente() == null
                            || propostaIdentidade.getProjeto().getCliente().getStatus() == null
                            || propostaIdentidade.getProjeto().getCliente().getStatus() == EnumStatus.ATIVO)
        );
    }
}
