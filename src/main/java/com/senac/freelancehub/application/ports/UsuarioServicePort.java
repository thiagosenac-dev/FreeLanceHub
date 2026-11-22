package com.senac.freelancehub.application.ports;

import com.senac.freelancehub.application.DTOs.AtualizarStatusRequest;
import com.senac.freelancehub.application.DTOs.CategoriaResponse;
import com.senac.freelancehub.application.DTOs.ClienteResponse;
import com.senac.freelancehub.application.DTOs.RegistrarClienteRequest;
import com.senac.freelancehub.application.DTOs.CriarAdminRequest;
import com.senac.freelancehub.application.DTOs.CriarAdminResponse;
import com.senac.freelancehub.application.DTOs.HabilidadeRequest;
import com.senac.freelancehub.application.DTOs.LoginRequest;
import com.senac.freelancehub.application.DTOs.LoginResponse;
import com.senac.freelancehub.application.DTOs.UsuarioLogado;
import com.senac.freelancehub.application.DTOs.UsuarioRequest;
import com.senac.freelancehub.application.DTOs.UsuarioResponse;
import java.util.List;

// Porta (interface) do serviço de usuários e login: quem usa (controllers, filtro) depende desta interface, não da classe
public interface UsuarioServicePort {

    // valida e-mail e senha e devolve o token e o perfil
    LoginResponse validarUsuarioAutenticadoRetornaToken(LoginRequest request);

    // pega o usuário logado (vem do token)
    UsuarioLogado getUsuarioLogado();

    // lista todos os usuários
    List<UsuarioResponse> listarTodosUsuariosGrid();

    // busca o usuário pelo id
    UsuarioResponse buscarPorId(Long id);

    // cria (id 0, sempre admin) ou atualiza o usuário
    UsuarioResponse salvarUsuario(UsuarioRequest request, Long id);

    // altera o status do usuário (ativo ou bloqueado)
    boolean atualizarStatus(Long id, AtualizarStatusRequest statusRequest);

    // exclusão lógica (status EXCLUIDO)
    boolean excluir(Long id);

    // cria o admin (precisa da secretKey, usado pelo desktop)
    CriarAdminResponse criarAdmin(CriarAdminRequest criarAdminRequest);

    // lista as habilidades do freelancer logado
    List<CategoriaResponse> listarHabilidades();

    // adiciona uma categoria como habilidade do freelancer logado
    boolean adicionarHabilidade(HabilidadeRequest habilidadeRequest);

    // remove uma habilidade do freelancer logado
    boolean removerHabilidade(Long categoriaId);

    // busca os dados do usuário logado
    UsuarioResponse BuscarUsuarioLogado();

    // cadastro público do freelancer
    UsuarioResponse registrarFreelancer(UsuarioRequest request);

    // cadastro público do cliente (pessoa ou empresa)
    ClienteResponse registrarCliente(RegistrarClienteRequest request);
}
