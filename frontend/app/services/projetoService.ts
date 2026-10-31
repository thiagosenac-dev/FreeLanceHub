import { Projeto } from "../types/projeto";
import api from "./api";

export async function buscarListaProjetos(): Promise<Projeto[]> {

    const dados = await api.get<Projeto[]>("/projetos");

    if (dados.status == 200) {
        return dados.data;
    }

    return [];
}

export async function deletarProjeto(id: number): Promise<number> {

    var dados = await api.delete('/projetos/' + id + '/excluir');
    return dados.status;
}

export async function consultaProjetoPorId(id: number): Promise<Projeto> {
    const valorProjetoBack = await api.get<Projeto>('/projetos/' + id);
    return valorProjetoBack.data;
}

export async function atualizarProjeto(projeto: Projeto): Promise<number> {
    var dadosRetorno = await
        api.put<number>('/projetos/' + projeto.id, projeto);
    return dadosRetorno.data;
}

export async function salvarProjeto(projeto: Projeto): Promise<number> {
    var dadosRetorno = await
        api.post<number>('/projetos', projeto);
    return dadosRetorno.data;
}
