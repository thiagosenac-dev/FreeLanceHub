import { Categoria } from "../types/categoria";
import { Projeto } from "../types/projeto";
import api from "./api";

// projetos abertos que combinam com as habilidades do freelancer
export async function buscarVagas(): Promise<Projeto[]> {

    const dados = await api.get<Projeto[]>("/freelancer/projetos");

    if (dados.status == 200) {
        return dados.data;
    }

    return [];
}

export async function buscarHabilidades(): Promise<Categoria[]> {

    const dados = await api.get<Categoria[]>("/freelancer/habilidades");

    if (dados.status == 200) {
        return dados.data;
    }

    return [];
}

export async function adicionarHabilidade(categoriaId: number | null): Promise<number> {

    var dados = await api.patch('/freelancer/habilidades', { categoria_id: categoriaId });
    return dados.status;
}

export async function removerHabilidade(categoriaId: number | null): Promise<number> {

    var dados = await api.delete('/freelancer/habilidades/' + categoriaId);
    return dados.status;
}
