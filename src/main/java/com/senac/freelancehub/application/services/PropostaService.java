package com.senac.freelancehub.application.services;

import com.senac.freelancehub.application.DTOs.AtualizarStatusPropostaRequest;
import com.senac.freelancehub.application.DTOs.PropostaRequest;
import com.senac.freelancehub.application.DTOs.PropostaResponse;
import com.senac.freelancehub.domain.entities.EnumStatusProjeto;
import com.senac.freelancehub.domain.entities.EnumStatusProposta;
import com.senac.freelancehub.domain.entities.Proposta;
import com.senac.freelancehub.domain.repository.ProjetoRepository;
import com.senac.freelancehub.domain.repository.PropostaRepository;
import com.senac.freelancehub.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PropostaService {

    @Autowired
    private PropostaRepository propostaRepository;

    @Autowired
    private ProjetoRepository projetoRepository; // MUDANÇA: para ligar a proposta ao projeto

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    // lista as propostas: admin vê todas, a empresa as dos projetos dela e o freelancer só as que enviou (MUDANÇA)
    public List<PropostaResponse> ListarTodasPropostasGrid() {

        var usuarioLogado = usuarioService.getUsuarioLogado();

        if (usuarioLogado.ehAdmin()) {
            return propostaRepository
                    .findAll()
                    .stream()
                    .map(PropostaResponse::new)
                    .toList();
        }

        // empresa (tem cliente_id) vê as propostas dos projetos do cliente dela
        if (usuarioLogado.cliente_id() != null) {
            return propostaRepository
                    .getPropostasByProjeto_Cliente_Id(usuarioLogado.cliente_id())
                    .stream()
                    .map(PropostaResponse::new)
                    .toList();
        }

        // freelancer vê só as propostas que ele enviou
        return propostaRepository
                .getPropostasByUsuario_Id(usuarioLogado.id())
                .stream()
                .map(PropostaResponse::new)
                .toList();
    }

    // MUDANÇA (novo): lista as propostas de um projeto, só admin ou a empresa dona do projeto
    public List<PropostaResponse> listarPorProjeto(Long projetoId) {

        var usuarioLogado = usuarioService.getUsuarioLogado();

        var projeto = projetoRepository.findById(projetoId).orElse(null);
        if (projeto == null) {
            return null;
        }

        // empresa que não é dona do projeto não vê nada
        boolean donoDoProjeto = projeto.getCliente() != null
                && projeto.getCliente().getId().equals(usuarioLogado.cliente_id());
        if (!usuarioLogado.ehAdmin() && !donoDoProjeto) {
            return new ArrayList<>();
        }

        return propostaRepository
                .getPropostasByProjeto_Id(projetoId)
                .stream()
                .map(PropostaResponse::new)
                .toList();
    }

    // MUDANÇA (novo): admin vê todas, a empresa as dos projetos dela e o freelancer só as dele
    private boolean ehDoUsuario(Proposta proposta) {

        var usuarioLogado = usuarioService.getUsuarioLogado();

        if (usuarioLogado.ehAdmin()) {
            return true;
        }

        // empresa (tem cliente_id)
        if (usuarioLogado.cliente_id() != null) {
            return proposta.getProjeto() != null
                    && proposta.getProjeto().getCliente() != null
                    && proposta.getProjeto().getCliente().getId().equals(usuarioLogado.cliente_id());
        }

        // freelancer
        return proposta.getUsuario() != null
                && proposta.getUsuario().getId().equals(usuarioLogado.id());
    }

    // busca a proposta pelo id, devolve null se não existir
    public PropostaResponse buscarPorId(Long id) {

        var proposta = propostaRepository.findById(id).orElse(null);
        // MUDANÇA: cada um só vê a proposta que pode ver (admin todas, empresa as do cliente, freelancer as dele)
        if (proposta == null || !ehDoUsuario(proposta)) {
            return null;
        }

        return new PropostaResponse(proposta);
    }

    // id 0 cria uma proposta nova, qualquer outro id atualiza a existente (null se não achar)
    public PropostaResponse salvarProposta(PropostaRequest request, Long id) {

        Proposta proposta;

        if (id == 0L) {
            // nova proposta, guarda o usuário que criou
            var usuarioLogado = usuarioService.getUsuarioLogado();

            proposta = new Proposta();
            proposta.setStatus(EnumStatusProposta.PENDENTE);
            proposta.setUsuario(usuarioRepository.findById(usuarioLogado.id()).orElse(null));

            // MUDANÇA: a proposta fica ligada ao projeto escolhido
            var projeto = projetoRepository.findById(request.projetoId()).orElse(null);
            if (projeto == null) {
                throw new IllegalArgumentException("Projeto não encontrado!");
            }
            // MUDANÇA: só uma proposta por projeto para cada freelancer
            if (propostaRepository.existsByUsuario_IdAndProjeto_Id(usuarioLogado.id(), projeto.getId())) {
                throw new IllegalArgumentException("Você já enviou uma proposta para este projeto!");
            }

            // MUDANÇA: o projeto precisa estar aberto e combinar com as habilidades do freelancer
            var freelancer = proposta.getUsuario();
            boolean temHabilidade = freelancer.getHabilidades().stream()
                    .anyMatch(c -> c.getId().equals(projeto.getCategoriaId()));
            if (projeto.getStatus() != EnumStatusProjeto.ABERTO || !temHabilidade) {
                throw new IllegalArgumentException("Projeto indisponível para as suas habilidades!");
            }

            proposta.setProjeto(projeto);
        } else {
            // proposta existente (MUDANÇA: só quem pode ver a proposta)
            proposta = propostaRepository.findById(id).orElse(null);
            if (proposta == null || !ehDoUsuario(proposta)) {
                return null;
            }
            // só dá para alterar uma proposta que ainda está pendente
            if (proposta.getStatus() != EnumStatusProposta.PENDENTE) {
                throw new IllegalArgumentException("Só é possível alterar uma proposta pendente!");
            }
        }

        proposta.setDescricao(request.descricao());
        proposta.setValor(request.valor());
        proposta.setPrazo(request.prazo());
        // MUDANÇA: o status não muda mais por aqui, só pelo PATCH (aceitar ou recusar é da empresa)

        propostaRepository.save(proposta);
        return new PropostaResponse(proposta);
    }

    // altera o status da proposta, devolve false se ela não existir
    public boolean atualizarStatus(Long id, AtualizarStatusPropostaRequest statusRequest) {

        Proposta propostaBanco = propostaRepository.findById(id).orElse(null);
        if (propostaBanco == null || !ehDoUsuario(propostaBanco)) {
            return false;
        }

        // MUDANÇA: ao aceitar uma proposta, as outras pendentes do mesmo projeto são recusadas automaticamente
        if (statusRequest.status() == EnumStatusProposta.ACEITA) {

            var projeto = propostaBanco.getProjeto();
            if (projeto.getStatus() != EnumStatusProjeto.ABERTO) {
                throw new IllegalArgumentException("Esse projeto já tem uma proposta aceita!");
            }

            propostaRepository.getPropostasByProjeto_Id(projeto.getId()).stream()
                    .filter(outra -> !outra.getId().equals(propostaBanco.getId())
                            && outra.getStatus() == EnumStatusProposta.PENDENTE)
                    .forEach(outra -> {
                        outra.setStatus(EnumStatusProposta.RECUSADA);
                        propostaRepository.save(outra);
                    });

            // o projeto sai da lista de abertos
            projeto.setStatus(EnumStatusProjeto.CONCLUIDO);
            projetoRepository.save(projeto);
        }

        propostaBanco.setStatus(statusRequest.status());
        propostaRepository.save(propostaBanco);
        return true;
    }

    // cancela a proposta (status CANCELADA), devolve false se ela não existir
    public boolean excluir(Long id) {

        Proposta propostaBanco = propostaRepository.findById(id).orElse(null);
        if (propostaBanco == null || !ehDoUsuario(propostaBanco)) { // MUDANÇA: só quem pode ver a proposta
            return false;
        }

        // só dá para cancelar uma proposta que ainda está pendente
        if (propostaBanco.getStatus() != EnumStatusProposta.PENDENTE) {
            throw new IllegalArgumentException("Só é possível cancelar uma proposta pendente!");
        }

        propostaBanco.setStatus(EnumStatusProposta.CANCELADA);
        propostaRepository.save(propostaBanco);
        return true;
    }
}