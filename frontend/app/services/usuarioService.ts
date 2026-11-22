import { Usuario } from "../types/usuario";
import api from "./api";

// busca todos os usuários
export async function buscarListaUsuarios(): Promise<Usuario[]> {

    const dados = await api.get<Usuario[]>("/usuarios");

    if (dados.status == 200) {
        return dados.data;
    }

    return [];
}

// exclui (inativa) o usuário
export async function deletarUsuario(id: number): Promise<number> {

    var dados = await api.delete('/usuarios/' + id + '/excluir');
    return dados.status;
}

// alterna o status do usuário entre ativo e bloqueado
export async function atualizarStatusUsuario(usuario: Usuario): Promise<void> {

    var novoStatus = {};
    if (usuario.status === "ATIVO") {
        novoStatus = { status: "BLOQUEADO" }
    } else {
        novoStatus = { status: "ATIVO" }
    }

    var dadosRetorno = await
        api.patch('/usuarios/' + usuario.id + '/status', novoStatus);

    if (dadosRetorno.status == 200) {
        alert("Atulizado status com sucesso!");
    } else {
        alert(dadosRetorno.data);

        return;
    }
}

// busca o usuário pelo id
export async function consultaUsuarioPorId(id: number): Promise<Usuario> {
    const valorUsuarioBack = await api.get<Usuario>('/usuarios/' + id);
    return valorUsuarioBack.data;
}

// atualiza os dados do usuário
export async function atualizarUsuario(usuario: Usuario): Promise<number> {
    var dadosRetorno = await
        api.put<number>('/usuarios/' + usuario.id, usuario);
    return dadosRetorno.data;
}

// cria um usuário (admin) novo
export async function salvarUsuario(usuario: Usuario): Promise<number> {
    var dadosRetorno = await
        api.post<number>('/usuarios', usuario);
    return dadosRetorno.data;
}

// usuário logado (pelo token), usado no login para guardar os dados no Redux
export async function buscarUsuarioLogado(): Promise<Usuario> {
    return (await api.get<Usuario>('/usuarios/buscarusuariologado')).data
}
