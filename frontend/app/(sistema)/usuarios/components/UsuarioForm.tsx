import Link from "@/node_modules/next/link";

export default function UsuarioForm() {
    const formClasses = "max-w-2xl mx-auto bg-[#030712] p-8 rounded-2xl shadow-xl space-y-6";
    const gridClasses = "grid grid-cols-1 md:grid-cols-2 gap-6";
    const fieldClasses = "space-y-2";
    const labelClasses = "block text-xs font-semibold text-gray-400 tracking-wider uppercase";
    const inputClasses = "w-full px-4 py-3 rounded-xl text-base text-gray-200 bg-white/[0.02] border border-white/5 focus:border-[#3b82f6]/50 focus:bg-[#3b82f6]/[0.02] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 transition-all duration-300 shadow-sm";
    const actionsClasses = "flex items-center justify-end space-x-4 pt-4 border-t border-white/5";
    const cancelClasses = "px-6 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.02] border border-transparent transition-all duration-200";
    const submitClasses = "px-6 py-3 rounded-xl text-sm font-medium text-white bg-[#3b82f6] hover:bg-[#2563eb] border border-[#3b82f6]/30 shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300";

    return (
        <div className={formClasses}>
            <form className="space-y-6">
                <div className={gridClasses}>
                    <div className={fieldClasses}>
                        <label className={labelClasses}>
                            Nome completo:
                        </label>
                        <input name="nome" className={inputClasses} />
                    </div>
                    <div className={fieldClasses}>
                        <label className={labelClasses}>
                            CPF:
                        </label>
                        <input name="CPF" className={inputClasses} />
                    </div>
                    <div className={fieldClasses}>
                        <label className={labelClasses}>
                            E-mail
                        </label>
                        <input name="email" type="email" className={inputClasses} />
                    </div>
                    <div className={fieldClasses}>
                        <label className={labelClasses}>
                            Senha:
                        </label>
                        <input name="Senha" type="password" className={inputClasses} />
                    </div>
                </div>

                <div className={actionsClasses}>
                    <Link href="/usuarios" className={cancelClasses}>Cancelar</Link>
                    <button type="submit" className={submitClasses}>Salvar</button>
                </div>
            </form>
        </div>
    );
}