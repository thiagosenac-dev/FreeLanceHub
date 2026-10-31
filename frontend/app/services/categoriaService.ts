import { Categoria } from "../types/categoria";
import api from "./api";

export async function buscarListaCategorias(): Promise<Categoria[]> {
    const dados = await api.get<Categoria[]>("/categorias");
    return dados.data;
}

export async function consultaCategoriaPorId(id: number): Promise<Categoria> {
    const dados = await api.get<Categoria>('/categorias/' + id);
    return dados.data;
}

export async function salvarCategoria(categoria: Categoria) {
    return await api.post('/categorias', categoria);
}

export async function atualizarCategoria(categoria: Categoria) {
    return await api.put('/categorias/' + categoria.id, categoria);
}

export async function deletarCategoria(id: number | null) {
    return await api.delete('/categorias/' + id + '/excluir');
}

export async function atualizarStatusCategoria(categoria: Categoria) {
    const novoStatus = String(categoria.status).toUpperCase() === "ATIVO" ? { status: "BLOQUEADO" } : { status: "ATIVO" };

    return await api.patch('/categorias/' + categoria.id + '/status', novoStatus);
}
