"use client"

import { buscarCategoriasPublicas, buscarProjetosPublicos } from "@/app/services/publicoService";
import { RootState } from "@/app/redux/store";
import { Categoria } from "@/app/types/categoria";
import { Projeto } from "@/app/types/projeto";
import Link from "@/node_modules/next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// MUDANÇA (novo): lista pública de projetos abertos na landing page (sem login)
export default function ProjetosPublicos() {
    const [projetos, setProjetos] = useState<Projeto[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    // se já tem login (token no Redux), o botão leva direto para as vagas
    const token = useSelector((state: RootState) => state.auth.token);
    const [logado, setLogado] = useState(false);

    useEffect(() => {
        setLogado(!!token);
    }, [token]);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            setProjetos(await buscarProjetosPublicos());
            setCategorias(await buscarCategoriasPublicas());
        } catch (error) {
            setProjetos([]);
        }
    }

    return (
        <section id="projetos" className="py-24 relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

                <div className="text-center space-y-3">
                    <h2 className="font-heading text-sm uppercase tracking-widest text-[#3b82f6] font-bold">Oportunidades</h2>
                    <h3 className="font-heading text-3xl sm:text-4xl font-bold text-white">Projetos abertos para <span className="text-gradient">candidaturas</span></h3>
                    <p className="text-gray-400">Escolha um projeto e envie a sua proposta.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projetos.map((projeto) => (
                        <div key={projeto.id} className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4">
                            <span className="self-start inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                {categorias.find(c => c.id === projeto.categoriaId)?.nome ?? "Geral"}
                            </span>
                            <h4 className="text-lg font-bold text-slate-100">{projeto.nome}</h4>
                            <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{projeto.descricao}</p>
                            <div className="flex items-center justify-between text-sm mt-auto">
                                <span className="font-semibold text-emerald-400">
                                    {Number(projeto.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                </span>
                                <span className="text-slate-500">Prazo: {/^\d{4}-\d{2}-\d{2}$/.test(projeto.prazo) ? projeto.prazo.split('-').reverse().join('/') : projeto.prazo}</span>
                            </div>
                            <Link
                                href={logado ? "/vagas" : "/login"}
                                className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm rounded-lg shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-[0.99] text-center"
                            >
                                Quero me candidatar
                            </Link>
                        </div>
                    ))}

                    {projetos.length === 0 && (
                        <p className="col-span-full text-center text-slate-500 italic">Nenhum projeto aberto no momento</p>
                    )}
                </div>
            </div>
        </section>
    );
}
