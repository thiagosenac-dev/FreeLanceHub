package com.senac.freelancehub.application.services;

import com.senac.freelancehub.application.DTOs.AtualizarStatusPropostaRequest;
import com.senac.freelancehub.application.DTOs.PropostaRequest;
import com.senac.freelancehub.application.DTOs.PropostaResponse;
import com.senac.freelancehub.domain.entities.EnumStatusProposta;
import com.senac.freelancehub.domain.entities.Proposta;
import com.senac.freelancehub.domain.repository.ProjetoRepository;
import com.senac.freelancehub.domain.repository.PropostaRepository;
import com.senac.freelancehub.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import com.senac.freelancehub.application.ports.PropostaServicePort;
import com.senac.freelancehub.application.ports.UsuarioServicePort;

// regras de negócio das propostas (uma por projeto, aceitar recusa as outras)
@Service
public class PropostaService implements PropostaServicePort {

    @Autowired
    private PropostaRepository propostaRepository;

    @Autowired
    private ProjetoRepository projetoRepository; // MUDANÇA: para ligar a proposta ao projeto

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioServicePort usuarioService;

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

        // empresa que não é dona do projeto não vê nada (regra na entidade)
        if (!projeto.podeSerAcessadoPor(usuarioLogado.ehAdmin(), usuarioLogado.cliente_id())) {
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

        return proposta.podeSerAcessadaPor(usuarioLogado.ehAdmin(), usuarioLogado.cliente_id(), usuarioLogado.id());
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
            var freelancer = usuarioRepository.findById(usuarioLogado.id()).orElse(null);

            // MUDANÇA: a proposta fica ligada ao projeto escolhido
            var projeto = projetoRepository.findById(request.projetoId()).orElse(null);
            // o service só consulta o banco; a regra (uma proposta por projeto) fica na entidade
            boolean jaEnviou = projeto != null
                    && propostaRepository.existsByUsuario_IdAndProjeto_Id(usuarioLogado.id(), projeto.getId());

            // projeto existe, uma proposta por projeto, projeto aberto e habilidade do freelancer (regras na entidade)
            proposta.enviar(freelancer, projeto, jaEnviou);
        } else {
            // proposta existente (MUDANÇA: só quem pode ver a proposta)
            proposta = propostaRepository.findById(id).orElse(null);
            if (proposta == null || !ehDoUsuario(proposta)) {
                return null;
            }
            // só dá para alterar uma proposta que ainda está pendente (regra na entidade)
            proposta.validarEdicao();
        }

        proposta.atualizarDados(request.descricao(), request.valor(), request.prazo());
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

        if (statusRequest.status() == EnumStatusProposta.ACEITA) {
            // a entidade aceita, recusa as outras pendentes e conclui o projeto; o service só busca e salva
            var projeto = propostaBanco.getProjeto();
            var outras = projeto == null ? java.util.List.<Proposta>of() : propostaRepository.getPropostasByProjeto_Id(projeto.getId());
            propostaRepository.saveAll(propostaBanco.aceitar(outras));
            projetoRepository.save(projeto);
        } else {
            // a entidade valida se o projeto ainda está aberto e troca o status
            propostaBanco.alterarStatus(statusRequest.status());
        }

        propostaRepository.save(propostaBanco);
        return true;
    }

    // cancela a proposta (status CANCELADA), devolve false se ela não existir
    public boolean excluir(Long id) {

        Proposta propostaBanco = propostaRepository.findById(id).orElse(null);
        if (propostaBanco == null || !ehDoUsuario(propostaBanco)) { // MUDANÇA: só quem pode ver a proposta
            return false;
        }

        // só dá para cancelar uma proposta que ainda está pendente (regra na entidade)
        propostaBanco.cancelar();
        propostaRepository.save(propostaBanco);
        return true;
    }
}