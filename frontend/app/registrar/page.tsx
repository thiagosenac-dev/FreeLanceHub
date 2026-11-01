'use client'

import { registrarFreelancer } from "@/app/services/authService";
import Link from "@/node_modules/next/link";
import { useRouter } from "@/node_modules/next/navigation";
import { useState } from "react";

// MUDANÇA (novo): cadastro público de freelancer
export default function Registrar(){
    const router = useRouter();

    // guarda o que a pessoa digitou (assim os campos não somem quando dá erro)
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // envia os dados para o back, que cria o usuário como freelancer
    const handlerRegistrar = async(formData : FormData) =>{
        const dadosRetorno = await registrarFreelancer({
            nome: nome,
            cpf: cpf,
            email: email,
            senha: senha,
        });

        if (dadosRetorno.status == 200){
            alert("Cadastro realizado! Agora é só entrar.");
            router.push("/login");
        } else {
            alert(dadosRetorno.data);
        }
    }

    const inputClasses = "w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm";
    const labelClasses = "block text-xs font-semibold uppercase tracking-wider text-slate-300";

    return(
    <div className="relative min-h-screen bg-black text-slate-100 flex items-center justify-center overflow-hidden px-4 py-10">
        {/* Efeitinho das bola azul que fica piscando */}
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full blur-[100px] z-0 pointer-events-none top-[-10%] left-[-10%] animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-600/20 to-blue-500/20 rounded-full blur-[100px] z-0 pointer-events-none bottom-[-10%] right-[-10%] animate-pulse"></div>

        {/* botão para voltar à página inicial */}
        <Link href="/" className="absolute top-5 left-5 z-10 inline-flex items-center justify-center text-sm font-medium text-slate-300 hover:text-white bg-white/[0.03] hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-500/10 border border-white/[0.08] hover:border-blue-400/40 px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)]">
            &larr; Voltar à página inicial
        </Link>

        <div className="w-full max-w-md bg-slate-950/70 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-8 md:p-10 shadow-2xl shadow-blue-950/30 relative z-10">
            <div className="text-center mb-8 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-1">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                    Novo Freelancer
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                    Criar Conta
                </h1>
                <p className="text-sm text-slate-400">Cadastre-se para enviar propostas aos projetos</p>
            </div>

            <form action={handlerRegistrar} className="space-y-5">
                <div className="space-y-1.5">
                    <label className={labelClasses}>Nome completo</label>
                    <input name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required placeholder="João da Silva Sauro" className={inputClasses} />
                </div>
                <div className="space-y-1.5">
                    <label className={labelClasses}>CPF</label>
                    <input name="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} required placeholder="000.000.000-00" className={inputClasses} />
                </div>
                <div className="space-y-1.5">
                    <label className={labelClasses}>E-mail</label>
                    <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="seu@email.com" className={inputClasses} />
                </div>
                <div className="space-y-1.5">
                    <label className={labelClasses}>Senha</label>
                    <input name="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required placeholder="••••••••" className={inputClasses} />
                </div>

                <button
                    type="submit"
                    className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 transform active:scale-[0.99] cursor-pointer text-sm tracking-wide"
                >
                    CADASTRAR
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
                Já tem conta? <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">Entrar</Link>
            </p>
        </div>
    </div>
    );
}
