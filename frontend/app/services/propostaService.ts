import { Proposta } from "../types/proposta";
import api from "./api";

export async function buscarListaPropostas(): Promise<Proposta[]> {

    const dados = await api.get<Proposta[]>("/propostas");

    if (dados.status == 200) {
        return dados.data;
    }

    return [];
}

// propostas de um projeto (empresa e admin)
export async function buscarPropostasDoProjeto(projetoId: number): Promise<Proposta[]> {

    const dados = await api.get<Proposta[]>('/propostas/projeto/' + projetoId);

    if (dados.status == 200) {
        return dados.data;
    }

    return [];
}

// o freelancer cancela a própria proposta
export async function cancelarProposta(id: number): Promise<number> {

    var dados = await api.delete('/propostas/' + id + '/excluir');
    return dados.status;
}

// empresa aceita ou recusa a proposta (ao aceitar, as outras do projeto são recusadas)
export async function atualizarStatusProposta(id: number | null, status: string): Promise<void> {

    var dadosRetorno = await
        api.patch('/propostas/' + id + '/status', { status });

    if (dadosRetorno.status == 200) {
        alert("Atualizado status com sucesso!");
    } else {
        alert(dadosRetorno.data);

        return;
    }
}

export async function consultaPropostaPorId(id: number): Promise<Proposta> {
    const valorPropostaBack = await api.get<Proposta>('/propostas/' + id);
    return valorPropostaBack.data;
}

export async function atualizarProposta(proposta: Proposta): Promise<number> {
    var dadosRetorno = await
        api.put<number>('/propostas/' + proposta.id, proposta);
    return dadosRetorno.data;
}

export async function salvarProposta(proposta: Proposta, projetoId: number): Promise<number> {
    var dadosRetorno = await
        api.post<number>('/propostas', { ...proposta, projetoId });
    return dadosRetorno.data;
}
