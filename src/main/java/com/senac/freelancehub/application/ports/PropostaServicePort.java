package com.senac.freelancehub.application.ports;

import com.senac.freelancehub.application.DTOs.AtualizarStatusPropostaRequest;
import com.senac.freelancehub.application.DTOs.PropostaRequest;
import com.senac.freelancehub.application.DTOs.PropostaResponse;
import java.util.List;

// Porta (interface) do serviço de propostas: quem usa (controllers, filtro) depende desta interface, não da classe
public interface PropostaServicePort {

    // lista as propostas (admin todas, cliente as dos projetos dele, freelancer as que enviou)
    List<PropostaResponse> ListarTodasPropostasGrid();

    // lista as propostas de um projeto (admin ou cliente dono)
    List<PropostaResponse> listarPorProjeto(Long projetoId);

    // busca a proposta pelo id
    PropostaResponse buscarPorId(Long id);

    // cria (id 0) ou atualiza a proposta (uma por projeto para cada freelancer)
    PropostaResponse salvarProposta(PropostaRequest request, Long id);

    // aceita ou recusa a proposta (ao aceitar, as outras são recusadas)
    boolean atualizarStatus(Long id, AtualizarStatusPropostaRequest statusRequest);

    // cancela a proposta (status CANCELADA)
    boolean excluir(Long id);
}
