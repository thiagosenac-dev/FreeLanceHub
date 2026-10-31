import { Categoria } from "../types/categoria";
import { Projeto } from "../types/projeto";
import api from "./api";

// rotas abertas, usadas na landing page (sem login)
export async function buscarProjetosPublicos(): Promise<Projeto[]> {
    const dados = await api.get<Projeto[]>("/publico/projetos");
    return dados.data;
}

export async function buscarCategoriasPublicas(): Promise<Categoria[]> {
    const dados = await api.get<Categoria[]>("/publico/categorias");
    return dados.data;
}
