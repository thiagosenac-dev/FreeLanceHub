package com.senac.freelancehub.domain.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// projeto publicado por um cliente, de uma categoria
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Projeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String nome;
    public String descricao;
    public Double valor;
    public String prazo;
    public EnumStatusProjeto status;

    // categoria (ramo) do projeto
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoria_id", referencedColumnName = "id")
    public Categoria categoria;

    // MUDANÇA: antes guardava o usuário, agora guarda o cliente (empresa) dono do projeto
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cliente_id", referencedColumnName = "id")
    public Cliente cliente;

    // REGRA: todo projeto novo nasce ABERTO e ligado ao cliente que criou
    public void abrir(Cliente cliente) {
        this.status = EnumStatusProjeto.ABERTO;
        this.cliente = cliente;
    }

    // REGRA: só dá para editar um projeto que ainda está aberto
    public void validarEdicao() {
        if (this.status != EnumStatusProjeto.ABERTO) {
            throw new IllegalArgumentException("Só é possível editar projetos abertos!");
        }
    }

    // REGRA: preenche os dados; a categoria é obrigatória
    public void atualizarDados(String nome, String descricao, Double valor, String prazo, Categoria categoria) {
        if (categoria == null) {
            throw new IllegalArgumentException("Categoria não encontrada!");
        }
        this.nome = nome;
        this.descricao = descricao;
        this.valor = valor;
        this.prazo = prazo;
        this.categoria = categoria;
    }

    // REGRA: projeto de cliente bloqueado ou excluído não aparece nas vagas
    public boolean clienteAtivo() {
        return this.cliente == null
                || this.cliente.getStatus() == null
                || this.cliente.getStatus() == EnumStatus.ATIVO;
    }

    // REGRA: disponível = aberto e com cliente ativo (pode receber proposta)
    public boolean estaDisponivel() {
        return this.status == EnumStatusProjeto.ABERTO && clienteAtivo();
    }

    // REGRA: multiusuário, o projeto pertence ao cliente que criou
    public boolean pertenceAoCliente(Long clienteId) {
        return this.cliente != null && this.cliente.getId().equals(clienteId);
    }

    // REGRA: só troca o status se um novo status foi informado
    public void alterarStatus(EnumStatusProjeto novoStatus) {
        if (novoStatus != null) {
            this.status = novoStatus;
        }
    }

    // REGRA: ao aceitar uma proposta, o projeto sai da lista de abertos
    public void concluir() {
        this.status = EnumStatusProjeto.CONCLUIDO;
    }

    // REGRA: exclusão lógica
    public void cancelar() {
        this.status = EnumStatusProjeto.CANCELADO;
    }

    // REGRA (multiusuário): admin acessa todos; o cliente só os projetos dele
    public boolean podeSerAcessadoPor(boolean ehAdmin, Long clienteId) {
        return ehAdmin || pertenceAoCliente(clienteId);
    }
}
