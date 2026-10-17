package com.senac.freelancehub.application.services;

import com.senac.freelancehub.application.DTOs.AtualizarStatusPropostaRequest;
import com.senac.freelancehub.application.DTOs.PropostaRequest;
import com.senac.freelancehub.application.DTOs.PropostaResponse;
import com.senac.freelancehub.domain.entities.EnumStatusProposta;
import com.senac.freelancehub.domain.entities.Proposta;
import com.senac.freelancehub.domain.repository.PropostaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropostaService {

    @Autowired
    private PropostaRepository propostaRepository;

    // busca todos os proposta, devolve vazio se não existir
    public List<PropostaResponse> ListarTodasPropostasGrid() {

        return propostaRepository
                .findAll()
                .stream()
                .map(PropostaResponse::new)
                .toList();
    }

    // busca a proposta pelo id, devolve null se não existir
    public PropostaResponse buscarPorId(Long id) {

        var proposta = propostaRepository.findById(id).orElse(null);
        if (proposta == null) {
            return null;
        }

        return new PropostaResponse(proposta);
    }

    // id 0 cria uma proposta nova, qualquer outro id atualiza a existente (null se não achar)
    public PropostaResponse salvarProposta(PropostaRequest request, Long id) {

        Proposta proposta;

        if (id == 0L) {
            // nova proposta
            proposta = new Proposta();
            proposta.setStatus(EnumStatusProposta.PENDENTE);
        } else {
            // proposta existente
            proposta = propostaRepository.findById(id).orElse(null);
            if (proposta == null) {
                return null;
            }
        }

        proposta.setDescricao(request.descricao());
        proposta.setValor(request.valor());
        proposta.setPrazo(request.prazo());
        if (request.status() != null) {
            proposta.setStatus(request.status());
        }

        propostaRepository.save(proposta);
        return new PropostaResponse(proposta);
    }

    // altera o status da proposta, devolve false se ela não existir
    public boolean atualizarStatus(Long id, AtualizarStatusPropostaRequest statusRequest) {

        Proposta propostaBanco = propostaRepository.findById(id).orElse(null);
        if (propostaBanco == null) {
            return false;
        }
        propostaBanco.setStatus(statusRequest.status());
        propostaRepository.save(propostaBanco);
        return true;
    }

    // cancela a proposta (status CANCELADA), devolve false se ela não existir
    public boolean excluir(Long id) {

        Proposta propostaBanco = propostaRepository.findById(id).orElse(null);
        if (propostaBanco == null) {
            return false;
        }

        propostaBanco.setStatus(EnumStatusProposta.CANCELADA);
        propostaRepository.save(propostaBanco);
        return true;
    }
}
