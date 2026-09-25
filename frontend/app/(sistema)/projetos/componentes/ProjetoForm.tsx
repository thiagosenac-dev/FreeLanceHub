'use client'

import { Projeto } from "@/app/types/projeto";
import axios from "@/node_modules/axios/index";
import Link from "@/node_modules/next/link";
import { useRouter } from "@/node_modules/next/navigation";
import { useState } from "react";

// Dados que esse formulário pode receber: um projeto já existente (modo edição) ou nada (modo cadastro)
interface ProjetoFormProps {
    projetoExistente?: Projeto;
}

// Formulário de projeto. Serve tanto para cadastrar um novo quanto para editar um já existente
export default function ProjetoForm({ projetoExistente }: ProjetoFormProps) {
    const router = useRouter();

    // Se recebeu um projeto existente, começa com os dados dele. Se não, começa em branco (cadastro novo)
    const [projeto, setProjeto] = useState<Projeto>(
        projetoExistente ||
        new Projeto(null, "", "", 0, "", "EM_ANDAMENTO")
    );

    // Atualiza um campo específico do projeto conforme a pessoa digita
    const handlerChange = (campo: 'nome' | 'descricao' | 'valor' | 'prazo' | 'status', valor: string) => {
        setProjeto(valorAnterior =>
            new Projeto(
                valorAnterior.id,
                campo === 'nome' ? valor : valorAnterior.nome,
                campo === 'descricao' ? valor : valorAnterior.descricao,
                campo === 'valor' ? Number(valor) : valorAnterior.valor,
                campo === 'prazo' ? valor : valorAnterior.prazo,
                campo === 'status' ? valor : valorAnterior.status
            )
        )
    }

    // Salva o projeto: se já existir, atualiza; se não, cria um novo. Depois volta para a lista
    const handlerSalvar = async (formData: FormData) => {

        if (projetoExistente) {
            // Já existe: atualiza os dados desse projeto
            var dadosRetorno = await axios.put<number>('http://localhost:8080/projetos/' + projeto.id, projeto);

            if (dadosRetorno.status == 200) {
                alert("Projeto foi salvo com sucesso!");
            } else {
                alert(dadosRetorno.data);
                return;
            }

        } else {
            // Não existe ainda: cria um projeto novo
            var dadosRetorno = await axios.post<number>('http://localhost:8080/projetos', projeto);

            if (dadosRetorno.status == 200) {
                alert("Projeto foi salvo com sucesso!");
            } else {
                alert(dadosRetorno.data);
                return;
            }
        }

        // Depois de salvar, volta para a listagem de projetos
        router.push("/projetos");

    }

    return (
        <form action={handlerSalvar} className="space-y-6">

            {/* Campos do formulário: nome, descrição, valor, prazo e status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Nome do projeto:
                    </label>
                    <input
                        name="nome"
                        value={projeto.nome}
                        required
                        onChange={(e) => handlerChange('nome', e.target.value)}
                        placeholder="Site institucional"
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Descrição:
                    </label>
                    <textarea
                        name="descricao"
                        value={projeto.descricao}
                        required
                        rows={3}
                        onChange={(e) => handlerChange('descricao', e.target.value)}
                        placeholder="Descreva o que será entregue nesse projeto"
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </textarea>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Valor:
                    </label>
                    <input
                        name="valor"
                        type="number"
                        step="0.01"
                        value={projeto.valor}
                        required
                        placeholder="0,00"
                        onChange={(e) => handlerChange('valor', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Prazo:
                    </label>
                    <input
                        name="prazo"
                        type="date"
                        value={projeto.prazo}
                        required
                        onChange={(e) => handlerChange('prazo', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Status:
                    </label>
                    <select
                        name="status"
                        value={projeto.status}
                        onChange={(e) => handlerChange('status', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                        <option value="EM_ANDAMENTO">Em Andamento</option>
                        <option value="CONCLUIDO">Concluído</option>
                        <option value="CANCELADO">Cancelado</option>
                    </select>
                </div>
            </div>

            {/* Botões: cancelar volta para a lista sem salvar, salvar envia o formulário */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/[0.08]">
                <Link href="/projetos" className="px-5 py-2.5 bg-white/[0.03] hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-500/10 text-slate-300 hover:text-white font-medium text-sm rounded-xl transition-all duration-300 text-center border border-white/[0.08] hover:border-blue-400/40 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)]"> Cancelar</Link>
                <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 text-white font-semibold text-sm rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 hover:-translate-y-0.5 active:translate-y-0"> Salvar</button>
            </div>
        </form>
    );
}
