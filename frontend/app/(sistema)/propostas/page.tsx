import Link from "@/node_modules/next/link";
 
export default function Propostas(){
    return(
        <div className="relative min-h-screen bg-black flex flex-col text-slate-100 overflow-hidden p-6 md:p-10">
            {/* Background Glow Effects */}
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-[80px] z-0 pointer-events-none top-[-10%] left-[-10%]"></div>
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-[80px] z-0 pointer-events-none bottom-[20%] right-[-10%]"></div>

            {/* Main Container */}
            <div className="w-full max-w-6xl mx-auto relative z-10 space-y-6">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-2xl shadow-blue-950/20">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Gestão de Propostas
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">Acompanhe e gerencie as propostas comerciais ativas</p>
                    </div>
                    
                    <Link 
                        href="/propostas/novo"
                        className="inline-flex items-center justify-center py-3 px-5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/25 transition-all duration-200 transform active:scale-[0.99] cursor-pointer text-sm tracking-wide w-full sm:w-auto text-center"
                    >
                        + Nova Proposta
                    </Link>
                </div>

                {/* Quick Stats Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-xl p-4 shadow-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total de Propostas</span>
                        <p className="text-2xl font-bold text-slate-100 mt-1">01</p>
                    </div>
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-xl p-4 shadow-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Em Negociação</span>
                        <p className="text-2xl font-bold text-blue-400 mt-1">01</p>
                    </div>
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-xl p-4 shadow-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Aprovadas</span>
                        <p className="text-2xl font-bold text-emerald-400 mt-1">00</p>
                    </div>
                </div>
                
                {/* Content / Table Section */}
                <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl shadow-blue-950/20 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-900/40 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                    <th className="py-4 px-6">Nome</th>
                                    <th className="py-4 px-6">Empresa / Cliente</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-sm">
                                <tr className="hover:bg-slate-900/30 transition-colors">
                                    <td className="py-4 px-6 text-slate-200 font-medium flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs">
                                            A
                                        </div>
                                        Artur
                                    </td>
                                    <td className="py-4 px-6 text-slate-400">Cliente Exemplo S.A.</td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                            Em Análise
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <Link href="/propostas/editar" className="text-blue-400 hover:text-blue-300 font-medium text-xs transition-colors">
                                            Editar
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}