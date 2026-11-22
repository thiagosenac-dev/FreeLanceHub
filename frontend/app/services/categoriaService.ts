import { Categoria } from "../types/categoria";
import api from "./api";

// busca todas as categorias
export async function buscarListaCategorias(): Promise<Categoria[]> {

    const dados = await api.get<Categoria[]>("/categorias");

    if (dados.status == 200) {
        return dados.data;
    }

    return [];
}

// exclui (inativa) a categoria
export async function deletarCategoria(id: number): Promise<number> {

    var dados = await api.delete('/categorias/' + id + '/excluir');
    return dados.status;
}

// alterna o status da categoria entre ativo e bloqueado
export async function atualizarStatusCategoria(categoria: Categoria): Promise<void> {

    var novoStatus = {};
    if (String(categoria.status).toUpperCase() === "ATIVO") {
        novoStatus = { status: "BLOQUEADO" }
    } else {
        novoStatus = { status: "ATIVO" }
    }

    var dadosRetorno = await
        api.patch('/categorias/' + categoria.id + '/status', novoStatus);

    if (dadosRetorno.status == 200) {
        alert("Atualizado status com sucesso!");
    } else {
        alert(dadosRetorno.data);

        return;
    }
}

// busca a categoria pelo id
export async function consultaCategoriaPorId(id: number): Promise<Categoria> {
    const valorCategoriaBack = await api.get<Categoria>('/categorias/' + id);
    return valorCategoriaBack.data;
}

// atualiza os dados da categoria
export async function atualizarCategoria(categoria: Categoria): Promise<number> {
    var dadosRetorno = await
        api.put<number>('/categorias/' + categoria.id, categoria);
    return dadosRetorno.data;
}

// cria uma categoria nova
export async function salvarCategoria(categoria: Categoria): Promise<number> {
    var dadosRetorno = await
        api.post<number>('/categorias', categoria);
    return dadosRetorno.data;
}
