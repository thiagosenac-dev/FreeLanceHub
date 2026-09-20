import { Sora } from "next/font/google";

// mesma fonte do menu lateral
const sora = Sora({ subsets: ["latin"] });

export default function Header(){
    const headerClasses = `${sora.className} w-full bg-gradient-to-r from-slate-950/80 via-[#030a1c]/70 to-slate-950/80 backdrop-blur-xl`;
    const avatarClasses = "flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 text-cyan-300 shadow-[0_0_18px_-4px_rgba(34,211,238,0.5)]";
    const buttonClasses = "group inline-flex items-center gap-2 rounded-xl border border-blue-400/20 bg-gradient-to-r from-blue-600/20 to-cyan-500/10 px-4 py-2 text-sm font-medium text-blue-100 transition-all duration-300 hover:border-cyan-400/60 hover:from-blue-600 hover:to-cyan-500 hover:text-white hover:shadow-[0_0_25px_-5px_rgba(34,211,238,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70";

    return (
        <header className={headerClasses}>
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* usuário logado */}
                <div className="flex items-center gap-3">
                    <div className={avatarClasses}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                    </div>
                    <span className="text-sm font-semibold text-slate-200 sm:text-base">Usuário Thiago</span>
                </div>
                {/* sai e volta pra landing page */}
                <a href="/" className={buttonClasses}>
                    Sair
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
            </div>
        </header>
    );
}