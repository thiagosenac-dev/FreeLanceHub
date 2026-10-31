package com.senac.freelancehub.application.ports;

import com.senac.freelancehub.application.DTOs.AtualizarStatusPropostaRequest;
import com.senac.freelancehub.application.DTOs.PropostaRequest;
import com.senac.freelancehub.application.DTOs.PropostaResponse;
import java.util.List;

// Porta (interface) do serviço de propostas: quem usa (controllers, filtro) depende desta interface, não da classe
public interface PropostaServicePort {

    List<PropostaResponse> ListarTodasPropostasGrid();

    List<PropostaResponse> listarPorProjeto(Long projetoId);

    PropostaResponse buscarPorId(Long id);

    PropostaResponse salvarProposta(PropostaRequest request, Long id);

    boolean atualizarStatus(Long id, AtualizarStatusPropostaRequest statusRequest);

    boolean excluir(Long id);
}
