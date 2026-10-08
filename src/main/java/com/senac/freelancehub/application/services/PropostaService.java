package com.senac.freelancehub.application.services;
import com.senac.freelancehub.application.DTOs.AtualizarStatusPropostaRequest;
import com.senac.freelancehub.application.DTOs.LoginRequest;
import com.senac.freelancehub.application.DTOs.LoginResponse;
import com.senac.freelancehub.application.DTOs.PropostaResponse;
import com.senac.freelancehub.domain.entities.EnumStatusProposta;
import com.senac.freelancehub.domain.entities.Proposta;
import com.senac.freelancehub.domain.repository.PropostaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    // busca o proposta pelo id, devolve vazio se não existir
    public Optional<Proposta> buscarPorId(Long id) {
        return propostaRepository.findById(id);
    }

    // salva um novo proposta no banco e devolve ele já com o id
    public Proposta criar(Proposta proposta) {
        return propostaRepository.save(proposta);
    }

    // altera o status do proposta, devolve false se ele não existir
    public boolean atualizarStatus(Long id, AtualizarStatusPropostaRequest statusRequest) {

        Proposta propostaBanco = propostaRepository.findById(id).orElse(null);

        if (propostaBanco == null) {
            return false;
        }

        propostaBanco.setStatus(statusRequest.status());
        propostaRepository.save(propostaBanco);
        return true;
    }

    // altera os dados do proposta, devolve false se ele não existir
    public boolean atualizarProposta(Long id, Proposta proposta) {

        Proposta propostaBanco = propostaRepository.findById(id).orElse(null);

        if (propostaBanco == null) {
            return false;
        }

        propostaBanco.setStatus(proposta.getStatus());
        propostaBanco.setDescricao(proposta.getDescricao());
        propostaBanco.setValor(proposta.getValor());
        propostaBanco.setPrazo(proposta.getPrazo());
        propostaRepository.save(propostaBanco);
        return true;
    }

    // inativa o proposta (status EXCLUIDO), devolve false se ele não existir
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
