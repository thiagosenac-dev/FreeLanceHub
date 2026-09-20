import { Sora } from "next/font/google";

// mesma fonte do menu lateral
const sora = Sora({ subsets: ["latin"] });

// links do rodapé (os mesmos da landing page)
const links = ["Privacidade", "Termos"];

export default function Footer(){
    const anoAtual = new Date().getFullYear();
    const footerClasses = `${sora.className} relative flex items-center justify-center px-6 py-6 md:h-24 md:py-0 bg-gradient-to-r from-slate-950/80 via-[#030a1c]/70 to-slate-950/80 backdrop-blur-xl`;

    return(
        <footer className={footerClasses}>
            {/* linha de luz que some nas pontas */}
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
            <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
                {/* logo */}
                <span className="text-xl font-bold text-white">
                    FreeLance<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Hub</span>
                </span>
                {/* copyright */}
                <p className="text-sm text-slate-400">&copy; {anoAtual} FreeLanceHub. Orgulhosamente de Criciúma/SC.</p>
                {/* links */}
                <div className="flex gap-6 text-sm text-slate-400">
                    {links.map(link => <a key={link} href="#" className="transition-colors hover:text-cyan-400">{link}</a>)}
                </div>
            </div>
        </footer>
    );
}