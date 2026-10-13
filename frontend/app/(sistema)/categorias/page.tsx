'use client'

import Link from "@/node_modules/next/link";
import axios from "@/node_modules/axios/index";

import { useEffect, useState } from "react";
import { Categoria } from "@/app/types/categoria";

export default function Categorias() {
    const [categorias, setCategorias] = useState<Categoria[]>([])

    useEffect(() => {
        carregarDados();
    }, []);

    // Busca todas as categorias na API
    const carregarDados = async () => {
        try {
            const dados = await axios.get<Categoria[]>("http://localhost:8080/categorias")
            setCategorias(dados.data);
        } catch (error) {
            alert("Erro ao carregar dados")
        }
    }

    // Exclui (inativa) a categoria e recarrega a lista
    const excluirCategoria = async (id: number | null) => {
        if (confirm("Deseja realmente excluir esta categoria?")) {
            try {
                await axios.delete(`http://localhost:8080/categorias/${id}/excluir`);
            } catch (error) {
                alert("Erro ao excluir categoria");
            }
        }
        carregarDados();
    }

    // Inverte o status da categoria entre ativo e bloqueado
    const handleAlterarStatusCategoria = async (categoria: Categoria) => {

        const novoStatus = String(categoria.status).toUpperCase() === "ATIVO"
            ? { status: "BLOQUEADO" }
            : { status: "ATIVO" };

        const dadosRetorno = await axios.patch('http://localhost:8080/categorias/' + categoria.id + '/status', novoStatus);

        if (dadosRetorno.status == 200) {
            alert("Atualizado status com sucesso!");
        } else {
            alert(dadosRetorno.data);
            return;
        }

        carregarDados();
    }

    const statusStyles: Record<string, string> = {
        ATIVO: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        BLOQUEADO: "bg-amber-600/10 text-amber-500 border border-amber-600/20",
        EXCLUIDO: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    };

    return (
        <div className="relative min-h-screen bg-black flex flex-col text-slate-100 overflow-hidden p-6 md:p-10">
            {/* luzinhas piscando */}
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full blur-[100px] z-0 pointer-events-none top-[-10%] left-[-10%] animate-pulse"></div>
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-600/20 to-blue-500/20 rounded-full blur-[100px] z-0 pointer-events-none bottom-[-10%] right-[-10%] animate-pulse"></div>

            <div className="w-full max-w-6xl mx-auto relative z-10 space-y-6">

                {/* Cabeçalho com título e botão de nova categoria */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-2xl shadow-blue-950/20">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Gestão de Categorias
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">Organize as categorias que serão usadas nos projetos</p>
                    </div>

                    <Link
                        href="/categorias/novo"
                        className="inline-flex items-center justify-center py-3 px-5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/25 transition-all duration-200 transform active:scale-[0.99] cursor-pointer text-sm tracking-wide w-full sm:w-auto text-center"
                    >
                        + Nova Categoria
                    </Link>
                </div>

                {/* Cards de resumo */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-xl p-4 shadow-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total de Categorias</span>
                        <p className="text-2xl font-bold text-slate-100 mt-1">{categorias.length}</p>
                    </div>
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-xl p-4 shadow-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Categorias Ativas</span>
                        <p className="text-2xl font-bold text-emerald-400 mt-1">
                            {categorias.filter(c => String(c.status).toUpperCase() === 'ATIVO').length}
                        </p>
                    </div>
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-xl p-4 shadow-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Inativas</span>
                        <p className="text-2xl font-bold text-slate-400 mt-1">
                            {categorias.filter(c => String(c.status).toUpperCase() !== 'ATIVO').length}
                        </p>
                    </div>
                </div>

                {/* Tabela de categorias */}
                <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl shadow-blue-950/20 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-900/40 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                    <th className="py-4 px-6">Categoria</th>
                                    <th className="py-4 px-6">Descrição</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Ações</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-800/60 text-sm">
                                {categorias.map((categoria) => {
                                    const rawStatus = categoria.status ? String(categoria.status).toUpperCase() : 'ATIVO';
                                    const badgeClass = statusStyles[rawStatus] || "bg-slate-500/10 text-slate-400 border border-slate-500/20";

                                    return (
                                        <tr key={categoria.id} className="hover:bg-slate-900/30 transition-colors">

                                            <td className="py-4 px-6 text-slate-200 font-medium">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs uppercase">
                                                        {categoria.nome ? categoria.nome.charAt(0) : 'C'}
                                                    </div>
                                                    {categoria.nome}
                                                </div>
                                            </td>

                                            <td className="py-4 px-6 text-slate-400">
                                                {categoria.descricao}
                                            </td>

                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
                                                    {rawStatus}
                                                </span>
                                            </td>

                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <Link
                                                        href={`/categorias/${categoria.id}/editar`}
                                                        className="text-blue-400 hover:text-blue-300 font-medium text-xs transition-colors"
                                                    >
                                                        Editar
                                                    </Link>

                                                    <button
                                                        onClick={() => excluirCategoria(categoria.id)}
                                                        className="text-rose-400 hover:text-rose-300 font-medium text-xs transition-colors cursor-pointer"
                                                    >
                                                        Excluir
                                                    </button>

                                                    <button
                                                        onClick={() => handleAlterarStatusCategoria(categoria)}
                                                        className={`font-medium text-xs transition-colors cursor-pointer ${rawStatus === 'BLOQUEADO'
                                                            ? 'text-orange-400 hover:text-orange-300'
                                                            : 'text-green-400 hover:text-green-300'}`}
                                                    >
                                                        {rawStatus === 'BLOQUEADO' ? 'Ativar' : 'Bloquear'}
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    );
                                })}

                                {categorias.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="py-12 text-center text-slate-500 italic">
                                            Nenhuma categoria encontrada
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
