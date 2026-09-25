"use client"

import { Cliente } from "@/app/types/cliente";
import axios from "@/node_modules/axios/index";
import Link from "@/node_modules/next/link";
import { useParams, useRouter } from "@/node_modules/next/navigation";
import { useEffect, useState } from "react";
import ClienteForm from "../../componentes/ClienteForm";

export default function EditarCliente(){

    // Pega o código do cliente que veio na URL (ex: /clientes/5)
    const parametro = useParams();

    const codigo = Number(parametro.codigo);

    // Guarda os dados do cliente carregado. Começa vazio (null) até a busca terminar
    const [cliente, setCliente] = useState<Cliente|null>(null)
    const router = useRouter();

    // Assim que a página abre, busca os dados desse cliente
    useEffect(()=>{

        buscarDados();

    },[]);

    // Busca o cliente pelo código na API. Se não achar, volta para a listagem
    const buscarDados = async () => {

        const valorClienteBack = await axios.get<Cliente>('http://localhost:8080/clientes/' + codigo);

        if(valorClienteBack.status==200){
            setCliente(valorClienteBack.data);
        }else{
            router.push("/clientes")
        }

    }

    // Enquanto os dados não chegam, mostra uma mensagem de "carregando"
    if(!cliente) return(
        <div className="flex items-center justify-center p-8">
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl text-slate-300 text-sm font-medium animate-pulse shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                Carregando Dados ...
            </div>
        </div>
    )

    return(
        <div className="space-y-6">

            {/* Cabeçalho com título (mostrando o código do cliente) e botão de voltar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-950/80 backdrop-blur-xl border border-white/[0.08] p-6 rounded-2xl shadow-[0_8px_30px_-8px_rgba(3,10,28,0.8)]">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full inline-block shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
                        <span className="bg-gradient-to-r from-blue-300 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
                            Editar Cliente {codigo}
                        </span>
                    </h1>
                    <p className="text-sm text-slate-400">Preencha os dados para editar o Cliente</p>
                </div>
                <Link href="/clientes" className="inline-flex items-center justify-center text-sm font-medium text-slate-300 hover:text-white bg-white/[0.03] hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-500/10 border border-white/[0.08] hover:border-blue-400/40 px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)] hover:-translate-x-0.5 w-full sm:w-auto">
                    &larr; Voltar para Listagem
                </Link>
            </div>

            {/* Card com o formulário já preenchido com os dados do cliente buscado acima */}
            <div className="bg-slate-950/70 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_-8px_rgba(3,10,28,0.8)]">
                <ClienteForm clienteExistente={cliente}/>
            </div>
        </div>
    )

}
