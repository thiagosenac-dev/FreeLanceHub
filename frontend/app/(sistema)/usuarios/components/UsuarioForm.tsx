'use client'

import { Usuario, UsuarioFormProps } from "@/app/types/usuario";
import axios from "@/node_modules/axios/index";
import Link from "@/node_modules/next/link";
import { useRouter } from "@/node_modules/next/navigation";
import { useState } from "react";



// Formulário de usuário. Serve tanto para cadastrar um novo quanto para editar um já existente
export default function UsuarioForm({usuarioExistente}:UsuarioFormProps) {
    const router = useRouter();

    // Se recebeu um usuário existente, começa com os dados dele. Se não, começa em branco (cadastro novo)
    const [ usuario,setUsuario ] = useState<Usuario>(
        usuarioExistente ||
        new Usuario(null,"","","ATIVO","","")
    );

    // Atualiza um campo específico do usuário conforme a pessoa digita
    const handlerChange = ( campo: 'nome'|  'email' |'cpf'| 'senha', valor:string) =>{
        setUsuario(valorAnterior => 
            new Usuario(
                valorAnterior.id,
                campo === 'nome' ? valor : valorAnterior.nome,
                campo === 'email' ? valor : valorAnterior.email,
                valorAnterior.status,
                campo === 'cpf' ? valor : valorAnterior.cpf,
                campo === 'senha' ? valor : valorAnterior.senha
            )
        )
    }


    // Salva o usuário: se já existir, atualiza; se não, cria um novo. Depois volta para a lista
    const handlerSalvar = async (formData : FormData) =>{

    if(usuarioExistente){
        // Já existe: atualiza os dados desse usuário
        var dadosRetorno = await  
        axios.put<number>('http://localhost:8080/usuarios'+usuario.id,usuario);

        if(dadosRetorno.status==200){
            alert("Usuário foi salvo com sucesso!");
        }else{
            alert(dadosRetorno.data);

            return;
        }


    }else{
        // Não existe ainda: cria um usuário novo
        var dadosRetorno = await  axios.post<number>('http://localhost:8080/usuarios',usuario)

        if(dadosRetorno.status==200){
            alert("Usuário foi salvo com sucesso!");
        }else{
            alert(dadosRetorno.data);

            return;
        }
    
    }

    // Depois de salvar, volta para a listagem de usuários
    router.push("/usuarios");

    }


    return (
        <form action={handlerSalvar} className="space-y-6">

            {/* Campos do formulário: nome, CPF, e-mail e senha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Nome completo:
                    </label>
                    <input 
                    name="nome" 
                    value={usuario.nome}
                    required
                    onChange={(e)=> handlerChange('nome',e.target.value)}
                    placeholder="João da Silva Sauro"
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        CPF:
                    </label>
                    <input 
                    name="CPF" 
                    value={usuario.cpf}
                    required
                    placeholder="000.000.000-00"
                    onChange={(e)=> handlerChange('cpf',e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        E-mail
                    </label>
                    <input 
                    name="email" 
                    value={usuario.email}
                    required
                    placeholder="EmailDoJoao@SilvaSauro.com.br"
                    onChange={(e)=> handlerChange('email',e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Senha:
                    </label>
                    <input 
                    name="Senha" 
                    value={usuario.senha}
                    required
                    placeholder= "*********************"
                    onChange={(e)=> handlerChange('senha',e.target.value)}
                    type="password" className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
            </div>

            {/* Botões: cancelar volta para a lista sem salvar, salvar envia o formulário */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/[0.08]">
                <Link href="/usuarios" className="px-5 py-2.5 bg-white/[0.03] hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-500/10 text-slate-300 hover:text-white font-medium text-sm rounded-xl transition-all duration-300 text-center border border-white/[0.08] hover:border-blue-400/40 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)]"> Cancelar</Link>
                <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 text-white font-semibold text-sm rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 hover:-translate-y-0.5 active:translate-y-0"> Salvar</button>
            </div>
        </form>
    );
}