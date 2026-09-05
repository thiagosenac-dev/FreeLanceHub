export default function Home(){
    return(
        <>
        <div className="relative min-h-screen bg-black text-slate-100 flex items-center justify-center overflow-hidden">
            <div className="glow-blob blob-1"></div>
            <div className="glow-blob blob-2"></div>
            <h1 className="relative z-10 text-4xl font-extrabold text-gradient">Bem vindo ao sistema kkkkkjk</h1>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
            .glow-blob { position: absolute; width: 400px; height: 400px; background: linear-gradient(to right, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.15)); border-radius: 50%; filter: blur(80px); pointer-events: none; animation: float 10s infinite ease-in-out alternate; }
            .blob-1 { top: -10%; left: -10%; }
            .blob-2 { bottom: 20%; right: -10%; animation-delay: -5s; }
            @keyframes float { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(30px, 50px) scale(1.1); } }
            .text-gradient { background: linear-gradient(135deg, #60a5fa, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        `}} />
        </>
    )
}