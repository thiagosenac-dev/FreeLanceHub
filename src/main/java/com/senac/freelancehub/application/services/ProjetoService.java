package com.senac.freelancehub.application.services;

import com.senac.freelancehub.application.DTOs.AtualizarStatusProjetoRequest;
import com.senac.freelancehub.application.DTOs.ProjetoResponse;
import com.senac.freelancehub.domain.entities.EnumStatus;
import com.senac.freelancehub.domain.entities.EnumStatusProjeto;
import com.senac.freelancehub.domain.entities.Projeto;
import com.senac.freelancehub.domain.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjetoService {

    @Autowired
    private ProjetoRepository projetoRepository;

    // busca todos os projeto, devolve vazio se não existir
    public List<ProjetoResponse> ListarTodosProjetosGrid() {


        return projetoRepository
                .findAll()
                .stream()
                .map(ProjetoResponse::new)
                .toList();

    }
    // busca o projeto pelo id, devolve vazio se não existir
    public Optional<Projeto> buscarPorId(Long id) {
        return projetoRepository.findById(id);
    }
    // salva um novo projeto no banco e devolve ele já com o id
    public Projeto criar(Projeto projeto) {
        return projetoRepository.save(projeto);
    }

    // altera o status do projeto, devolve false se ele não existir
    public boolean atualizarStatus(Long id, AtualizarStatusProjetoRequest statusRequest) {

        Projeto projetoBanco = projetoRepository.findById(id).orElse(null);
        if (projetoBanco == null) {
            return false;
        }
        projetoBanco.setStatus(statusRequest.status());
        projetoRepository.save(projetoBanco);
        return true;
    }
    // altera os dados do projeto, devolve false se ele não existir
    public boolean atualizarProjeto(Long id, Projeto projeto) {

        Projeto projetoBanco = projetoRepository.findById(id).orElse(null);

        if (projetoBanco == null) {
            return false;
        }

        projetoBanco.setStatus(projeto.getStatus());
        projetoBanco.setNome(projeto.getNome());
        projetoBanco.setDescricao(projeto.getDescricao());
        projetoBanco.setValor(projeto.getValor());
        projetoBanco.setPrazo(projeto.getPrazo());
        projetoRepository.save(projetoBanco);
        return true;
    }

    // inativa o projeto (status EXCLUIDO), devolve false se ele não existir
    public boolean excluir(Long id) {

        Projeto projetoBanco = projetoRepository.findById(id).orElse(null);

        if (projetoBanco == null) {
            return false;
        }

        projetoBanco.setStatus(EnumStatusProjeto.CANCELADO);
        projetoRepository.save(projetoBanco);
        return true;
    }


}

