"use client"

import { FormEvent, useEffect, useState } from "react";
import Link from "@/node_modules/next/link";
import axios from "@/node_modules/axios/index";
import { useRouter } from "@/node_modules/next/navigation";

const API = "http://localhost:8080/projetos";

// campos do formulário (name = nome do input, campo = chave que o back usa)
const campos = [
    { label: "Projeto:", name: "nome", campo: "nome" },
    { label: "Descrição:", name: "descricao", campo: "descricao" },
    { label: "Valor:", name: "valor", campo: "valor", type: "number" },
    { label: "Prazo:", name: "prazo", campo: "prazo", type: "date" },
];

// opções do status (só aparece na edição)
const statusOpcoes = [
    { valor: "EM_ANDAMENTO", texto: "Em Andamento" },
    { valor: "CONCLUIDO", texto: "Concluído" },
    { valor: "CANCELADO", texto: "Cancelado" },
];

// com "codigo" edita o projeto, sem "codigo" cadastra um novo
export default function ProjetoForm({ codigo }: { codigo?: number }) {
    const router = useRouter();
    const [dados, setDados] = useState<Record<string, string>>({
        nome: "",
        descricao: "",
        valor: "",
        prazo: "",
        status: "EM_ANDAMENTO"
    });

    const formClasses = "relative max-w-2xl mx-auto rounded-2xl border border-blue-400/15 bg-gradient-to-b from-slate-900/70 to-slate-950/90 p-8 shadow-[inset_0_1px_0_0_rgba(96,165,250,0.18)]";
    const labelClasses = "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-200/70";
    const inputClasses = "w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-base text-slate-100 transition-all duration-300 hover:border-blue-400/30 focus:border-cyan-400/60 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 focus:shadow-[0_0_22px_-6px_rgba(34,211,238,0.6)] [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#020617] [&:-webkit-autofill]:[-webkit-text-fill-color:#f1f5f9]";
    const cancelClasses = "rounded-xl border border-transparent px-6 py-3 text-sm font-medium text-slate-400 transition-all duration-200 hover:border-blue-400/20 hover:bg-white/[0.04] hover:text-white";
    const submitClasses = "rounded-xl border border-blue-300/20 bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_25px_-8px_rgba(34,211,238,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-400 hover:shadow-[0_12px_32px_-6px_rgba(34,211,238,0.75)] active:translate-y-0";

    // na edição, busca o projeto e preenche os campos
    useEffect(() => {
        if (!codigo) return;

        axios.get(`${API}/${codigo}`)
            .then(({ data }) =>
                setDados({
                    nome: data.nome ?? "",
                    descricao: data.descricao ?? "",
                    valor: data.valor ?? "",
                    prazo: data.prazo ?? "",
                    status: String(data.status ?? "EM_ANDAMENTO").toUpperCase()
                })
            )
            .catch(() => alert("Erro ao carregar projeto"));
    }, [codigo]);

    // salva (PUT na edição, POST no cadastro) e volta pra listagem
    const salvar = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (codigo) {
                await axios.put(`${API}/${codigo}`, {
                    id: codigo,
                    ...dados
                });
            } else {
                await axios.post(API, dados);
            }

            router.push("/projetos");
        } catch {
            alert("Erro ao salvar projetos");
        }
    };

    return (
        <div className={formClasses}>
            <form onSubmit={salvar} className="space-y-6">

                {/* campos em duas colunas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {campos.map(({ label, name, campo, type }) => (
                        <div key={name} className="space-y-2">
                            <label className={labelClasses}>
                                <span className="h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
                                {label}
                            </label>

                            <input
                                name={name}
                                type={type}
                                value={dados[campo]}
                                onChange={e =>
                                    setDados({
                                        ...dados,
                                        [campo]: e.target.value
                                    })
                                }
                                className={inputClasses}
                            />
                        </div>
                    ))}

                    {/* status (só na edição) */}
                    {!!codigo && (
                        <div className="space-y-2 md:col-span-2">
                            <label className={labelClasses}>
                                <span className="h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
                                Status:
                            </label>

                            <select
                                name="status"
                                value={dados.status}
                                onChange={e =>
                                    setDados({
                                        ...dados,
                                        status: e.target.value
                                    })
                                }
                                className={`${inputClasses} cursor-pointer [&>option]:bg-slate-950`}
                            >
                                {statusOpcoes.map(({ valor, texto }) => (
                                    <option key={valor} value={valor}>
                                        {texto}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* botões */}
                <div className="flex items-center justify-end space-x-4 border-t border-blue-400/10 pt-6">
                    <Link href="/projetos" className={cancelClasses}>
                        Cancelar
                    </Link>

                    <button type="submit" className={submitClasses}>
                        Salvar
                    </button>
                </div>

            </form>
        </div>
    );
}