import { Usuario } from "../types/usuario";
import api from "./api";

export async function buscarListaUsuarios(): Promise<Usuario[]> {
    const dados = await api.get<Usuario[]>("/usuarios");
    return dados.data;
}

export async function consultaUsuarioPorId(id: number): Promise<Usuario> {
    const dados = await api.get<Usuario>('/usuarios/' + id);
    return dados.data;
}

export async function salvarUsuario(usuario: Usuario) {
    return await api.post<number>('/usuarios', usuario, { validateStatus: () => true });
}

export async function atualizarUsuario(usuario: Usuario) {
    return await api.put<number>('/usuarios/' + usuario.id, usuario, { validateStatus: () => true });
}

export async function deletarUsuario(id: number | null) {
    return await api.delete('/usuarios/' + id + '/excluir');
}

export async function atualizarStatusUsuario(usuario: Usuario) {
    const novoStatus = usuario.status === "ATIVO" ? { status: "BLOQUEADO" } : { status: "ATIVO" };

    return await api.patch('/usuarios/' + usuario.id + '/status', novoStatus);
}
