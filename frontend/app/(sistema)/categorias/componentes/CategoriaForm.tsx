'use client'

import { Categoria } from "@/app/types/categoria";
import axios from "@/node_modules/axios/index";
import Link from "@/node_modules/next/link";
import { useRouter } from "@/node_modules/next/navigation";
import { useState } from "react";

// Recebe uma categoria existente (modo edição) ou nada (modo cadastro)
interface CategoriaFormProps {
    categoriaExistente?: Categoria;
}

// Formulário de categoria. Serve tanto para cadastrar quanto para editar
export default function CategoriaForm({ categoriaExistente }: CategoriaFormProps) {
    const router = useRouter();

    // Começa com os dados da categoria existente ou em branco
    const [categoria, setCategoria] = useState<Categoria>(
        categoriaExistente ||
        new Categoria(null, "", "", "ATIVO")
    );

    // Atualiza um campo da categoria conforme a pessoa digita
    const handlerChange = (campo: 'nome' | 'descricao', valor: string) => {
        setCategoria(valorAnterior =>
            new Categoria(
                valorAnterior.id,
                campo === 'nome' ? valor : valorAnterior.nome,
                campo === 'descricao' ? valor : valorAnterior.descricao,
                valorAnterior.status
            )
        )
    }

    // Salva: se já existir atualiza, se não cria. Depois volta para a lista
    const handlerSalvar = async () => {

        const dadosRetorno = categoriaExistente
            ? await axios.put('http://localhost:8080/categorias/' + categoria.id, categoria)
            : await axios.post('http://localhost:8080/categorias', categoria);

        if (dadosRetorno.status == 200) {
            alert("Categoria foi salva com sucesso!");
        } else {
            alert(dadosRetorno.data);
            return;
        }

        router.push("/categorias");
    }

    const inputClasses = "w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]";

    return (
        <form action={handlerSalvar} className="space-y-6">

            {/* Campos do formulário: nome e descrição */}
            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Nome da categoria:
                    </label>
                    <input
                        name="nome"
                        value={categoria.nome}
                        required
                        onChange={(e) => handlerChange('nome', e.target.value)}
                        placeholder="Desenvolvimento Web"
                        className={inputClasses}
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Descrição:
                    </label>
                    <textarea
                        name="descricao"
                        value={categoria.descricao}
                        required
                        rows={4}
                        onChange={(e) => handlerChange('descricao', e.target.value)}
                        placeholder="Descreva o tipo de projeto dessa categoria"
                        className={inputClasses}
                    />
                </div>
            </div>

            {/* Botões: cancelar volta para a lista, salvar envia o formulário */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/[0.08]">
                <Link href="/categorias" className="px-5 py-2.5 bg-white/[0.03] hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-500/10 text-slate-300 hover:text-white font-medium text-sm rounded-xl transition-all duration-300 text-center border border-white/[0.08] hover:border-blue-400/40 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)]"> Cancelar</Link>
                <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 text-white font-semibold text-sm rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 hover:-translate-y-0.5 active:translate-y-0"> Salvar</button>
            </div>
        </form>
    );
}
