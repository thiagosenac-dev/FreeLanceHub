'use client'

import Link from "@/node_modules/next/link";
import { atualizarStatusProposta, buscarListaPropostas, cancelarProposta as cancelarPropostaBack } from "@/app/services/propostaService";
import { RootState } from "@/app/redux/store";
import { Proposta } from "@/app/types/proposta";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Mostra um nome e uma cor diferente para cada status da proposta
// MUDANÇA: os status agora são os mesmos do back (ACEITA, RECUSADA, CANCELADA)
const statusInfo: Record<string, { label: string; style: string }> = {
    PENDENTE: { label: "Pendente", style: "bg-amber-600/10 text-amber-500 border border-amber-600/20" },
    ACEITA: { label: "Aceita", style: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
    RECUSADA: { label: "Recusada", style: "bg-rose-500/10 text-rose-400 border border-rose-500/20" },
    CANCELADA: { label: "Cancelada", style: "bg-slate-500/10 text-slate-400 border border-slate-500/20" },
};

export default function Propostas() {

    // Estado com a lista de propostas e o perfil do usuário logado
    const [propostas, setPropostas] = useState<Proposta[]>([])
    // perfil do usuário logado, vem do Redux
    const role = useSelector((state: RootState) => state.auth.usuario?.role) ?? "";

    // Carrega a lista assim que a página abre
    useEffect(() => {
        carregarDados();
    }, []);

    // Busca as propostas na API (o back já filtra pelo perfil)
    const carregarDados = async () => {
        try {
            setPropostas(await buscarListaPropostas());
        } catch (error) {
            alert("Erro ao carregar dados")
        }
    }

    // Freelancer cancela a própria proposta
    const cancelarProposta = async (id: number | null) => {
        if (!confirm("Deseja realmente cancelar esta Proposta?")) {
            return;
        }
        try {
            var dadosRetorno = await cancelarPropostaBack(id || 0);

            if (dadosRetorno == 200) {
                alert("Proposta cancelada com sucesso!");
            } else {
                alert("Erro ao cancelar proposta!");
            }
        } catch (erro) {
            alert((erro as { response?: { data?: string } }).response?.data || "Erro ao cancelar proposta");
        }
        carregarDados();
    }

    // MUDANÇA: empresa aceita ou recusa a proposta (ao aceitar, as outras do projeto são recusadas)
    const alterarStatus = async (id: number | null, status: string) => {
        try {
            await atualizarStatusProposta(id, status);
        } catch (erro) {
            alert((erro as { response?: { data?: string } }).response?.data || "Erro ao atualizar status");
        }
        carregarDados();
    }

    // Conta quantas propostas existem com um determinado status
    const contar = (status: string) => propostas.filter(p => String(p.status).toUpperCase() === status).length;

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
                            {role === "ROLE_FREELANCER" ? "Minhas Propostas" : "Gestão de Propostas"}
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">Acompanhe e gerencie as propostas</p>
                    </div>

                    {/* MUDANÇA: só o freelancer envia proposta, escolhendo uma vaga */}
                    {role === "ROLE_FREELANCER" && (
                        <Link
                            href="/vagas"
                            className="inline-flex items-center justify-center py-3 px-5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/25 transition-all duration-200 transform active:scale-[0.99] cursor-pointer text-sm tracking-wide w-full sm:w-auto text-center"
                        >
                            Ver vagas
                        </Link>
                    )}
                </div>

                {/* Barra com o resumo das propostas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-xl p-4 shadow-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total de Propostas</span>
                        <p className="text-2xl font-bold text-slate-100 mt-1">{propostas.length}</p>
                    </div>
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-xl p-4 shadow-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pendentes</span>
                        <p className="text-2xl font-bold text-amber-500 mt-1">{contar("PENDENTE")}</p>
                    </div>
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-xl p-4 shadow-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Aceitas</span>
                        <p className="text-2xl font-bold text-emerald-400 mt-1">{contar("ACEITA")}</p>
                    </div>
                </div>

                {/* Tabela de Propostas */}
                <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl shadow-blue-950/20 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">

                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-900/40 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                    <th className="py-4 px-6">Código</th>
                                    <th className="py-4 px-6">{role === "ROLE_FREELANCER" ? "Projeto" : "Contato do Freelancer"}</th>
                                    <th className="py-4 px-6">Descrição</th>
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
                                                {role === "ROLE_FREELANCER" ? `#${proposta.projetoId}` : (
                                                    <div className="leading-tight">
                                                        <p className="text-slate-200 font-medium">{proposta.freelancerNome}</p>
                                                        <p className="text-xs">{proposta.freelancerEmail}</p>
                                                    </div>
                                                )}
                                            </td>

                                            <td className="py-4 px-6 text-slate-200 font-medium">{proposta.descricao}</td>

                                            <td className="py-4 px-6 text-slate-400">
                                                {Number(proposta.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                            </td>

                                            <td className="py-4 px-6 text-slate-400">{/^\d{4}-\d{2}-\d{2}$/.test(proposta.prazo) ? proposta.prazo.split('-').reverse().join('/') : proposta.prazo}</td>

                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${info.style}`}>
                                                    {info.label}
                                                </span>
                                            </td>

                                            {/* Ações: o freelancer edita e cancela, a empresa aceita e recusa (só pendentes) */}
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    {pendente && role === "ROLE_FREELANCER" && (
                                                        <>
                                                            <Link
                                                                href={`/propostas/${proposta.id}`}
                                                                className="text-blue-400 hover:text-blue-300 font-medium text-xs transition-colors"
                                                            >
                                                                Editar
                                                            </Link>
                                                            <button
                                                                onClick={() => cancelarProposta(proposta.id)}
                                                                className="text-rose-400 hover:text-rose-300 font-medium text-xs transition-colors cursor-pointer"
                                                            >
                                                                Cancelar
                                                            </button>
                                                        </>
                                                    )}
                                                    {pendente && role !== "ROLE_FREELANCER" && (
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

                                {/* Mensagem se a lista estiver vazia */}
                                {propostas.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="py-12 text-center text-slate-500 italic">
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
    )
}
