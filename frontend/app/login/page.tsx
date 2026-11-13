'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/slices/authSlice";
import { loginBack } from "../services/authService";
import { buscarUsuarioLogado } from "../services/usuarioService";
import { Usuario } from "../types/usuario";

export default function Login(){
    const router = useRouter();
    const dispatch = useDispatch();

    // guarda o e-mail digitado (assim ele não some quando a senha está errada)
    const [email, setEmail] = useState("");

    const handlerLogin = async(formData : FormData) =>{
        try{
            const emailTela = formData.get("email")?.toString() ?? "";
            const senhaTela = formData.get("senha")?.toString() ?? "";

            const loginResposta = await loginBack(emailTela, senhaTela);

            if (loginResposta != null){
                // guarda o token na store antes, o interceptor do axios lê ele de lá
                dispatch(login({
                    token: loginResposta.token,
                    usuario: { id: null, nome: "", email: emailTela, senha: "", status: "ATIVO", cpf: "", clienteId: null, role: loginResposta.role }
                }));

                var usuarioLogado: Usuario;
                try {
                    usuarioLogado = await buscarUsuarioLogado();
                } catch (erro) {
                    // não conseguiu buscar o usuário: desfaz o login
                    dispatch(logout());
                    throw erro;
                }

                // guarda o usuário completo (com o perfil) no Redux
                dispatch(login({
                    token: loginResposta.token,
                    usuario: { ...usuarioLogado, role: loginResposta.role }
                }));
                // o freelancer vai direto para as vagas
                router.push(loginResposta.role === "ROLE_USUARIO" ? "/vagas" : "/home")
            }
            else {
                alert("Usuário e/ou senha inválidos!")
            }
        }catch(e){
            // usuário bloqueado: o back devolve 403 com a mensagem para contatar o suporte
            const resposta = (e as { response?: { status?: number, data?: string } }).response;
            if (resposta?.status === 403 && resposta.data) {
                alert(resposta.data);
            } else {
                alert("Usuário e/ou senha inválidos!")
            }
        }
    }

    return(<>
    <div className="relative min-h-screen bg-black text-slate-100 flex items-center justify-center overflow-hidden px-4">
        {/* Efeitinho das bola azul que fica piscando */}
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full blur-[100px] z-0 pointer-events-none top-[-10%] left-[-10%] animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-600/20 to-blue-500/20 rounded-full blur-[100px] z-0 pointer-events-none bottom-[-10%] right-[-10%] animate-pulse"></div>
        {/* AQUI ACABA os efeitinho das bola azul que fica piscando */}
        {/* botão para voltar à página inicial */}
        <Link href="/" className="absolute top-5 left-5 z-10 inline-flex items-center justify-center text-sm font-medium text-slate-300 hover:text-white bg-white/[0.03] hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-500/10 border border-white/[0.08] hover:border-blue-400/40 px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)]">
            &larr; Voltar à página inicial
        </Link>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

            {/* MUDANÇA: link para o cadastro público */}
            <p className="mt-6 text-center text-sm text-slate-400">
                Ainda não tem conta? <Link href="/registrar" className="text-cyan-400 hover:text-cyan-300 font-medium">Cadastre-se como freelancer</Link>
            </p>
            {/* MUDANÇA: o cliente (pessoa ou empresa) também se cadastra sozinho */}
            <p className="mt-2 text-center text-sm text-slate-400">
                Quer publicar projetos? <Link href="/registrar-cliente" className="text-cyan-400 hover:text-cyan-300 font-medium">Cadastre-se como cliente</Link>
            </p>
        </div>
    </div>
    </>);

}