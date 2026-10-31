import { Proposta } from "../types/proposta";
import api from "./api";

export async function buscarListaPropostas(): Promise<Proposta[]> {
    const dados = await api.get<Proposta[]>("/propostas");
    return dados.data;
}

export async function buscarPropostasDoProjeto(projetoId: number): Promise<Proposta[]> {
    const dados = await api.get<Proposta[]>('/propostas/projeto/' + projetoId);
    return dados.data;
}

export async function consultaPropostaPorId(id: number): Promise<Proposta> {
    const dados = await api.get<Proposta>('/propostas/' + id);
    return dados.data;
}

export async function salvarProposta(proposta: Proposta, projetoId: number) {
    return await api.post<number>('/propostas', { ...proposta, projetoId }, { validateStatus: () => true });
}

export async function atualizarProposta(proposta: Proposta) {
    return await api.put<number>('/propostas/' + proposta.id, proposta, { validateStatus: () => true });
}

export async function cancelarProposta(id: number | null) {
    return await api.delete('/propostas/' + id + '/excluir');
}

export async function atualizarStatusProposta(id: number | null, status: string) {
    return await api.patch('/propostas/' + id + '/status', { status });
}
