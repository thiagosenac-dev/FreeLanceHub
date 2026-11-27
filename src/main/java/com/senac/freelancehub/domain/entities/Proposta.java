package com.senac.freelancehub.domain.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// proposta de um freelancer para um projeto
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Proposta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String descricao;
    public Double valor;
    public String prazo;
    public EnumStatusProposta status;

    // usuário (freelancer) que enviou a proposta
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    public Usuario usuario;

    // MUDANÇA: projeto que recebeu a proposta
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "projeto_id", referencedColumnName = "id")
    public Projeto projeto;

    // REGRA: proposta nova nasce PENDENTE; o projeto precisa estar disponível e combinar com as habilidades do freelancer
    // REGRA: o projeto precisa existir e o freelancer só pode mandar uma proposta por projeto
    public void enviar(Usuario freelancer, Projeto projeto, boolean jaEnviouParaEsteProjeto) {
        if (projeto == null) {
            throw new IllegalArgumentException("Projeto não encontrado!");
        }
        if (jaEnviouParaEsteProjeto) {
            throw new IllegalArgumentException("Você já enviou uma proposta para este projeto!");
        }
        if (!projeto.estaDisponivel() || !freelancer.temHabilidade(projeto.getCategoria())) {
            throw new IllegalArgumentException("Projeto indisponível para as suas habilidades!");
        }
        this.usuario = freelancer;
        this.projeto = projeto;
        this.status = EnumStatusProposta.PENDENTE;
    }

    // REGRA: só dá para alterar uma proposta que ainda está pendente
    public void validarEdicao() {
        if (this.status != EnumStatusProposta.PENDENTE) {
            throw new IllegalArgumentException("Só é possível alterar uma proposta pendente!");
        }
    }

    public void atualizarDados(String descricao, Double valor, String prazo) {
        this.descricao = descricao;
        this.valor = valor;
        this.prazo = prazo;
    }

    // REGRA: só aceita ou recusa proposta de projeto ainda disponível; aceitar exige projeto aberto
    public void alterarStatus(EnumStatusProposta novoStatus) {
        boolean decisao = novoStatus == EnumStatusProposta.ACEITA || novoStatus == EnumStatusProposta.RECUSADA;
        if (decisao && (this.projeto == null || !this.projeto.estaDisponivel())) {
            throw new IllegalArgumentException("Esse projeto não está mais aberto!");
        }
        if (novoStatus == EnumStatusProposta.ACEITA && this.projeto.getStatus() != EnumStatusProjeto.ABERTO) {
            throw new IllegalArgumentException("Esse projeto já tem uma proposta aceita!");
        }
        this.status = novoStatus;
    }

    public boolean estaPendente() {
        return this.status == EnumStatusProposta.PENDENTE;
    }

    // REGRA: usado quando outra proposta do mesmo projeto é aceita
    public void recusar() {
        this.status = EnumStatusProposta.RECUSADA;
    }

    // REGRA: só dá para cancelar uma proposta que ainda está pendente
    public void cancelar() {
        if (!estaPendente()) {
            throw new IllegalArgumentException("Só é possível cancelar uma proposta pendente!");
        }
        this.status = EnumStatusProposta.CANCELADA;
    }

    // REGRA: multiusuário, o freelancer que enviou
    public boolean pertenceAoFreelancer(Long usuarioId) {
        return this.usuario != null && this.usuario.getId().equals(usuarioId);
    }

    // REGRA: multiusuário, o cliente dono do projeto
    public boolean pertenceAoCliente(Long clienteId) {
        return this.projeto != null && this.projeto.pertenceAoCliente(clienteId);
    }

    // REGRA: ao aceitar, as outras propostas pendentes do mesmo projeto são recusadas e o projeto é concluído
    // devolve as propostas recusadas para o service salvar
    public java.util.List<Proposta> aceitar(java.util.List<Proposta> propostasDoProjeto) {
        alterarStatus(EnumStatusProposta.ACEITA);

        var recusadas = propostasDoProjeto.stream()
                .filter(outra -> !outra.getId().equals(this.id) && outra.estaPendente())
                .toList();
        recusadas.forEach(Proposta::recusar);

        this.projeto.concluir();
        return recusadas;
    }

    // REGRA (multiusuário): admin acessa todas; o cliente as dos projetos dele; o freelancer só as que enviou
    public boolean podeSerAcessadaPor(boolean ehAdmin, Long clienteId, Long usuarioId) {
        if (ehAdmin) {
            return true;
        }
        if (clienteId != null) {
            return pertenceAoCliente(clienteId);
        }
        return pertenceAoFreelancer(usuarioId);
    }
}
