'use client'

import { adicionarHabilidade, buscarHabilidades, removerHabilidade } from "@/app/services/freelancerService";
import { buscarListaCategorias } from "@/app/services/categoriaService";
import { Categoria } from "@/app/types/categoria";
import { useEffect, useState } from "react";

// MUDANÇA (novo): o freelancer escolhe as categorias em que atua (habilidades)
export default function Habilidades() {

    // Todas as categorias e os ids das que o freelancer já tem
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [minhas, setMinhas] = useState<number[]>([])

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const cats = await buscarListaCategorias()
            setCategorias(cats.filter(c => String(c.status).toUpperCase() === "ATIVO"));
            const habilidades = await buscarHabilidades()
            setMinhas(habilidades.map(h => h.id as number));
        } catch (error) {
            alert("Erro ao carregar dados")
        }
    }

    // Se já tem a habilidade remove, se não tem adiciona
    const handlerAlternar = async (categoria: Categoria) => {
        try {
            if (minhas.includes(categoria.id as number)) {
                await removerHabilidade(categoria.id);
            } else {
                await adicionarHabilidade(categoria.id);
            }
        } catch (error) {
            alert("Erro ao atualizar habilidade");
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
                <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-2xl shadow-blue-950/20">
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Minhas Habilidades
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">Clique nas categorias em que você atua. Você só vê as vagas dessas categorias.</p>
                </div>

                {/* Categorias para escolher */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorias.map((categoria) => {
                        const ativa = minhas.includes(categoria.id as number);
                        return (
                            <button
                                key={categoria.id}
                                onClick={() => handlerAlternar(categoria)}
                                className={`text-left rounded-2xl p-5 border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${ativa
                                    ? 'bg-gradient-to-br from-blue-600/30 to-cyan-500/20 border-cyan-400/60 shadow-[0_0_25px_-5px_rgba(34,211,238,0.5)]'
                                    : 'bg-slate-950/80 border-slate-800/80 hover:border-blue-500/50'}`}
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-slate-100">{categoria.nome}</h2>
                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${ativa
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                                        {ativa ? 'Tenho' : 'Adicionar'}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-400 mt-2">{categoria.descricao}</p>
                            </button>
                        );
                    })}

                    {categorias.length === 0 && (
                        <p className="col-span-full text-center text-slate-500 italic py-12">Nenhuma categoria cadastrada</p>
                    )}
                </div>
            </div>
        </div>
    );
}
