import { Projeto } from "../types/projeto";
import api from "./api";

// busca os projetos (admin vê todos, a empresa só os dela)
export async function buscarListaProjetos(): Promise<Projeto[]> {

    const dados = await api.get<Projeto[]>("/projetos");

    if (dados.status == 200) {
        return dados.data;
    }

    return [];
}

// exclui (cancela) o projeto
export async function deletarProjeto(id: number): Promise<number> {

    var dados = await api.delete('/projetos/' + id + '/excluir');
    return dados.status;
}

// busca o projeto pelo id
export async function consultaProjetoPorId(id: number): Promise<Projeto> {
    const valorProjetoBack = await api.get<Projeto>('/projetos/' + id);
    return valorProjetoBack.data;
}

// atualiza os dados do projeto
export async function atualizarProjeto(projeto: Projeto): Promise<number> {
    var dadosRetorno = await
        api.put<number>('/projetos/' + projeto.id, projeto);
    return dadosRetorno.data;
}

// cria um projeto novo
export async function salvarProjeto(projeto: Projeto): Promise<number> {
    var dadosRetorno = await
        api.post<number>('/projetos', projeto);
    return dadosRetorno.data;
}
