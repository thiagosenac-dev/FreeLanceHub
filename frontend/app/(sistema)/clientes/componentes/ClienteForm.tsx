'use client'

import { Cliente } from "@/app/types/cliente";
import axios from "@/node_modules/axios/index";
import Link from "@/node_modules/next/link";
import { useRouter } from "@/node_modules/next/navigation";
import { useState } from "react";

// Dados que esse formulário pode receber: um cliente já existente (modo edição) ou nada (modo cadastro)
interface ClienteFormProps {
    clienteExistente?: Cliente;
}

// Formulário de cliente. Serve tanto para cadastrar um novo quanto para editar um já existente
export default function ClienteForm({ clienteExistente }: ClienteFormProps) {
    const router = useRouter();

    // Se recebeu um cliente existente, começa com os dados dele. Se não, começa em branco (cadastro novo)
    const [cliente, setCliente] = useState<Cliente>(
        clienteExistente ||
        new Cliente(null, "", "", "ATIVO", "", "")
    );

    // Atualiza um campo específico do cliente conforme a pessoa digita
    const handlerChange = (campo: 'nome' | 'email' | 'status' | 'cpf' | 'telefone', valor: string) => {
        setCliente(valorAnterior =>
            new Cliente(
                valorAnterior.id,
                campo === 'nome' ? valor : valorAnterior.nome,
                campo === 'email' ? valor : valorAnterior.email,
                campo === 'status' ? valor : valorAnterior.status,
                campo === 'cpf' ? valor : valorAnterior.cpf,
                campo === 'telefone' ? valor : valorAnterior.telefone
            )
        )
    }
    

    // Salva o cliente: se já existir, atualiza; se não, cria um novo. Depois volta para a lista
    const handlerSalvar = async (formData: FormData) => {

        if (clienteExistente) {
            // Já existe: atualiza os dados desse cliente
            var dadosRetorno = await axios.put<number>('http://localhost:8080/clientes/' + cliente.id, cliente);

            if (dadosRetorno.status == 200) {
                alert("Cliente foi salvo com sucesso!");
            } else {
                alert(dadosRetorno.data);
                return;
            }

        } else {
            // Não existe ainda: cria um cliente novo
            var dadosRetorno = await axios.post<number>('http://localhost:8080/clientes', cliente);

            if (dadosRetorno.status == 200) {
                alert("Cliente foi salvo com sucesso!");
            } else {
                alert(dadosRetorno.data);
                return;
            }
        }

        // Depois de salvar, volta para a listagem de clientes
        router.push("/clientes");

    }

    return (
        <form action={handlerSalvar} className="space-y-6">

            {/* Campos do formulário: nome, CPF, e-mail, telefone e status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Nome completo:
                    </label>
                    <input
                        name="nome"
                        value={cliente.nome}
                        required
                        onChange={(e) => handlerChange('nome', e.target.value)}
                        placeholder="João da Silva Sauro"
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        CPF/CNPJ:
                    </label>
                    <input
                        name="cpf"
                        value={cliente.cpf}
                        required
                        placeholder="000.000.000-00"
                        onChange={(e) => handlerChange('cpf', e.target.value)}
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
                <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Status:
                    </label>
                    <select
                        name="status"
                        value={cliente.status}
                        onChange={(e) => handlerChange('status', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                        <option value="ATIVO">ATIVO</option>
                        <option value="BLOQUEADO">BLOQUEADO</option>
                        <option value="EXCLUIDO">EXCLUIDO</option>
                    </select>
                </div>
            </div>

            {/* Botões: cancelar volta para a lista sem salvar, salvar envia o formulário */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/[0.08]">
                <Link href="/clientes" className="px-5 py-2.5 bg-white/[0.03] hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-500/10 text-slate-300 hover:text-white font-medium text-sm rounded-xl transition-all duration-300 text-center border border-white/[0.08] hover:border-blue-400/40 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)]"> Cancelar</Link>
                <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 text-white font-semibold text-sm rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 hover:-translate-y-0.5 active:translate-y-0"> Salvar</button>
            </div>
        </form>
    );
}
