import { loginResponse } from "../types/auth";
import api from "./api";

// faz o login no back e devolve o token e o perfil do usuário
export async function loginBack(email: string, senha: string): Promise<loginResponse> {
    const loginResposta = await api.post<loginResponse>("/auth/login", { email: email, senha: senha });

    return loginResposta.data;
}

// cadastro público de freelancer
export async function registrarFreelancer(dados: { nome: string, cpf: string, email: string, senha: string }) {
    return await api.post('/auth/registrar', dados, { validateStatus: () => true });
}
