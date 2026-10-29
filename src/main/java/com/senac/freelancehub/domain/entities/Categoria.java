package com.senac.freelancehub.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

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

}
