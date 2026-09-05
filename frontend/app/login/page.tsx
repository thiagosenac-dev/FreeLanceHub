'use client'

import { useRouter } from "@/node_modules/next/navigation";

export default function Login(){
    const router = useRouter();

    
    const handlerLogin = async(formData : FormData) =>{
        router.push("/home")

    }

    



    return(
    <>
    <div className="relative min-h-screen bg-black flex text-slate-100 flex items-center justify-center overflow-hidden px-4">
        <div className="glow-blob blob-1"></div>
        <div className="glow-blob blob-2"></div>
        
        <div className="w-full max-w-md bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-8 shadow-2xl shadow-blue-950/20 relative z-10">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-gradient">
                    Entrar no Sistema
                </h1>
                <p className="text-sm text-slate-400 mt-2">Insira suas credenciais para acessar a plataforma</p>
            </div>
            <form action = {handlerLogin} className="space-y-5">

                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                        E-mail
                    </label>
                    <input
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-lg px-4 py-3 
                    text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 
                    focus:ring-1 focus:ring-blue-500 transition-all text-sm">
                    </input>
                </div>
                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                        Senha
                    </label>
                    <input
                    name="senha"
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-lg px-4 
                    py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 
                    focus:ring-1 focus:ring-blue-500 transition-all text-sm">
                    </input>
                </div>
                <button type="submit" className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-blue-600 
                to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-lg 
                shadow-lg shadow-blue-500/25 transition-all duration-200 transform active:scale-[0.99] 
                cursor-pointer text-sm tracking-wide">ENTRAR</button>
            </form>
        </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
        .glow-blob {
            position: absolute;
            width: 400px;
            height: 400px;
            background: linear-gradient(to right, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.15));
            border-radius: 50%;
            filter: blur(80px);
            z-index: 0;
            pointer-events: none;
            animation: float 10s infinite ease-in-out alternate;
        }
        .blob-1 { top: -10%; left: -10%; }
        .blob-2 { bottom: 20%; right: -10%; animation-delay: -5s; }

        @keyframes float {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(30px, 50px) scale(1.1); }
        }

        .text-gradient {
            background: linear-gradient(135deg, #60a5fa, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
      `}} />
    </>);
}