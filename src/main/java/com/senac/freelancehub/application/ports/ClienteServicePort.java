package com.senac.freelancehub.application.ports;

import com.senac.freelancehub.application.DTOs.AtualizarStatusRequest;
import com.senac.freelancehub.application.DTOs.ClienteRequest;
import com.senac.freelancehub.application.DTOs.ClienteResponse;
import java.util.List;

// Porta (interface) do serviço de clientes (empresas): quem usa (controllers, filtro) depende desta interface, não da classe
public interface ClienteServicePort {

    // lista todos os clientes
    List<ClienteResponse> ListarTodosClientesGrid();

    // busca o cliente pelo id
    ClienteResponse buscarPorId(Long id);

    // salva o cliente (id 0 cria, outro id atualiza)
    ClienteResponse salvarCliente(ClienteRequest request, Long id);

    // altera o status do cliente (ativo ou bloqueado)
    boolean atualizarStatus(Long id, AtualizarStatusRequest statusRequest);

    // exclusão lógica (status EXCLUIDO)
    boolean excluir(Long id);
}
