package com.senac.freelancehub.application.ports;

import com.senac.freelancehub.application.DTOs.AtualizarStatusRequest;
import com.senac.freelancehub.application.DTOs.ClienteRequest;
import com.senac.freelancehub.application.DTOs.ClienteResponse;
import java.util.List;

// Porta (interface) do serviço de clientes (empresas): quem usa (controllers, filtro) depende desta interface, não da classe
public interface ClienteServicePort {

    List<ClienteResponse> ListarTodosClientesGrid();

    ClienteResponse buscarPorId(Long id);

    ClienteResponse salvarCliente(ClienteRequest request, Long id);

    boolean atualizarStatus(Long id, AtualizarStatusRequest statusRequest);

    boolean excluir(Long id);
}
