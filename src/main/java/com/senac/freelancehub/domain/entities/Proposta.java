package com.senac.freelancehub.domain.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

}