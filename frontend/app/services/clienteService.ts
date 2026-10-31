import { Cliente } from "../types/cliente";
import api from "./api";

export async function buscarListaClientes(): Promise<Cliente[]> {
    const dados = await api.get<Cliente[]>("/clientes");
    return dados.data;
}

export async function consultaClientePorId(id: number): Promise<Cliente> {
    const dados = await api.get<Cliente>('/clientes/' + id);
    return dados.data;
}

export async function salvarCliente(cliente: Cliente) {
    return await api.post<number>('/clientes', cliente, { validateStatus: () => true });
}

export async function atualizarCliente(cliente: Cliente) {
    return await api.put<number>('/clientes/' + cliente.id, cliente, { validateStatus: () => true });
}

export async function deletarCliente(id: number | null) {
    return await api.delete('/clientes/' + id + '/excluir');
}

export async function atualizarStatusCliente(cliente: Cliente) {
    const novoStatus = String(cliente.status).toUpperCase() === "ATIVO" ? { status: "BLOQUEADO" } : { status: "ATIVO" };

    return await api.patch('/clientes/' + cliente.id + '/status', novoStatus);
}
