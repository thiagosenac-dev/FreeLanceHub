package com.senac.freelancehub.application.services;

import com.senac.freelancehub.application.DTOs.*;
import com.senac.freelancehub.domain.entities.Cliente;
import com.senac.freelancehub.domain.entities.EnumStatus;
import com.senac.freelancehub.domain.entities.Usuario;
import com.senac.freelancehub.application.DTOs.CategoriaResponse;
import com.senac.freelancehub.application.DTOs.HabilidadeRequest;
import com.senac.freelancehub.domain.entities.Categoria;
import com.senac.freelancehub.domain.repository.CategoriaRepository;
import com.senac.freelancehub.domain.repository.ClienteRepository;
import com.senac.freelancehub.domain.repository.UsuarioRepository;
import com.senac.freelancehub.domain.valueobject.CNPJ;
import com.senac.freelancehub.domain.valueobject.CPF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import com.senac.freelancehub.application.ports.TokenServicePort;
import com.senac.freelancehub.application.ports.UsuarioServicePort;

// regras de usuários: login, cadastros, habilidades e gestão do admin
@Service
public class UsuarioService implements UsuarioServicePort {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private TokenServicePort tokenService;

    @Value("${spring.secretkey}")
    private String secret;

    // valida email e senha e devolve o token, ou null se estiver errado
    public LoginResponse validarUsuarioAutenticadoRetornaToken(LoginRequest request) {

        if (usuarioRepository.existsUsuarioByEmailAndSenha(request.email(), request.senha())) {
            // MUDANÇA: devolve também o perfil (role) para o front saber o que mostrar
            var usuario = usuarioRepository.findAll()
                    .stream().filter(u -> u.getEmail().equals(request.email()))
                    .findFirst().orElse(null);
            // a regra de quem pode entrar agora fica na entidade
            if (!usuario.validarAcesso()) {
                return null;
            }
            var token = tokenService.gerarToken(request);
            return new LoginResponse(token, usuario.getRole());
        }
        return null;
    }

    // pega o usuário que está logado (vem do token, colocado pelo JwtFilter)
    public UsuarioLogado getUsuarioLogado() {
        return (UsuarioLogado) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    // busca todos os usuários e devolve já convertidos pra response
    public List<UsuarioResponse> listarTodosUsuariosGrid() {

        return usuarioRepository.findAll()
                .stream()
                .map(UsuarioResponse::new)
                .toList();
    }


    // busca o usuário pelo id, devolve null se não existir
    public UsuarioResponse buscarPorId(Long id) {

        var usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario == null) {
            return null;
        }

        return new UsuarioResponse(usuario);
    }

    // id 0 cria um usuário novo, qualquer outro id atualiza o existente (null se não achar)
    public UsuarioResponse salvarUsuario(UsuarioRequest request, Long id) {

        var usuarioLogado = getUsuarioLogado();

        // novo usuário (MUDANÇA: criado pelo admin, agora é sempre outro admin)
        if (id == 0L) {
            if (usuarioRepository.existsByEmail(request.email())) {
                throw new IllegalArgumentException("E-mail já cadastrado!");
            }
            validarCpfDuplicado(request.cpf());
            Usuario usuarioNovo = new Usuario(request);
            usuarioNovo.setRole("ROLE_ADMIN");
            usuarioRepository.save(usuarioNovo);
            return new UsuarioResponse(usuarioNovo);
        }

        // usuário existente
        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if (usuarioBanco == null) {
            return null;
        }

        if (!request.email().equals(usuarioBanco.getEmail()) && usuarioRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("E-mail já cadastrado!");
        }

        usuarioBanco.atualizarDados(request);
        usuarioRepository.save(usuarioBanco);
        return new UsuarioResponse(usuarioBanco);
    }

    // altera o status do usuário, devolve false se ele não existir
    public boolean atualizarStatus(Long id, AtualizarStatusRequest statusRequest) {

        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if (usuarioBanco == null) {
            return false;
        }

        usuarioBanco.alterarStatus(statusRequest.status());
        usuarioRepository.save(usuarioBanco);
        return true;
    }

    // inativa o usuário (status EXCLUIDO), devolve false se ele não existir
    public boolean excluir(Long id) {

        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if (usuarioBanco == null) {
            return false;
        }

        usuarioBanco.excluir();
        usuarioRepository.save(usuarioBanco);
        return true;
    }

    // cria o admin só se a secretKey bater com a do application.properties
    public CriarAdminResponse criarAdmin(CriarAdminRequest criarAdminRequest) {

        if (!criarAdminRequest.secretKey().equals(secret)) {
            throw new IllegalArgumentException("Chave secreta inválida!");
        }

        if (usuarioRepository.existsByEmail(criarAdminRequest.email())) {
            throw new IllegalArgumentException("E-mail já cadastrado!");
        }

        Usuario usuarioAdminSalvar = new Usuario(criarAdminRequest);
        usuarioAdminSalvar.setStatus(EnumStatus.ATIVO);
        usuarioRepository.save(usuarioAdminSalvar);

        return new CriarAdminResponse(usuarioAdminSalvar.getId(), "Usuario Salvo com sucesso!");
    }

    // MUDANÇA (novo): lista as habilidades (categorias) do freelancer logado
    public List<CategoriaResponse> listarHabilidades() {

        Usuario usuarioBanco = usuarioRepository.findById(getUsuarioLogado().id()).orElse(null);

        return usuarioBanco.getHabilidades()
                .stream()
                .map(CategoriaResponse::new)
                .toList();
    }

