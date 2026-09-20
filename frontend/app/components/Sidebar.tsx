import { Sora } from "next/font/google";

// fonte moderna do menu
const sora = Sora({ subsets: ["latin"] });

// links do menu lateral (nome, rota e desenho do ícone)
const links = [
    { nome: "Home", href: "/home", icone: "M3 11.5 12 4l9 7.5M5 10v10h5v-6h4v6h5V10" },
    { nome: "Usuarios", href: "/usuarios", icone: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" },
    { nome: "Cliente", href: "/clientes", icone: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20c0-3 2.9-5 6.5-5s6.5 2 6.5 5M16 4.3a3.5 3.5 0 0 1 0 6.4M18 15.2c2 .7 3.5 2.2 3.5 4.8" },
    { nome: "Projetos", href: "/projetos", icone: "M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" },
    { nome: "Propostas", href: "/propostas", icone: "M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM14 3v5h5M9 13h6M9 17h4" },
];

export default function Sidebar(){
    const baseClasses = `${sora.className} w-64 h-screen flex flex-col p-6 bg-gradient-to-b from-slate-950/90 via-[#030a1c]/80 to-slate-950/90 backdrop-blur-xl`;
    const linkClasses = "group relative flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[15px] font-medium text-slate-300 bg-white/[0.03] border border-white/[0.06] transition-all duration-300 hover:text-white hover:translate-x-1 hover:border-blue-400/40 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-500/10 hover:shadow-[0_8px_30px_-8px_rgba(59,130,246,0.6)]";
    const iconClasses = "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 text-blue-300 transition-all duration-300 group-hover:border-transparent group-hover:from-blue-500 group-hover:to-cyan-400 group-hover:text-white group-hover:shadow-[0_0_18px_rgba(34,211,238,0.55)]";

    return(
        <aside className={baseClasses}>
            {/* logo */}
            <div className="mb-10 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-lg font-bold text-white shadow-[0_0_20px_rgba(56,189,248,0.5)]">F</span>
                <span className="bg-gradient-to-r from-blue-300 via-sky-300 to-cyan-300 bg-clip-text text-xl font-bold tracking-tight text-transparent">FreeLanceHub</span>
            </div>
            {/* menu */}
            <nav className="flex flex-col gap-2.5">
                {links.map(({ nome, href, icone }) => (
                    <a key={href} href={href} className={linkClasses}>
                        {/* barrinha que acende no hover */}
                        <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-blue-400 to-cyan-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                        <span className={iconClasses}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                <path d={icone} />
                            </svg>
                        </span>
                        {nome}
                        {/* setinha que aparece no hover */}
                        <span className="ml-auto -translate-x-2 text-cyan-300 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">→</span>
                    </a>
                ))}
            </nav>
        </aside>
    );
}