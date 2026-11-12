import { Endereco } from "../types/endereco";
import api from "./api";

// busca o endereço de um CEP (o back consulta o ViaCEP)
export async function buscarEnderecoPorCep(cep: string): Promise<Endereco> {

    const dados = await api.get<Endereco>("/endereco/" + cep.replace(/\D/g, ""));
    return dados.data;
}
