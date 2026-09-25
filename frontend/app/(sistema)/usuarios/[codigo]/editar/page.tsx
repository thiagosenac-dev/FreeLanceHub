"use client"

import { useEffect, useState } from "react";
import { Sora } from "next/font/google";
import Link from "@/node_modules/next/link";
import axios from "@/node_modules/axios/index";
import { useParams } from "@/node_modules/next/navigation";
import UsuarioForm from "../../components/UsuarioForm";

// mesma fonte do menu lateral
const sora = Sora({ subsets: ["latin"] });

export default function EditarUsuario(){
    // pega o código do usuário que vem na rota
    const codigo = Number(useParams().codigo);
    // busca o nome do usuário pra mostrar no título
    const [nome, setNome] = useState("");
    useEffect(() => { axios.get(`http://localhost:8080/usuarios/${codigo}`).then(({ data }) => setNome(data.nome)).catch(() => {}); }, [codigo]);
    const glowClasses = "pointer-events-none absolute -z-10 rounded-full blur-3xl animate-pulse";
    const cardClasses = "relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-blue-950/30";

    return(
        <div className={`${sora.className} relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-black via-[#030a1c] to-[#020617] p-4 sm:p-8 ring-1 ring-blue-500/10 min-h-[calc(100vh-10rem)]`}>
            {/* brilhos e grade do fundo */}          
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] bg-[linear-gradient(to_right,#60a5fa_1px,transparent_1px),linear-gradient(to_bottom,#60a5fa_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"></div>
            <div className="relative space-y-6">
                {/* cabeçalho com título e botão de voltar */}
                <div className={`${cardClasses} flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6`}>
                    <div className="space-y-1.5">
                        <h1 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold tracking-tight">
                            <span className="h-3 w-3 shrink-0 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_14px_2px_rgba(34,211,238,0.8)]"></span>
                            <span className="bg-gradient-to-r from-blue-300 via-sky-300 to-cyan-300 bg-clip-text text-transparent">Editar Usuário: {nome}, Codigo: {codigo}</span>
                        </h1>
                        <p className="text-sm text-slate-400">Preencha os dados para editar o Usuário</p>
                    </div>
                    <Link href="/usuarios" className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-blue-400/20 bg-gradient-to-r from-blue-600/20 to-cyan-500/10 px-5 py-2.5 text-sm font-medium text-blue-100 transition-all duration-300 hover:border-cyan-400/60 hover:from-blue-600 hover:to-cyan-500 hover:text-white hover:shadow-[0_0_25px_-5px_rgba(34,211,238,0.7)]">
                        <span className="transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
                        Voltar para Listagem
                    </Link>
                </div>
                {/* card do formulário */}
                <div className={`${cardClasses} p-6 md:p-8`}>
                    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"></div>
                    <UsuarioForm codigo={codigo}/>
                </div>
            </div>
        </div>
    )
}