import { Categoria } from "../types/categoria";
import { Projeto } from "../types/projeto";
import api from "./api";

// projetos abertos que combinam com as habilidades do freelancer
export async function buscarVagas(): Promise<Projeto[]> {
    const dados = await api.get<Projeto[]>("/freelancer/projetos");
    return dados.data;
}

export async function buscarHabilidades(): Promise<Categoria[]> {
    const dados = await api.get<Categoria[]>("/freelancer/habilidades");
    return dados.data;
}

export async function adicionarHabilidade(categoriaId: number | null) {
    return await api.patch('/freelancer/habilidades', { categoria_id: categoriaId });
}

export async function removerHabilidade(categoriaId: number | null) {
    return await api.delete('/freelancer/habilidades/' + categoriaId);
}
