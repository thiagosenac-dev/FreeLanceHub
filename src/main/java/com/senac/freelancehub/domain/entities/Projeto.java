package com.senac.freelancehub.domain.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    public Long categoriaId;

    // usuário que criou o projeto
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    public Usuario usuario;

}