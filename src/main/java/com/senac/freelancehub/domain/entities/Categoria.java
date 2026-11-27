package com.senac.freelancehub.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

// categoria (ramo) dos projetos, também é a habilidade do freelancer
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true) // MUDANÇA: igual ao Curso do professor
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    public Long id;
    public String nome;
    public String descricao;
    public EnumStatus status;

    // MUDANÇA: freelancers que têm essa categoria como habilidade (igual ao alunos do Curso)
    @ManyToMany(mappedBy = "habilidades")
    public Set<Usuario> freelancers = new HashSet<>();

    // REGRA: categoria nova nasce ATIVA
    public void ativar() {
        this.status = EnumStatus.ATIVO;
    }

    // REGRA: o nome é obrigatório
    public void atualizarDados(String nome, String descricao) {
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("Nome inválido!");
        }
        this.nome = nome;
        this.descricao = descricao;
    }

    // REGRA: só troca o status se um novo status foi informado
    public void alterarStatus(EnumStatus novoStatus) {
        if (novoStatus != null) {
            this.status = novoStatus;
        }
    }

    // REGRA: exclusão lógica
    public void excluir() {
        this.status = EnumStatus.EXCLUIDO;
    }
}
