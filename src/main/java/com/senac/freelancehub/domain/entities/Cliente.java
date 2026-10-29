package com.senac.freelancehub.domain.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true) // MUDANÇA: igual ao Usuario, evita loop entre as listas
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    public Long id;
    public String nome;
    public String cpf;
    public String email;
    public String telefone;
//    @Enumerated(EnumType.STRING) comando para deixar o status como string
//    troca o status de 0,1 e 2. Para "ATIVO", "BLOQUEADO"...
    public EnumStatus status;

    // MUDANÇA: o cliente é a empresa, igual ao Empresa do professor
    // usuários (donos) que pertencem a essa empresa
    @OneToMany(mappedBy = "cliente")
    public List<Usuario> usuarios;

    // projetos dessa empresa
    @OneToMany(mappedBy = "cliente")
    public List<Projeto> projetos;

}