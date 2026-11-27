package com.senac.freelancehub.domain.entities;
import com.senac.freelancehub.domain.valueobject.CNPJ;
import com.senac.freelancehub.domain.valueobject.CPF;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

// cliente (pessoa ou empresa) que publica projetos
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
    // MUDANÇA: pessoa ou empresa (no cliente empresa o "nome" é o nome fantasia)
    public EnumTipoCliente tipo;
    public String nome;
    // MUDANÇA: razão social e cnpj só o cliente empresa tem, o cpf só o cliente pessoa
    public String razaoSocial;
    public String cpf;
    public String cnpj;
    public String email;
    public String telefone;
    // endereço (preenchido pelo CEP, via ViaCEP)
    public String cep;
    public String logradouro;
    public String bairro;
    public String cidade;
    public String uf;
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

    // REGRA: cliente novo nasce ATIVO
    public void ativar() {
        this.status = EnumStatus.ATIVO;
    }

    public boolean ehEmpresa() {
        return this.tipo == EnumTipoCliente.EMPRESA;
    }

    // REGRA: empresa tem razão social e CNPJ válido; pessoa tem CPF válido
    public void definirDocumento(String razaoSocial, String cpf, String cnpj) {
        if (ehEmpresa()) {
            if (razaoSocial == null || razaoSocial.isBlank()) {
                throw new IllegalArgumentException("Informe a razão social!");
            }
            if (!CNPJ.isValidCnpj(cnpj)) {
                throw new IllegalArgumentException("CNPJ Invalido!");
            }
            this.razaoSocial = razaoSocial;
            this.cnpj = cnpj;
        } else {
            if (!CPF.isValidCpf(cpf)) {
                throw new IllegalArgumentException("CPF Invalido!");
            }
            this.cpf = cpf;
        }
    }

    // REGRA: e-mail precisa ter @
    public static void validarEmail(String email) {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Email Invalido!");
        }
    }

    public void definirEmail(String email) {
        validarEmail(email);
        this.email = email;
    }

    // REGRA: no cadastro, o cliente precisa dizer se é pessoa ou empresa
    public static void validarTipo(EnumTipoCliente tipo) {
        if (tipo == null) {
            throw new IllegalArgumentException("Informe se é pessoa ou empresa!");
        }
    }

    // REGRA: no cadastro, o endereço vem do ViaCEP, então cep, cidade e uf são obrigatórios
    public void cadastrarEndereco(String cep, String logradouro, String bairro, String cidade, String uf) {
        if (cep == null || cep.isBlank() || cidade == null || cidade.isBlank() || uf == null || uf.isBlank()) {
            throw new IllegalArgumentException("Informe um CEP válido e aguarde o endereço ser preenchido!");
        }
        atualizarEndereco(cep, logradouro, bairro, cidade, uf);
    }

    public void atualizarEndereco(String cep, String logradouro, String bairro, String cidade, String uf) {
        this.cep = cep;
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
    }

    public void alterarStatus(EnumStatus novoStatus) {
        this.status = novoStatus;
    }

    // REGRA: exclusão lógica
    public void excluir() {
        this.status = EnumStatus.EXCLUIDO;
    }
}
