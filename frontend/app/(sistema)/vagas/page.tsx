'use client'

import Link from "@/node_modules/next/link";
import api from "@/app/services/api";
import { Projeto } from "@/app/types/projeto";
import { Categoria } from "@/app/types/categoria";
import { useEffect, useState } from "react";

// MUDANÇA (novo): vagas do freelancer, só projetos abertos das categorias que ele domina
export default function Vagas() {

    // Estados com os projetos e as categorias (para mostrar o nome)
    const [projetos, setProjetos] = useState<Projeto[]>([])
    const [categorias, setCategorias] = useState<Categoria[]>([])

    // Carrega assim que a página abre
    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const dados = await api.get<Projeto[]>("/freelancer/projetos")
            setProjetos(dados.data);
            const cats = await api.get<Categoria[]>("/categorias")
            setCategorias(cats.data);
        } catch (error) {
            alert("Erro ao carregar dados")
        }
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
                            Vagas para Você
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">Projetos abertos das categorias que você cadastrou como habilidade</p>
                    </div>

                    <Link
                        href="/habilidades"
                        className="inline-flex items-center justify-center py-3 px-5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/25 transition-all duration-200 transform active:scale-[0.99] text-sm tracking-wide w-full sm:w-auto text-center"
                    >
                        Minhas Habilidades
                    </Link>
                </div>

                {/* Cards dos projetos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {projetos.map((projeto) => (
                        <div key={projeto.id} className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4">
                            <span className="self-start inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                {categorias.find(c => c.id === projeto.categoriaId)?.nome ?? "-"}
                            </span>
                            <h2 className="text-lg font-bold text-slate-100">{projeto.nome}</h2>
                            <p className="text-sm text-slate-400 leading-relaxed">{projeto.descricao}</p>
                            <div className="flex items-center justify-between text-sm mt-auto">
                                <span className="font-semibold text-emerald-400">
                                    {Number(projeto.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                </span>
                                <span className="text-slate-500">Prazo: {projeto.prazo}</span>
                            </div>
                            <Link
                                href={`/propostas/novo?projetoId=${projeto.id}`}
                                className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm rounded-lg shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-[0.99] text-center"
                            >
                                Enviar proposta
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Mensagem se não tem vaga */}
                {projetos.length === 0 && (
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-12 text-center text-slate-500 italic">
                        Nenhuma vaga para as suas habilidades. Cadastre suas habilidades para ver projetos.
                    </div>
                )}
            </div>
        </div>
    );
}
