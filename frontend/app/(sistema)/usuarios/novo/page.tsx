import Link from "@/node_modules/next/link";
import UsuarioForm from "../components/UsuarioForm";

// Página de cadastro: só mostra o cabeçalho e o formulário de usuário vazio
export default function CadastroUsuario(){
    return(
        <div className="space-y-6">

            {/* Cabeçalho com título e botão de voltar para a lista */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-950/80 backdrop-blur-xl border border-white/[0.08] p-6 rounded-2xl shadow-[0_8px_30px_-8px_rgba(3,10,28,0.8)]">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full inline-block shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
                        <span className="bg-gradient-to-r from-blue-300 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
                            Novo Usuário
                        </span>
                    </h1>
                    <p className="text-sm text-slate-400">Preencha os dados para registrar um novo Usuário</p>
                </div>
                <Link href="/usuarios" className="inline-flex items-center justify-center text-sm font-medium text-slate-300 hover:text-white bg-white/[0.03] hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-500/10 border border-white/[0.08] hover:border-blue-400/40 px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)] hover:-translate-x-0.5 w-full sm:w-auto">
                    &larr; Voltar para Listagem
                </Link>
            </div>
            {/* Card com o formulário. Sem passar dados, o formulário abre em branco (modo cadastro) */}
            <div className="bg-slate-950/70 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_-8px_rgba(3,10,28,0.8)]">
                <UsuarioForm/>
            </div>
        </div>
    )

}