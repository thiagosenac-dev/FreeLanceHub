'use client'

import Link from "@/node_modules/next/link";
import axios from "@/node_modules/axios/index";
import { Projeto } from "@/app/types/projeto";
import { useEffect, useState } from "react";

const statusInfo: Record<string, { label: string; style: string }> = {
    EM_ANDAMENTO: { label: "Em Andamento", style: "bg-blue-500/10 text-blue-400 border border-blue-500/20" },
    CONCLUIDO: { label: "Concluído", style: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
    CANCELADO: { label: "Cancelado", style: "bg-rose-500/10 text-rose-400 border border-rose-500/20" },
};

export default function Projetos() {
    const [projetos, setProjetos] = useState<Projeto[]>([])

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const dados = await axios.get<Projeto[]>("http://localhost:8080/projetos")
            setProjetos(dados.data);
        } catch (error) {
            alert("Erro ao carregar dados")
        }
    }

    const excluirProjeto = async (id: number | null) => {
        if (confirm("Deseja realmente excluir este projeto?")) {
            try {
                await axios.delete(`http://localhost:8080/projetos/${id}/excluir`);
                setProjetos(projetos.filter(p => p.id !== id));
            } catch (error) {
                alert("Erro ao excluir projeto");
            }
        }
    }

    const contar = (status: string) => projetos.filter(p => String(p.status).toUpperCase() === status).length;

    return (
        <div className="relative min-h-screen bg-black flex flex-col text-slate-100 overflow-hidden p-6 md:p-10">
              {/* luizinha piscando */}
              <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full blur-[100px] z-0 pointer-events-none top-[-10%] left-[-10%] animate-pulse"></div>
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-600/20 to-blue-500/20 rounded-full blur-[100px] z-0 pointer-events-none bottom-[-10%] right-[-10%] animate-pulse"></div>
             {/* luizinha piscando */}
            <div className="w-full max-w-6xl mx-auto relative z-10 space-y-6">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-2xl shadow-blue-950/20">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Gestão de Projetos
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">Acompanhe e gerencie o progresso dos projetos da plataforma</p>
                    </div>

                    <Link className="inline-flex items-center justify-center py-3 px-5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/25 transition-all duration-200 transform active:scale-[0.99] cursor-pointer text-sm tracking-wide w-full sm:w-auto text-center" href="/projetos/novo">
                        + Novo Projeto
                    </Link>
                </div>

                {/* Quick Stats Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-xl p-4 shadow-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total de Projetos</span>
                        <p className="text-2xl font-bold text-slate-100 mt-1">{projetos.length}</p>
                    </div>
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-xl p-4 shadow-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Em Andamento</span>
                        <p className="text-2xl font-bold text-blue-400 mt-1">{contar("EM_ANDAMENTO")}</p>
                    </div>
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-xl p-4 shadow-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Concluídos</span>
                        <p className="text-2xl font-bold text-emerald-400 mt-1">{contar("CONCLUIDO")}</p>
                    </div>
                </div>

                {/* Content / Table Section */}
                <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl shadow-blue-950/20 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-900/40 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                    <th className="py-4 px-6">Código</th>
                                    <th className="py-4 px-6">Projeto</th>
                                    <th className="py-4 px-6">Descrição</th>
                                    <th className="py-4 px-6">Valor</th>
                                    <th className="py-4 px-6">Prazo</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-sm">
                                {projetos.map((projeto) => {
                                    const info = statusInfo[String(projeto.status).toUpperCase()] || { label: projeto.status, style: "bg-slate-500/10 text-slate-400 border border-slate-500/20" };

                                    return (
                                        <tr key={projeto.id} className="hover:bg-slate-900/30 transition-colors">
                                            <td className="py-4 px-6 text-slate-200 font-medium">#{projeto.id}</td>
                                            <td className="py-4 px-6 text-slate-200 font-medium">{projeto.nome}</td>
                                            <td className="py-4 px-6 text-slate-400">{projeto.descricao}</td>
                                            <td className="py-4 px-6 text-slate-400">
                                                {Number(projeto.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                            </td>
                                            <td className="py-4 px-6 text-slate-400">{projeto.prazo}</td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${info.style}`}>
                                                    {info.label}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <Link href={`/projetos/${projeto.id}`} className="text-blue-400 hover:text-blue-300 font-medium text-xs transition-colors">
                                                        Editar
                                                    </Link>
                                                    <button
                                                        onClick={() => excluirProjeto(projeto.id)}
                                                        className="text-rose-400 hover:text-rose-300 font-medium text-xs transition-colors cursor-pointer"
                                                    >
                                                        Excluir
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {projetos.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="py-12 text-center text-slate-500 italic">
                                            Nenhum projeto encontrado
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