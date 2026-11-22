import { Cliente } from "../types/cliente";
import api from "./api";

// busca todos os clientes
export async function buscarListaClientes(): Promise<Cliente[]> {

    const dados = await api.get<Cliente[]>("/clientes");

    if (dados.status == 200) {
        return dados.data;
    }

    return [];
}

// exclui (inativa) o cliente
export async function deletarCliente(id: number): Promise<number> {

    var dados = await api.delete('/clientes/' + id + '/excluir');
    return dados.status;
}

// alterna o status do cliente entre ativo e bloqueado
export async function atualizarStatusCliente(cliente: Cliente): Promise<void> {

    var novoStatus = {};
    if (String(cliente.status).toUpperCase() === "ATIVO") {
        novoStatus = { status: "BLOQUEADO" }
    } else {
        novoStatus = { status: "ATIVO" }
    }

    var dadosRetorno = await
        api.patch('/clientes/' + cliente.id + '/status', novoStatus);

    if (dadosRetorno.status == 200) {
        alert("Atualizado status com sucesso!");
    } else {
        alert(dadosRetorno.data);

        return;
    }
}

// busca o cliente pelo id
export async function consultaClientePorId(id: number): Promise<Cliente> {
    const valorClienteBack = await api.get<Cliente>('/clientes/' + id);
    return valorClienteBack.data;
}

// atualiza os dados do cliente
export async function atualizarCliente(cliente: Cliente): Promise<number> {
    var dadosRetorno = await
        api.put<number>('/clientes/' + cliente.id, cliente);
    return dadosRetorno.data;
}
