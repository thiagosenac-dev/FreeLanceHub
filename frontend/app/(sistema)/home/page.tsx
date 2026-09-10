import Link from "@/node_modules/next/link";

export default function Home(){
    return(
        <div className="relative min-h-screen bg-black flex flex-col text-slate-100 overflow-hidden p-6 md:p-10">
            {/* Background Glow Effects */}
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-[80px] z-0 pointer-events-none top-[-10%] left-[-10%]"></div>
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-[80px] z-0 pointer-events-none bottom-[20%] right-[-10%]"></div>

            {/* Main Container */}
            <div className="w-full max-w-5xl mx-auto relative z-10 space-y-8 my-auto">
                
                {/* Header Section */}
                <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-8 shadow-2xl shadow-blue-950/20 text-center space-y-3">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Bem-vindo ao Sistema
                    </h1>
                    <p className="text-slate-400 text-base max-w-xl mx-auto">
                        Sua plataforma completa de gestão integrada. Navegue pelos módulos abaixo para gerenciar usuários, clientes, propostas e projetos com facilidade.
                    </p>
                </div>

                {/* Quick Links / Dashboard Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link href="/usuarios" className="bg-slate-950/80 hover:bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl transition-all group">
                        <h2 className="text-lg font-bold text-slate-200 group-hover:text-blue-400 transition-colors">Usuários</h2>
                        <p className="text-xs text-slate-400 mt-1">Gerenciar acessos e cadastros</p>
                    </Link>

                    <Link href="/clientes" className="bg-slate-950/80 hover:bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl transition-all group">
                        <h2 className="text-lg font-bold text-slate-200 group-hover:text-blue-400 transition-colors">Clientes</h2>
                        <p className="text-xs text-slate-400 mt-1">Carteira e informações</p>
                    </Link>

                    <Link href="/propostas" className="bg-slate-950/80 hover:bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl transition-all group">
                        <h2 className="text-lg font-bold text-slate-200 group-hover:text-blue-400 transition-colors">Propostas</h2>
                        <p className="text-xs text-slate-400 mt-1">Orçamentos e negociações</p>
                    </Link>

                    <Link href="/projetos" className="bg-slate-950/80 hover:bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl transition-all group">
                        <h2 className="text-lg font-bold text-slate-200 group-hover:text-blue-400 transition-colors">Projetos</h2>
                        <p className="text-xs text-slate-400 mt-1">Acompanhamento e entregas</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}