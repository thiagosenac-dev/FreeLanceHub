export default function Sidebar(){
    const baseClasses = "w-64 bg-[#030712] flex flex-col h-screen p-6";
    const logoClasses = "text-xl font-bold text-white tracking-wider mb-8";
    const navClasses = "flex flex-col gap-2";
    const linkClasses = "group relative px-5 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white bg-white/[0.02] hover:bg-[#3b82f6]/10 border border-white/5 hover:border-[#3b82f6]/30 transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] flex items-center justify-between";
    const indicatorClasses = "w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#06b6d4] transition-all";

    return(
        <aside className={baseClasses}>
            <div className={logoClasses}>
                FreeLanceHub
            </div>
            
            <nav className={navClasses}>
                <a href="/home" className={linkClasses}>
                    <span>Home</span>
                    <span className={indicatorClasses}></span>
                </a>
                <a href="/usuarios" className={linkClasses}>
                    <span>Usuarios</span>
                    <span className={indicatorClasses}></span>
                </a>
                <a href="/clientes" className={linkClasses}>
                    <span>Cliente</span>
                    <span className={indicatorClasses}></span>
                </a>
                <a href="/projetos" className={linkClasses}>
                    <span>Projetos</span>
                    <span className={indicatorClasses}></span>
                </a>
                <a href="/propostas" className={linkClasses}>
                    <span>Propostas</span>
                    <span className={indicatorClasses}></span>
                </a>
            </nav>
        </aside>
    );
}