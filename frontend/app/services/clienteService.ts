import { Cliente } from "../types/cliente";
import api from "./api";

export async function buscarListaClientes(): Promise<Cliente[]> {

    const dados = await api.get<Cliente[]>("/clientes");

    if (dados.status == 200) {
        return dados.data;
    }

    return [];
}

export async function deletarCliente(id: number): Promise<number> {

    var dados = await api.delete('/clientes/' + id + '/excluir');
    return dados.status;
}

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

export async function consultaClientePorId(id: number): Promise<Cliente> {
    const valorClienteBack = await api.get<Cliente>('/clientes/' + id);
    return valorClienteBack.data;
}

export async function atualizarCliente(cliente: Cliente): Promise<number> {
    var dadosRetorno = await
        api.put<number>('/clientes/' + cliente.id, cliente);
    return dadosRetorno.data;
}

export async function salvarCliente(cliente: Cliente): Promise<number> {
    var dadosRetorno = await
        api.post<number>('/clientes', cliente);
    return dadosRetorno.data;
}
