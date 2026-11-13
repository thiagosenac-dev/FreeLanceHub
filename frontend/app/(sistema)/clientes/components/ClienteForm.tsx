'use client'

import { Cliente } from "@/app/types/cliente";
import { atualizarCliente } from "@/app/services/clienteService";
import { buscarEnderecoPorCep } from "@/app/services/enderecoService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Dados que esse formulário pode receber: um cliente já existente (modo edição) ou nada (modo cadastro)
interface ClienteFormProps {
    clienteExistente?: Cliente;
}

// Formulário de cliente. Serve tanto para cadastrar um novo quanto para editar um já existente
export default function ClienteForm({ clienteExistente }: ClienteFormProps) {
    const router = useRouter();

    // cadastro excluído só pode ser visualizado
    const somenteLeitura = !!clienteExistente && String(clienteExistente.status).toUpperCase() === "EXCLUIDO";

    // Se recebeu um cliente existente, começa com os dados dele. Se não, começa em branco (cadastro novo)
    const [cliente, setCliente] = useState<Cliente>(
        clienteExistente ||
        new Cliente(null, "", "", "ATIVO", "", "")
    );

    // MUDANÇA: cliente empresa mostra razão social e CNPJ no lugar do CPF
    const ehEmpresa = cliente.tipo === "EMPRESA";

    // Atualiza um campo específico do cliente conforme a pessoa digita
    const handlerChange = (campo: 'nome' | 'email' | 'status' | 'cpf' | 'telefone' | 'cep' | 'razaoSocial' | 'cnpj', valor: string) => {
        setCliente(valorAnterior =>
            new Cliente(
                valorAnterior.id,
                campo === 'nome' ? valor : valorAnterior.nome,
                campo === 'email' ? valor : valorAnterior.email,
                campo === 'status' ? valor : valorAnterior.status,
                campo === 'cpf' ? valor : valorAnterior.cpf,
                campo === 'telefone' ? valor : valorAnterior.telefone,
                campo === 'cep' ? valor : valorAnterior.cep,
                // ao trocar o CEP, limpa o endereço antigo (só volta a preencher quando o ViaCEP responder)
                campo === 'cep' ? "" : valorAnterior.logradouro,
                campo === 'cep' ? "" : valorAnterior.bairro,
                campo === 'cep' ? "" : valorAnterior.cidade,
                campo === 'cep' ? "" : valorAnterior.uf,
                valorAnterior.tipo,
                campo === 'razaoSocial' ? valor : valorAnterior.razaoSocial,
                campo === 'cnpj' ? valor : valorAnterior.cnpj
            )
        )
    }

    // true enquanto o ViaCEP responde (nesse tempo não deixa salvar)
    const [buscandoCep, setBuscandoCep] = useState(false);

    // Quando a pessoa sai do campo CEP, busca o endereço no ViaCEP e preenche os outros campos
    const handlerBuscarCep = async () => {
        if ((cliente.cep ?? "").replace(/\D/g, "").length !== 8) {
            return;
        }

        setBuscandoCep(true);
        try {
            const endereco = await buscarEnderecoPorCep(cliente.cep);

            setCliente(valorAnterior =>
                new Cliente(
                    valorAnterior.id,
                    valorAnterior.nome,
                    valorAnterior.email,
                    valorAnterior.status,
                    valorAnterior.cpf,
                    valorAnterior.telefone,
                    valorAnterior.cep,
                    endereco.logradouro,
                    endereco.bairro,
                    endereco.cidade,
                    endereco.uf,
                    valorAnterior.tipo,
                    valorAnterior.razaoSocial,
                    valorAnterior.cnpj
                )
            )
        } catch (erro) {
            alert((erro as { response?: { data?: string } }).response?.data || "Erro ao buscar CEP!");
        } finally {
            setBuscandoCep(false);
        }
    }
    

    // Salva o cliente (MUDANÇA: só edita, o cliente se cadastra sozinho na tela de cadastro). Depois volta para a lista
    const handlerSalvar = async (formData: FormData) => {

        // o endereço precisa ter vindo do CEP (cidade e UF preenchidas) antes de salvar
        if (buscandoCep || !cliente.cidade || !cliente.uf) {
            alert("Informe um CEP válido e aguarde o endereço ser preenchido!");
            return;
        }

        try {
            var dadosRetorno = await atualizarCliente(cliente);

            if (dadosRetorno) {
                alert("Cliente foi salvo com sucesso!");
            } else {
                alert("Erro ao atualizar Cliente!");
                return;
            }
        } catch (erro) {
            alert((erro as { response?: { data?: string } }).response?.data || "Erro ao salvar Cliente!");
            return;
        }

        // Depois de salvar, volta para a listagem de clientes
        router.push("/clientes");

    }

    return (
        <form action={handlerSalvar} className="space-y-6">

            <fieldset disabled={somenteLeitura} className="min-w-0 border-0 p-0 m-0">
            {/* Campos do formulário: nome, CPF (ou razão social e CNPJ), e-mail, telefone e endereço (pelo CEP) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        {ehEmpresa ? "Nome da empresa:" : "Nome completo:"}
                    </label>
                    <input
                        name="nome"
                        value={cliente.nome}
                        required
                        onChange={(e) => handlerChange('nome', e.target.value)}
                        placeholder={ehEmpresa ? "Nome da empresa (nome fantasia)" : "João da Silva Sauro"}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                {ehEmpresa && (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300">
                            Razão social:
                        </label>
                        <input
                            name="razaoSocial"
                            value={cliente.razaoSocial ?? ""}
                            required
                            placeholder="Razão social da empresa"
                            onChange={(e) => handlerChange('razaoSocial', e.target.value)}
                            className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                        </input>
                    </div>
                )}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        {ehEmpresa ? "CNPJ:" : "CPF:"}
                    </label>
                    <input
                        name={ehEmpresa ? "cnpj" : "cpf"}
                        value={(ehEmpresa ? cliente.cnpj : cliente.cpf) ?? ""}
                        required
                        placeholder={ehEmpresa ? "00.000.000/0000-00" : "000.000.000-00"}
                        onChange={(e) => handlerChange(ehEmpresa ? 'cnpj' : 'cpf', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        E-mail:
                    </label>
                    <input
                        name="email"
                        value={cliente.email}
                        required
                        placeholder="cliente@empresa.com.br"
                        onChange={(e) => handlerChange('email', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Telefone:
                    </label>
                    <input
                        name="telefone"
                        value={cliente.telefone}
                        required
                        placeholder="(00) 00000-0000"
                        onChange={(e) => handlerChange('telefone', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        CEP:
                    </label>
                    <input
                        name="cep"
                        value={cliente.cep ?? ""}
                        required
                        placeholder="00000-000"
                        onChange={(e) => handlerChange('cep', e.target.value)}
                        onBlur={handlerBuscarCep}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Logradouro:
                    </label>
                    <input
                        name="logradouro"
                        value={cliente.logradouro ?? ""}
                        readOnly
                        placeholder="Preenchido pelo CEP"
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Bairro:
                    </label>
                    <input
                        name="bairro"
                        value={cliente.bairro ?? ""}
                        readOnly
                        placeholder="Preenchido pelo CEP"
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Cidade:
                    </label>
                    <input
                        name="cidade"
                        value={cliente.cidade ?? ""}
                        readOnly
                        placeholder="Preenchido pelo CEP"
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        UF:
                    </label>
                    <input
                        name="uf"
                        value={cliente.uf ?? ""}
                        readOnly
                        placeholder="Preenchido pelo CEP"
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
            </div>

            </fieldset>

            {/* aviso: cadastro excluído não pode ser alterado */}
            {somenteLeitura && (
                <p className="text-sm text-amber-400">Este cadastro de cliente foi excluído e não pode mais ser alterado.</p>
            )}

            {/* Botões: cancelar volta para a lista sem salvar, salvar envia o formulário */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/[0.08]">
                <Link href="/clientes" className="px-5 py-2.5 bg-white/[0.03] hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-500/10 text-slate-300 hover:text-white font-medium text-sm rounded-xl transition-all duration-300 text-center border border-white/[0.08] hover:border-blue-400/40 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)]"> Cancelar</Link>
                {!somenteLeitura && (
                    <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 text-white font-semibold text-sm rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 hover:-translate-y-0.5 active:translate-y-0"> Salvar</button>
                )}
            </div>
        </form>
    );
}