package com.senac.freelancehub.domain.entities;

import com.senac.freelancehub.application.DTOs.CriarAdminRequest;
import com.senac.freelancehub.application.DTOs.RegistrarClienteRequest;
import com.senac.freelancehub.application.DTOs.UsuarioLogado;
import com.senac.freelancehub.application.DTOs.UsuarioRequest;
import com.senac.freelancehub.domain.valueobject.CPF;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

// usuário do sistema (admin, freelancer ou cliente), também é o usuário do Spring Security
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    private String nome;

    @Embedded
    private CPF cpf;

    private String senha;

    private String email;

    private String role = "ROLE_USUARIO"; // MUDANÇA: antes era ROLE_FREELANCER (e antes disso ROLE_USER)

    // status do usuário, começa ativo
    private EnumStatus status = EnumStatus.ATIVO;

    // MUDANÇA: endereço do freelancer (preenchido pelo CEP, via ViaCEP). O do cliente fica no Cliente
    private String cep;
    private String logradouro;
    private String bairro;
    private String cidade;
    private String uf;

    // MUDANÇA: cliente (pessoa ou empresa) do usuário, só os usuários com ROLE_CLIENTE têm
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cliente_id", referencedColumnName = "id")
    private Cliente cliente;

    // MUDANÇA: habilidades do freelancer (categorias), igual ao cursos/matrícula do professor
    @ManyToMany
    @JoinTable(
            name = "tb_habilidade",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "categoria_id")
    )
    private Set<Categoria> habilidades = new HashSet<>();

    // propostas que o usuário criou
    @OneToMany(mappedBy = "usuario")
    private List<Proposta> propostas;

    // valida o email antes de salvar
    public void setEmail(String email) {
        if (!email.isEmpty() && !email.contains("@")) {
            throw new IllegalArgumentException("Email Invalido!");
        }
        this.email = email;
    }

    // cria um admin a partir do request
    public Usuario(CriarAdminRequest criarAdminRequest) {
        this.setCpf(new CPF(criarAdminRequest.cpf()));
        this.setNome(criarAdminRequest.nome());
        this.setSenha(criarAdminRequest.senha());
        this.setEmail(criarAdminRequest.email());
        this.setRole("ROLE_ADMIN");
    }

    // cria um freelancer a partir do request (MUDANÇA: antes era usuário comum)
    public Usuario(UsuarioRequest usuario) {
        this.setCpf(new CPF(usuario.cpf()));
        this.setNome(usuario.nome());
        this.setSenha(usuario.senha());
        this.setEmail(usuario.email());
        this.setCep(usuario.cep());
        this.setLogradouro(usuario.logradouro());
        this.setBairro(usuario.bairro());
        this.setCidade(usuario.cidade());
        this.setUf(usuario.uf());
        this.setRole("ROLE_USUARIO");
    }

    // MUDANÇA (novo): cria o usuário de um cliente (pessoa ou empresa), ligado ao cliente já salvo
    public Usuario(RegistrarClienteRequest request, Cliente cliente) {
        // só o cliente pessoa tem cpf, a empresa tem cnpj (que fica no Cliente)
        if (request.tipo() == EnumTipoCliente.PESSOA) {
            this.setCpf(new CPF(request.cpf()));
        }
        this.setNome(request.nome());
        this.setSenha(request.senha());
        this.setEmail(request.email());
        this.setRole("ROLE_CLIENTE");
        this.setCliente(cliente);
    }

    // REGRA (veio do UsuarioService): diz se o usuário pode fazer login
    // excluído = false (como se não existisse); bloqueado = erro com aviso para o suporte
    public boolean validarAcesso() {
        if (this.status == EnumStatus.EXCLUIDO) {
            return false;
        }
        if (this.status == EnumStatus.BLOQUEADO) {
            throw new IllegalStateException("Usuário bloqueado, contate o suporte!");
        }
        if (this.cliente != null) {
            if (this.cliente.getStatus() == EnumStatus.EXCLUIDO) {
                return false;
            }
            if (this.cliente.getStatus() == EnumStatus.BLOQUEADO) {
                throw new IllegalStateException("Usuário bloqueado, contate o suporte!");
            }
        }
        return true;
    }

    // REGRA (veio do UsuarioService): só o freelancer tem endereço no usuário
    public boolean ehFreelancer() {
        return "ROLE_USUARIO".equals(this.role);
    }

    // REGRA (veio do UsuarioService): o endereço vem do ViaCEP, cep, cidade e uf são obrigatórios
    public void atualizarEndereco(String cep, String logradouro, String bairro, String cidade, String uf) {
        if (cep == null || cep.isBlank() || cidade == null || cidade.isBlank() || uf == null || uf.isBlank()) {
            throw new IllegalArgumentException("Informe um CEP válido e aguarde o endereço ser preenchido!");
        }
        this.cep = cep;
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
    }

    // REGRA (veio do UsuarioService): edição feita pelo admin
    public void atualizarDados(UsuarioRequest request) {
        this.setNome(request.nome());
        // usuário de cliente empresa não tem cpf, então só troca o cpf de quem já tem
        if (this.cpf != null) {
            this.setCpf(new CPF(request.cpf()));
        }
        this.setEmail(request.email());
        if (ehFreelancer()) {
            atualizarEndereco(request.cep(), request.logradouro(), request.bairro(), request.cidade(), request.uf());
        }
        this.setSenha(request.senha());
    }

    // REGRA (veio do UsuarioService): troca o status (ativo, bloqueado...)
    public void alterarStatus(EnumStatus novoStatus) {
        this.status = novoStatus;
    }

    // REGRA (veio do UsuarioService): exclusão lógica
    public void excluir() {
        this.status = EnumStatus.EXCLUIDO;
    }

    // REGRA (veio do UsuarioService): adiciona a habilidade sem repetir (igual ao matricular do professor)
    public void adicionarHabilidade(Categoria categoria) {
        boolean jaTem = this.habilidades.stream()
                .anyMatch(c -> c.getId().equals(categoria.getId()));
        if (!jaTem) {
            this.habilidades.add(categoria);
        }
    }

    // REGRA (veio do UsuarioService): remove a habilidade
    public void removerHabilidade(Long categoriaId) {
        this.habilidades.removeIf(c -> c.getId().equals(categoriaId));
    }

    // pega o usuário logado que o JwtFilter colocou no contexto
    public UsuarioLogado getUsuarioLogado(){
        return (UsuarioLogado) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    // perfil (role) do usuário para o Spring Security
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role));
    }

    @Override
    public @Nullable String getPassword() {
        return "";
    }

    // não é usado: o login é feito pelo e-mail no UsuarioService
    @Override
    public String getUsername() {
        return "";
    }

    // REGRA: o freelancer só atende projetos das categorias que são habilidade dele
    public boolean temHabilidade(Categoria categoria) {
        return categoria != null && this.habilidades.stream()
                .anyMatch(c -> c.getId().equals(categoria.getId()));
    }

    // REGRA: e-mail não pode repetir (o service só consulta o banco e informa se já existe)
    public static void validarEmailDisponivel(boolean emailJaCadastrado) {
        if (emailJaCadastrado) {
            throw new IllegalArgumentException("E-mail já cadastrado!");
        }
    }

    // REGRA: senha é obrigatória
    public static void validarSenha(String senha) {
        if (senha == null || senha.isBlank()) {
            throw new IllegalArgumentException("Informe a senha!");
        }
    }

    // REGRA: o admin só é criado (pelo desktop) com a chave secreta certa
    public static void validarChaveAdmin(String chaveInformada, String chaveCorreta) {
        if (chaveInformada == null || !chaveInformada.equals(chaveCorreta)) {
            throw new IllegalArgumentException("Chave secreta inválida!");
        }
    }

    // REGRA: usuário criado pelo admin (ou pelo desktop) é admin e nasce ativo
    public void tornarAdmin() {
        this.role = "ROLE_ADMIN";
        this.status = EnumStatus.ATIVO;
    }

    // REGRA: o freelancer só vê projetos das categorias que são habilidade dele (sem habilidade, lista vazia)
    public List<Long> categoriasQuePodeAtender() {
        return this.habilidades.stream()
                .map(Categoria::getId)
                .toList();
    }
}
