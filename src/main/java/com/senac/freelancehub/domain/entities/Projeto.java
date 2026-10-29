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

    // MUDANÇA: antes guardava o usuário, agora guarda o cliente (empresa) dono do projeto
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cliente_id", referencedColumnName = "id")
    public Cliente cliente;

}