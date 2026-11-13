import { loginResponse } from "../types/auth";
import api from "./api";

// faz o login no back e devolve o token e o perfil do usuário
export async function loginBack(email: string, senha: string): Promise<loginResponse> {
    const loginResposta = await api.post<loginResponse>("/auth/login", { email: email, senha: senha });

    return loginResposta.data;
}

// cadastro público de freelancer (com o endereço vindo do CEP)
export async function registrarFreelancer(dados: {
    nome: string, cpf: string, email: string, senha: string,
    cep: string, logradouro: string, bairro: string, cidade: string, uf: string
}) {
    return await api.post('/auth/registrar', dados, { validateStatus: () => true });
}

// cadastro público de cliente (pessoa ou empresa). Pessoa usa o cpf, empresa usa razaoSocial e cnpj
export async function registrarCliente(dados: {
    tipo: string, nome: string, razaoSocial: string, cpf: string, cnpj: string,
    email: string, telefone: string, senha: string,
    cep: string, logradouro: string, bairro: string, cidade: string, uf: string
}) {
    return await api.post('/auth/registrar-cliente', dados, { validateStatus: () => true });
}
