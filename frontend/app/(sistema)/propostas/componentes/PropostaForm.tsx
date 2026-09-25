'use client'

import { Proposta } from "@/app/types/proposta";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Dados que esse formulário pode receber: uma proposta já existente (modo edição) ou nada (modo cadastro)
interface PropostaFormProps {
    propostaExistente?: Proposta;
}

// Formulário de proposta. Serve tanto para cadastrar uma nova quanto para editar uma já existente
export default function PropostaForm({ propostaExistente }: PropostaFormProps) {
    const router = useRouter();

    // Se recebeu uma proposta existente, começa com os dados dela. Se não, começa em branco (cadastro novo)
    const [proposta, setProposta] = useState<Proposta>(
        propostaExistente ||
        new Proposta(null, "", 0, "", "PENDENTE")
    );
    

    // Atualiza um campo específico da proposta conforme a pessoa digita
    const handlerChange = (campo: 'descricao' | 'valor' | 'prazo' | 'status', valor: string) => {
        setProposta(valorAnterior =>
            new Proposta(
                valorAnterior.id,
                campo === 'descricao' ? valor : valorAnterior.descricao,
                campo === 'valor' ? Number(valor) : valorAnterior.valor,
                campo === 'prazo' ? valor : valorAnterior.prazo,
                campo === 'status' ? valor : valorAnterior.status
            )
        )
    }

    // Salva a proposta: se já existir, atualiza; se não, cria uma nova. Depois volta para a lista
    const handlerSalvar = async (formData: FormData) => {

        if (propostaExistente) {
            // Já existe: atualiza os dados dessa proposta
            var dadosRetorno = await axios.put<number>('http://localhost:8080/propostas/' + proposta.id, proposta);

            if (dadosRetorno.status == 200) {
                alert("Proposta foi salva com sucesso!");
            } else {
                alert(dadosRetorno.data);
                return;
            }

        } else {
            // Não existe ainda: cria uma proposta nova
            var dadosRetorno = await axios.post<number>('http://localhost:8080/propostas', proposta);

            if (dadosRetorno.status == 200) {
                alert("Proposta foi salva com sucesso!");
            } else {
                alert(dadosRetorno.data);
                return;
            }
        }

        // Depois de salvar, volta para a listagem de propostas
        router.push("/propostas");

    }

    return (
        <form action={handlerSalvar} className="space-y-6">

            {/* Campos do formulário: descrição, valor, prazo e status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Descrição:
                    </label>
                    <textarea
                        name="descricao"
                        value={proposta.descricao}
                        required
                        rows={3}
                        onChange={(e) => handlerChange('descricao', e.target.value)}
                        placeholder="Descreva o que está sendo proposto"
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </textarea>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Valor:
                    </label>
                    <input
                        name="valor"
                        type="number"
                        step="0.01"
                        value={proposta.valor}
                        required
                        placeholder="0,00"
                        onChange={(e) => handlerChange('valor', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Prazo:
                    </label>
                    <input
                        name="prazo"
                        type="date"
                        value={proposta.prazo}
                        required
                        onChange={(e) => handlerChange('prazo', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Status:
                    </label>
                    <select
                        name="status"
                        value={proposta.status}
                        onChange={(e) => handlerChange('status', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                        <option value="PENDENTE">Pendente</option>
                        <option value="APROVADA">Aprovada</option>
                        <option value="REJEITADA">Rejeitada</option>
                    </select>
                </div>
            </div>

            {/* Botões: cancelar volta para a lista sem salvar, salvar envia o formulário */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/[0.08]">
                <Link href="/propostas" className="px-5 py-2.5 bg-white/[0.03] hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-500/10 text-slate-300 hover:text-white font-medium text-sm rounded-xl transition-all duration-300 text-center border border-white/[0.08] hover:border-blue-400/40 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)]"> Cancelar</Link>
                <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 text-white font-semibold text-sm rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 hover:-translate-y-0.5 active:translate-y-0"> Salvar</button>
            </div>
        </form>
    );
}
