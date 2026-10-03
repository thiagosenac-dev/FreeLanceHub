package com.senac.freelancehub.domain.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String nome;
    public String cpf;
    public String email;
    public String telefone;
//    @Enumerated(EnumType.STRING) comando para deixar o status como string
//    troca o status de 0,1 e 2. Para "ATIVO", "BLOQUEADO"...
    public EnumStatus status;

}