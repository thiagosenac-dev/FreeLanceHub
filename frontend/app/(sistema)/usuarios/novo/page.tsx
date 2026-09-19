import Link from "@/node_modules/next/link";

import UsuarioForm from "../components/UsuarioForm";

export default function CadastroUsuario(){

    return(

        <div className="space-y-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#080b12] border border-blue-500/20 p-6 rounded-2xl shadow-lg shadow-blue-950/20">

                <div className="space-y-1">

                    <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">

                        <span className="w-2.5 h-2.5 bg-blue-500 rounded-full inline-block shadow-lg shadow-blue-500/50"></span>

                        <span>Novo Usuário</span>

                    </h1>

                    <p className="text-sm text-slate-400">Preencha os dados para registrar um novo Usuário</p>

                </div>

                <Link href="/usuarios" className="inline-flex items-center justify-center text-sm font-medium text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-400/40 px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm w-full sm:w-auto">

                    &larr; Voltar para Listagem

                </Link>

            </div>

            <div className="bg-[#080b12] border border-blue-500/20 rounded-2xl p-6 md:p-8 shadow-xl shadow-black/30">

                <UsuarioForm/>

            </div>

        </div>

    )

}
