'use client'

import Link from "@/node_modules/next/link";
import axios from "@/node_modules/axios/index";
import { Proposta } from "@/app/types/proposta";
import { useEffect, useState } from "react";

export default function Propostas() {
    const [propostas, setPropostas] = useState<Proposta[]>([])

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const dados = await axios.get<Proposta[]>("http://localhost:8080/propostas")
            setPropostas(dados.data);
        } catch (error) {
            alert("Erro ao carregar dados")
        }
    }

    const excluirProposta = async (id: number | null) => {
        if (confirm("Deseja realmente excluir esta proposta?")) {
            try {
                await axios.delete(`http://localhost:8080/propostas/${id}`);
                setPropostas(propostas.filter(p => p.id !== id));
            } catch (error) {
                alert("Erro ao excluir proposta");
            }
        }
    }

    const statusLabels: Record<string, string> = {
        PENDENTE: "Pendente",
        ACEITA: "Aceita",
        RECUSADA: "Recusada",
        CANCELADA: "Cancelada",
        
    };

    const statusStyles: Record<string, string> = {
        PENDENTE: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
        ACEITA: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        RECUSADA: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
        CANCELADA: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    };

    const contar = (status: string) => propostas.filter(p => String(p.status).toUpperCase() === status).length;

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
                            Gestão de Propostas
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">Acompanhe e gerencie as propostas comerciais ativas</p>
                    </div>

                    <Link
                        href="/propostas/novo"
                        className="inline-flex items-center justify-center py-3 px-5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/25 transition-all duration-200 transform active:scale-[0.99] cursor-pointer text-sm tracking-wide w-full sm:w-auto text-center"
                    >
                        + Nova Proposta
                    </Link>
                </div>

                {/* Quick Stats Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-xl p-4 shadow-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total de Propostas</span>
                        <p className="text-2xl font-bold text-slate-100 mt-1">{propostas.length}</p>
                    </div>
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-xl p-4 shadow-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pendente</span>
                        <p className="text-2xl font-bold text-blue-400 mt-1">{contar("PENDENTE")}</p>
                    </div>
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-xl p-4 shadow-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Aprovadas</span>
                        <p className="text-2xl font-bold text-emerald-400 mt-1">{contar("ACEITA")}</p>
                    </div>
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-xl p-4 shadow-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">recusadas</span>
                        <p className="text-2xl font-bold text-blue-400 mt-1">{contar("RECUSADA")}</p>
                    </div>
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-xl p-4 shadow-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Canceladas</span>
                        <p className="text-2xl font-bold text-blue-400 mt-1">{contar("CANCELADA")}</p>
                    </div>
                </div>

                {/* Content / Table Section */}
                <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl shadow-blue-950/20 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-900/40 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                    <th className="py-4 px-6">Código</th>
                                    <th className="py-4 px-6">Descrição</th>
                                    <th className="py-4 px-6">Valor</th>
                                    <th className="py-4 px-6">Prazo</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-sm">
                                {propostas.map((proposta) => {
                                    const rawStatus = String(proposta.status).toUpperCase();
                                    const badgeClass = statusStyles[rawStatus] || "bg-slate-500/10 text-slate-400 border border-slate-500/20";
                                    const labelText = statusLabels[rawStatus] || proposta.status;

                                    return (
                                        <tr key={proposta.id} className="hover:bg-slate-900/30 transition-colors">
                                            <td className="py-4 px-6 text-slate-200 font-medium">#{proposta.id}</td>
                                            <td className="py-4 px-6 text-slate-200 font-medium">{proposta.descricao}</td>
                                            <td className="py-4 px-6 text-slate-400">
                                                {Number(proposta.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                            </td>
                                            <td className="py-4 px-6 text-slate-400">{proposta.prazo}</td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
                                                    {labelText}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <Link href={`/propostas/${proposta.id}/editar`} className="text-blue-400 hover:text-blue-300 font-medium text-xs transition-colors">
                                                        Editar
                                                    </Link>
                                                    <button
                                                        onClick={() => excluirProposta(proposta.id)}
                                                        className="text-rose-400 hover:text-rose-300 font-medium text-xs transition-colors cursor-pointer"
                                                    >
                                                        Excluir
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {propostas.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-slate-500 italic">
                                            Nenhuma proposta encontrada
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