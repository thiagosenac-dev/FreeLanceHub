'use client'

import axios from "@/node_modules/axios/index";
import { useRouter } from "@/node_modules/next/navigation";
import { loginResponse } from "../types/auth";

export default function Login(){
    const router = useRouter();
    
    const handlerLogin = async(formData : FormData) =>{
        try{
            debugger;
            const emailTela = formData.get("email")?.toString() ?? "";
            const senhaTela = formData.get("senha")?.toString() ?? "";
           
            var loginResposta = await axios.post<loginResponse>("http://localhost:8080/auth/login", 
            {email: emailTela, senha: senhaTela});
           
   
            if (loginResposta.status == 200){
                router.push("/home")
            }
            else {
                alert("Usuário e/ou senha inválidos!")
            }
        }catch(e){
            alert("Usuário e/ou senha inválidos!")
 
        }
       
 
    }

    return(<>
    <div className="relative min-h-screen bg-black text-slate-100 flex items-center justify-center overflow-hidden px-4">
        {/* Efeitinho das bola azul que fica piscando */}
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full blur-[100px] z-0 pointer-events-none top-[-10%] left-[-10%] animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-600/20 to-blue-500/20 rounded-full blur-[100px] z-0 pointer-events-none bottom-[-10%] right-[-10%] animate-pulse"></div>
        {/* AQUI ACABA os efeitinho das bola azul que fica piscando */}
        <div className="w-full max-w-md bg-slate-950/70 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-8 md:p-10 shadow-2xl shadow-blue-950/30 relative z-10">
            <div className="text-center mb-8 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-1">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                    Área Restrita
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                    Entrar no Sistema
                </h1>
                <p className="text-sm text-slate-400">Insira suas credenciais para acessar a plataforma</p>
            </div>

            <form action={handlerLogin} className="space-y-5">
                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                        E-mail
                    </label>
                    <input
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3.5 
                        text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 
                        focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                        Senha
                    </label>
                    <input
                        name="senha"
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 
                        py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 
                        focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 transform active:scale-[0.99] cursor-pointer text-sm tracking-wide"
                >
                    ENTRAR
                </button>
            </form>
        </div>
    </div>
    </>);

}
