import Link from "@/node_modules/next/link";

export default function Home(){
    return(
        <div className="relative min-h-screen bg-black flex flex-col text-slate-100 overflow-hidden p-6 md:p-10">
            {/* Background Glow Effects */}
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full blur-[100px] z-0 pointer-events-none top-[-10%] left-[-10%] animate-pulse"></div>
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-600/20 to-blue-500/20 rounded-full blur-[100px] z-0 pointer-events-none bottom-[-10%] right-[-10%] animate-pulse"></div>

            {/* Main Container */}
            <div className="w-full max-w-6xl mx-auto relative z-10 space-y-8 my-auto">
                
                {/* Header Section with Modern Glassmorphism & Sub-badge */}
                <div className="relative bg-slate-950/60 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-950/30 overflow-hidden text-center space-y-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
                    
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                        Painel de Controle Principal
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                        Bem-vindo ao Sistema
                    </h1>
                    
                    <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Sua plataforma completa de gestão integrada. Navegue pelos módulos abaixo para gerenciar usuários, clientes, propostas e projetos com máxima eficiência e controle.
                    </p>
                </div>

                {/* Quick Links / Dashboard Grid with Enhanced Interactive States */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    
                    <Link href="/usuarios" className="group relative bg-slate-950/70 hover:bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/10">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none group-hover:bg-blue-500/10 transition-colors"></div>
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform font-bold text-sm">
                            US
                        </div>
                        <h2 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors flex items-center justify-between">
                            Usuários
                            <span className="text-xs text-slate-500 group-hover:text-blue-400 transition-colors">&rarr;</span>
                        </h2>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">Gerenciar acessos, permissões e cadastros</p>
                    </Link>

                    <Link href="/clientes" className="group relative bg-slate-950/70 hover:bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/10">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors"></div>
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform font-bold text-sm">
                            CL
                        </div>
                        <h2 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                            Clientes
                            <span className="text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">&rarr;</span>
                        </h2>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">Carteira completa e informações de contato</p>
                    </Link>

                    <Link href="/propostas" className="group relative bg-slate-950/70 hover:bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/10">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none group-hover:bg-blue-500/10 transition-colors"></div>
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform font-bold text-sm">
                            PR
                        </div>
                        <h2 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors flex items-center justify-between">
                            Propostas
                            <span className="text-xs text-slate-500 group-hover:text-blue-400 transition-colors">&rarr;</span>
                        </h2>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">Orçamentos, status e negociações ativas</p>
                    </Link>

                    <Link href="/projetos" className="group relative bg-slate-950/70 hover:bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 hover:border-teal-500/50 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-teal-500/10">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-bl-full pointer-events-none group-hover:bg-teal-500/10 transition-colors"></div>
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 transition-transform font-bold text-sm">
                            PJ
                        </div>
                        <h2 className="text-lg font-bold text-slate-100 group-hover:text-teal-400 transition-colors flex items-center justify-between">
                            Projetos
                            <span className="text-xs text-slate-500 group-hover:text-teal-400 transition-colors">&rarr;</span>
                        </h2>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">Acompanhamento de prazos e entregas</p>
                    </Link>

                </div>
            </div>
        </div>
    );
}