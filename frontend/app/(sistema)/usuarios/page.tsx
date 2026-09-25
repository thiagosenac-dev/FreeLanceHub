"use client"
import { Usuario } from "@/app/types/usuario";
import axios from "@/node_modules/axios/index";
import Link from "@/node_modules/next/link";
import { useEffect, useState } from "react";


export default function Usuarios(){

    // Lista de usuários que vem da API
    const [usuarios,setUsuarios] = useState<Usuario[]>([]);

    // Busca a lista assim que a tela abre
    useEffect(()=>{
        carregarDados();
    },[]);

    const carregarDados = async ()=>{

        try {
            const dados = await axios.get<Usuario[]>("http://localhost:8080/usuarios");

            setUsuarios( dados.data);

        } catch (error) {
            alert("Erro ao carregar dados!")
        }
       

    }

    // Deleta o usuário e recarrega a lista
    const handleDeletarUsuario = async(usuario:Usuario) =>{

        var dadosRetorno = await  
        axios.delete('http://localhost:8080/usuarios/'+usuario.id+'/excluir');

        if(dadosRetorno.status==200){
            alert("Excluido com sucesso!");
        }else{
            alert(dadosRetorno.data);

            return;
        }

        carregarDados();

    }

    // Inverte o status do usuário entre ativo e bloqueado
    const handleAlterarStatusUsuario = async(usuario:Usuario) =>{


        var novoStatus = {};
        if(usuario.status ==="ATIVO"){
            novoStatus = {status:"BLOQUEADO"}
        }else{
            novoStatus = {status:"ATIVO"}
        }

        var dadosRetorno = await  
        axios.patch('http://localhost:8080/usuarios/'+usuario.id+'/status',novoStatus);

        if(dadosRetorno.status==200){
            alert("Atulizado status com sucesso!");
        }else{
            alert(dadosRetorno.data);

            return;
        }

        carregarDados();

    }
    

    return (
        <div className="relative min-h-screen bg-black text-slate-100 overflow-hidden p-6 md:p-10">

            {/* blobs de fundo, só decoração */}
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full blur-[100px] z-0 pointer-events-none top-[-10%] left-[-10%] animate-pulse"></div>
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-600/20 to-blue-500/20 rounded-full blur-[100px] z-0 pointer-events-none bottom-[-10%] right-[-10%] animate-pulse"></div>

            <div className="w-full max-w-6xl mx-auto relative z-10 space-y-6">

                {/* Cabeçalho com título e botão de novo usuário */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-2xl shadow-blue-950/20">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Gestão de usuários
                    </h1>
                    <Link 
                        href="/usuarios/novo"
                        className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm rounded-lg shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-[0.99] w-full sm:w-auto text-center"
                    >
                        + Novo Usuário
                    </Link>
                </div>
        
                {/* Tabela com a lista de usuários */}
                <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl shadow-blue-950/20 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-900/40 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                    <th className="py-4 px-6">Código</th>
                                    <th className="py-4 px-6">Nome</th>
                                    <th className="py-4 px-6">CPF</th>
                                    <th className="py-4 px-6">E-mail</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-sm">
                               {usuarios.map((usuario)=>(     
                                <tr key={usuario.id} className="hover:bg-slate-900/30 transition-colors">
                                    <td className="py-4 px-6 text-slate-400">{usuario.id}</td>
                                    <td className="py-4 px-6 text-slate-200 font-medium">{usuario.nome}</td>
                                    <td className="py-4 px-6 text-slate-400">{usuario.cpf}</td>
                                    <td className="py-4 px-6 text-slate-400">{usuario.email}</td>

                                    {/* Badge do status: verde quando ativo, âmbar quando bloqueado */}
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                                            usuario.status === 'BLOQUEADO'
                                            ? 'bg-amber-600/10 text-amber-500 border-amber-600/20'
                                            : usuario.status === 'EXCLUIDO'
                                            ? 'bg-rose-600/10 text-rose-500 border-rose-600/20'
                                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        }`}>
                                            {usuario.status}
                                        </span>
                                    </td>

                                    {/* Ações: editar, deletar e alternar status */}
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link 
                                                href={`/usuarios/${usuario.id}/editar`}
                                                className="text-blue-400 hover:text-blue-300 font-medium text-xs transition-colors"
                                            >
                                                Editar
                                            </Link>
                                            <button 
                                                onClick={()=> handleDeletarUsuario(usuario)}
                                                className="text-rose-400 hover:text-rose-300 font-medium text-xs transition-colors cursor-pointer"
                                            >
                                                Deletar
                                            </button>
                                            <button 
                                                onClick={()=> handleAlterarStatusUsuario(usuario)}
                                                className={`font-medium text-xs transition-colors cursor-pointer ${usuario.status ==='BLOQUEADO'
                                                    ?'text-orange-400 hover:text-orange-300' 
                                                    :'text-green-400 hover:text-green-300' }`
                                                }
                                            >
                                                {usuario.status === 'BLOQUEADO' ? 'Ativar' : 'Bloquear'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                ))}

                                {/* Mensagem quando não tem ninguém cadastrado */}
                                { usuarios.length === 0 &&
                                (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-slate-500 italic">
                                            Nenhum usuário encontrado
                                        </td>
                                    </tr>
                                )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )

}