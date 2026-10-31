"use client"

import Link from "@/node_modules/next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

// cores de cada card (classes completas para o Tailwind enxergar)
const cores: Record<string, { card: string, blob: string, icone: string, titulo: string, seta: string }> = {
    blue: { card: "hover:border-blue-500/50 hover:shadow-blue-500/10", blob: "bg-blue-500/5 group-hover:bg-blue-500/10", icone: "bg-blue-500/10 border-blue-500/20 text-blue-400", titulo: "group-hover:text-blue-400", seta: "group-hover:text-blue-400" },
    cyan: { card: "hover:border-cyan-500/50 hover:shadow-cyan-500/10", blob: "bg-cyan-500/5 group-hover:bg-cyan-500/10", icone: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400", titulo: "group-hover:text-cyan-400", seta: "group-hover:text-cyan-400" },
    teal: { card: "hover:border-teal-500/50 hover:shadow-teal-500/10", blob: "bg-teal-500/5 group-hover:bg-teal-500/10", icone: "bg-teal-500/10 border-teal-500/20 text-teal-400", titulo: "group-hover:text-teal-400", seta: "group-hover:text-teal-400" },
    indigo: { card: "hover:border-indigo-500/50 hover:shadow-indigo-500/10", blob: "bg-indigo-500/5 group-hover:bg-indigo-500/10", icone: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400", titulo: "group-hover:text-indigo-400", seta: "group-hover:text-indigo-400" },
};

// cards da home (MUDANÇA: cada perfil só vê os cards que pode usar)
const cards = [
    { href: "/usuarios", sigla: "US", titulo: "Usuários", texto: "Cadastro dos donos das empresas e acessos", cor: "blue", perfis: ["ROLE_ADMIN"] },
    { href: "/clientes", sigla: "CL", titulo: "Clientes", texto: "Empresas cadastradas na plataforma", cor: "cyan", perfis: ["ROLE_ADMIN"] },
    { href: "/projetos", sigla: "PJ", titulo: "Projetos", texto: "Seus projetos, prazos e propostas recebidas", cor: "teal", perfis: ["ROLE_ADMIN", "ROLE_EMPRESA"] },
    { href: "/categorias", sigla: "CT", titulo: "Categorias", texto: "Organização dos projetos por área de atuação", cor: "indigo", perfis: ["ROLE_ADMIN"] },
    { href: "/vagas", sigla: "VG", titulo: "Vagas", texto: "Projetos abertos que combinam com as suas habilidades", cor: "teal", perfis: ["ROLE_FREELANCER"] },
    { href: "/habilidades", sigla: "HB", titulo: "Habilidades", texto: "Escolha as categorias em que você atua", cor: "indigo", perfis: ["ROLE_FREELANCER"] },
    { href: "/propostas", sigla: "PR", titulo: "Propostas", texto: "Orçamentos, status e negociações ativas", cor: "blue", perfis: ["ROLE_ADMIN", "ROLE_EMPRESA", "ROLE_FREELANCER"] },
];

export default function Home(){
    // perfil do usuário logado (vem do Redux)
    const role = useSelector((state: RootState) => state.auth.usuario?.role) ?? "";

    return(
        <div className="relative min-h-screen bg-black flex flex-col text-slate-100 overflow-hidden p-6 md:p-10">
            {/* Background Glow Effects */}
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full blur-[100px] z-0 pointer-events-none top-[-10%] left-[-10%] animate-pulse"></div>
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-600/20 to-blue-500/20 rounded-full blur-[100px] z-0 pointer-events-none bottom-[-10%] right-[-10%] animate-pulse"></div>

            {/* Main Container */}
            <div className="w-full max-w-6xl mx-auto relative z-10 space-y-8 my-auto">

                {/* Header Section with Modern Glassmorphism & Sub-badge */}
                <div className="relative bg-slate-950/60 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-950/30 overflow-hidden text-center space-y-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>

                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                        Painel de Controle Principal
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                        Bem-vindo ao Sistema
                    </h1>

                    <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Sua plataforma completa de gestão integrada. Navegue pelos módulos abaixo para gerenciar seus projetos e propostas com máxima eficiência e controle.
                    </p>
                </div>

                {/* Quick Links / Dashboard Grid with Enhanced Interactive States */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {cards.filter(card => card.perfis.includes(role)).map((card) => {
                        const cor = cores[card.cor];
                        return (
                            <Link key={card.href} href={card.href} className={`group relative bg-slate-950/70 hover:bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 ${cor.card}`}>
                                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full pointer-events-none transition-colors ${cor.blob}`}></div>
                                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform font-bold text-sm ${cor.icone}`}>
                                    {card.sigla}
                                </div>
                                <h2 className={`text-lg font-bold text-slate-100 transition-colors flex items-center justify-between ${cor.titulo}`}>
                                    {card.titulo}
                                    <span className={`text-xs text-slate-500 transition-colors ${cor.seta}`}>&rarr;</span>
                                </h2>
                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{card.texto}</p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
