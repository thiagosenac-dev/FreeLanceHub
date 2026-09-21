import Link from "@/node_modules/next/link";
import ClienteForm from "../componentes/ClienteForm";

export default function CadastroCliente(){

    return(
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#010409] via-[#040a1c] to-[#020617] p-4 sm:p-8 ring-1 ring-blue-500/10">
            {/* Fundo decorativo */}
           <div className="relative space-y-6">
                {/* Cabeçalho */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-blue-400/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-[0_10px_50px_-15px_rgba(37,99,235,0.45)]">
                    <div className="space-y-1.5">
                        <h1 className="flex items-center gap-3 text-2xl sm:text-3xl font-semibold tracking-tight">
                            <span className="relative flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60"></span>
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_14px_2px_rgba(59,130,246,0.8)]"></span>
                            </span>
                            <span className="bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">Novo Cliente</span>
                        </h1>
                        <p className="text-sm text-slate-400">Preencha os dados para registrar um novo Cliente</p>
                    </div>
                    <Link href="/clientes" className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-blue-400/20 bg-gradient-to-r from-blue-600/20 to-blue-500/10 px-5 py-2.5 text-sm font-medium text-blue-100 shadow-sm transition-all duration-300 hover:border-blue-400/60 hover:from-blue-600 hover:to-blue-500 hover:text-white hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70">
                        <span className="transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
                        Voltar para Listagem
                    </Link>
                </div>
                {/* Card do formulário */}
                <div className="relative overflow-hidden rounded-2xl border border-blue-400/10 bg-[#050b1a]/80 p-6 md:p-8 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent"></div>
                    <ClienteForm/>
                </div>
            </div>
        </div>
    )

}