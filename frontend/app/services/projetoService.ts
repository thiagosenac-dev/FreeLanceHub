import { Projeto } from "../types/projeto";
import api from "./api";

export async function buscarListaProjetos(): Promise<Projeto[]> {
    const dados = await api.get<Projeto[]>("/projetos");
    return dados.data;
}

export async function consultaProjetoPorId(id: number): Promise<Projeto> {
    const dados = await api.get<Projeto>('/projetos/' + id);
    return dados.data;
}

export async function salvarProjeto(projeto: Projeto) {
    return await api.post<number>('/projetos', projeto);
}

export async function atualizarProjeto(projeto: Projeto) {
    return await api.put<number>('/projetos/' + projeto.id, projeto);
}

export async function deletarProjeto(id: number | null) {
    return await api.delete('/projetos/' + id + '/excluir');
}