    // MUDANÇA (novo): adiciona uma habilidade ao freelancer logado (igual ao matricularAluno do professor)
    public boolean adicionarHabilidade(HabilidadeRequest habilidadeRequest) {

        Usuario usuarioBanco = usuarioRepository.findById(getUsuarioLogado().id()).orElse(null);
        Categoria categoriaBanco = categoriaRepository.findById(habilidadeRequest.categoria_id()).orElse(null);
        if (usuarioBanco != null && categoriaBanco != null) {

            usuarioBanco.adicionarHabilidade(categoriaBanco);
            usuarioRepository.save(usuarioBanco);
            return true;
        }
        return false;
    }

    // MUDANÇA (novo): remove uma habilidade do freelancer logado
    public boolean removerHabilidade(Long categoriaId) {

        Usuario usuarioBanco = usuarioRepository.findById(getUsuarioLogado().id()).orElse(null);
        if (usuarioBanco == null) {
            return false;
        }

        usuarioBanco.removerHabilidade(categoriaId);
        usuarioRepository.save(usuarioBanco);
        return true;
    }

    // busca os dados do usuário que está logado (vem do token)
    public UsuarioResponse BuscarUsuarioLogado() {
        try {
            var usuarioLogado = getUsuarioLogado();
            return usuarioRepository.findById(usuarioLogado.id())
                    .stream()
                    .map(UsuarioResponse::new).findFirst().orElse(null);

        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar usuario logado!");
        }
    }

    // MUDANÇA (novo): cadastro público, cria um usuário freelancer
    public UsuarioResponse registrarFreelancer(UsuarioRequest request) {

        if (usuarioRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("E-mail já cadastrado!");
        }

        validarCpfDuplicado(request.cpf());

        Usuario freelancer = new Usuario(request);
        freelancer.atualizarEndereco(request.cep(), request.logradouro(), request.bairro(), request.cidade(), request.uf());
        usuarioRepository.save(freelancer);

        return new UsuarioResponse(freelancer);
    }

    // MUDANÇA (novo): cadastro público do cliente (pessoa ou empresa), salva o Cliente e o Usuario dele (ROLE_CLIENTE)
    public ClienteResponse registrarCliente(RegistrarClienteRequest request) {

        if (request.tipo() == null) {
            throw new IllegalArgumentException("Informe se é pessoa ou empresa!");
        }
        if (request.email() == null || !request.email().contains("@")) {
            throw new IllegalArgumentException("Email Invalido!");
        }
        if (request.senha() == null || request.senha().isBlank()) {
            throw new IllegalArgumentException("Informe a senha!");
        }
        if (usuarioRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("E-mail já cadastrado!");
        }
        validarEndereco(request.cep(), request.cidade(), request.uf());

        Cliente cliente = new Cliente();
        cliente.setTipo(request.tipo());
        cliente.setNome(request.nome());

        // a entidade valida a razão social e o cnpj (empresa) ou o cpf (pessoa)
        cliente.definirDocumento(request.razaoSocial(), request.cpf(), request.cnpj());
        // a duplicidade precisa do banco, então continua aqui no service
        if (cliente.ehEmpresa()) {
            validarCnpjDuplicado(request.cnpj());
        } else {
            validarCpfDuplicado(request.cpf());
        }

        cliente.definirEmail(request.email());
        cliente.setTelefone(request.telefone());
        cliente.atualizarEndereco(request.cep(), request.logradouro(), request.bairro(), request.cidade(), request.uf());
        cliente.ativar();

        Usuario usuarioCliente = new Usuario(request, cliente);

        clienteRepository.save(cliente);
        usuarioRepository.save(usuarioCliente);

        return new ClienteResponse(cliente);
    }

    // MUDANÇA (novo): o endereço vem do ViaCEP, então o cep, a cidade e a uf precisam estar preenchidos
    // (logradouro e bairro podem vir vazios em CEP de cidade pequena)
    private void validarEndereco(String cep, String cidade, String uf) {

        if (cep == null || cep.isBlank() || cidade == null || cidade.isBlank() || uf == null || uf.isBlank()) {
            throw new IllegalArgumentException("Informe um CEP válido e aguarde o endereço ser preenchido!");
        }
    }

    // MUDANÇA (novo): impede cpf repetido (compara só os números, em usuários e clientes)
    private void validarCpfDuplicado(String cpf) {

        String numeros = cpf == null ? "" : cpf.replaceAll("\\D", "");

        boolean repetidoUsuario = usuarioRepository.findAll().stream()
                .anyMatch(u -> u.getCpf() != null && u.getCpf().toString().replaceAll("\\D", "").equals(numeros));
        boolean repetidoCliente = clienteRepository.findAll().stream()
                .anyMatch(c -> c.getCpf() != null && c.getCpf().replaceAll("\\D", "").equals(numeros));

        if (repetidoUsuario || repetidoCliente) {
            throw new IllegalArgumentException("CPF já cadastrado!");
        }
    }

    // MUDANÇA (novo): impede cnpj repetido (compara só os números)
    private void validarCnpjDuplicado(String cnpj) {

        String numeros = cnpj == null ? "" : cnpj.replaceAll("\\D", "");

        boolean repetido = clienteRepository.findAll().stream()
                .anyMatch(c -> c.getCnpj() != null && c.getCnpj().replaceAll("\\D", "").equals(numeros));

        if (repetido) {
            throw new IllegalArgumentException("CNPJ já cadastrado!");
        }
    }
}