'use client'

import Link from "@/node_modules/next/link";
import { atualizarStatusProposta, buscarPropostasDoProjeto } from "@/app/services/propostaService";
import { Proposta } from "@/app/types/proposta";
import { useParams } from "@/node_modules/next/navigation";
import { useEffect, useState } from "react";

// Mostra um nome e uma cor diferente para cada status da proposta
const statusInfo: Record<string, { label: string; style: string }> = {
    PENDENTE: { label: "Pendente", style: "bg-amber-600/10 text-amber-500 border border-amber-600/20" },
    ACEITA: { label: "Aceita", style: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
    RECUSADA: { label: "Recusada", style: "bg-rose-500/10 text-rose-400 border border-rose-500/20" },
    CANCELADA: { label: "Cancelada", style: "bg-slate-500/10 text-slate-400 border border-slate-500/20" },
};

// MUDANÇA (novo): a empresa vê todas as propostas recebidas por um projeto dela
export default function PropostasDoProjeto() {

    // Pega o código do projeto que veio na URL (ex: /projetos/5/propostas)
    const parametro = useParams();
    const codigo = Number(parametro.codigo);

    const [propostas, setPropostas] = useState<Proposta[]>([])

    useEffect(() => {
        carregarDados();
    }, []);

    // Busca as propostas do projeto
    const carregarDados = async () => {
        try {
            setPropostas(await buscarPropostasDoProjeto(codigo));
        } catch (error) {
            alert("Erro ao carregar dados")
        }
    }

    // Aceita ou recusa a proposta (ao aceitar, as outras do projeto são recusadas)
    const alterarStatus = async (id: number | null, status: string) => {
        try {
            await atualizarStatusProposta(id, status);
        } catch (error: any) {
            alert(error.response?.data ?? "Erro ao atualizar status");
        }
        carregarDados();
    }

    return (
        <div className="relative min-h-screen bg-black flex flex-col text-slate-100 overflow-hidden p-6 md:p-10">
            {/* blobs de fundo */}
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full blur-[100px] z-0 pointer-events-none top-[-10%] left-[-10%] animate-pulse"></div>
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-600/20 to-blue-500/20 rounded-full blur-[100px] z-0 pointer-events-none bottom-[-10%] right-[-10%] animate-pulse"></div>

            <div className="w-full max-w-6xl mx-auto relative z-10 space-y-6">

                {/* Cabeçalho */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-2xl shadow-blue-950/20">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Propostas do Projeto {codigo}
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">Aceite uma proposta, as outras pendentes serão recusadas automaticamente</p>
                    </div>
                    <Link href="/projetos" className="inline-flex items-center justify-center text-sm font-medium text-slate-300 hover:text-white bg-white/[0.03] hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-500/10 border border-white/[0.08] hover:border-blue-400/40 px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)] hover:-translate-x-0.5 w-full sm:w-auto">
                        &larr; Voltar para Projetos
                    </Link>
                </div>

                {/* Tabela de propostas do projeto */}
                <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl shadow-blue-950/20 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-900/40 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                    <th className="py-4 px-6">Código</th>
                                    <th className="py-4 px-6">Contato do Freelancer</th>
                                    <th className="py-4 px-6">Valor</th>
                                    <th className="py-4 px-6">Prazo</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-sm">
                                {propostas.map((proposta) => {
                                    const info = statusInfo[String(proposta.status).toUpperCase()] || { label: proposta.status, style: "bg-slate-500/10 text-slate-400 border border-slate-500/20" };
                                    const pendente = String(proposta.status).toUpperCase() === "PENDENTE";

                                    return (
                                        <tr key={proposta.id} className="hover:bg-slate-900/30 transition-colors">
                                            <td className="py-4 px-6 text-slate-400">#{proposta.id}</td>
                                            <td className="py-4 px-6 text-slate-400">
                                                <div className="leading-tight">
                                                    <p className="text-slate-200 font-medium">{proposta.freelancerNome}</p>
                                                    <p className="text-xs">{proposta.freelancerEmail}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-slate-400">
                                                {Number(proposta.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                            </td>
                                            <td className="py-4 px-6 text-slate-400">{proposta.prazo}</td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${info.style}`}>
                                                    {info.label}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    {pendente && (
                                                        <>
                                                            <button
                                                                onClick={() => alterarStatus(proposta.id, "ACEITA")}
                                                                className="text-green-400 hover:text-green-300 font-medium text-xs transition-colors cursor-pointer"
                                                            >
                                                                Aceitar
                                                            </button>
                                                            <button
                                                                onClick={() => alterarStatus(proposta.id, "RECUSADA")}
                                                                className="text-rose-400 hover:text-rose-300 font-medium text-xs transition-colors cursor-pointer"
                                                            >
                                                                Recusar
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {propostas.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-slate-500 italic">
                                            Nenhuma proposta recebida
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
