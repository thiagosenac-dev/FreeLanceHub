package com.senac.freelancehub.application.ports;

import com.senac.freelancehub.application.DTOs.AtualizarStatusRequest;
import com.senac.freelancehub.application.DTOs.CategoriaResponse;
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

    LoginResponse validarUsuarioAutenticadoRetornaToken(LoginRequest request);

    UsuarioLogado getUsuarioLogado();

    List<UsuarioResponse> listarTodosUsuariosGrid();

    UsuarioResponse buscarPorId(Long id);

    UsuarioResponse salvarUsuario(UsuarioRequest request, Long id);

    boolean atualizarStatus(Long id, AtualizarStatusRequest statusRequest);

    boolean excluir(Long id);

    CriarAdminResponse criarAdmin(CriarAdminRequest criarAdminRequest);

    List<CategoriaResponse> listarHabilidades();

    boolean adicionarHabilidade(HabilidadeRequest habilidadeRequest);

    boolean removerHabilidade(Long categoriaId);

    UsuarioResponse BuscarUsuarioLogado();

    UsuarioResponse registrarFreelancer(UsuarioRequest request);
}
