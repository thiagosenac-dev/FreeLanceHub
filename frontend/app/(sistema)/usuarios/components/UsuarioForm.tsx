'use client'

import { Usuario, UsuarioFormProps } from "@/app/types/usuario";
import { atualizarUsuario, salvarUsuario } from "@/app/services/usuarioService";
import { buscarEnderecoPorCep } from "@/app/services/enderecoService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";



// Formulário de usuário. Serve tanto para cadastrar um novo quanto para editar um já existente
export default function UsuarioForm({usuarioExistente}:UsuarioFormProps) {
    const router = useRouter();

    // cadastro excluído só pode ser visualizado
    const somenteLeitura = !!usuarioExistente && String(usuarioExistente.status).toUpperCase() === "EXCLUIDO";

    // Se recebeu um usuário existente, começa com os dados dele. Se não, começa em branco (cadastro novo)
    const [ usuario,setUsuario ] = useState<Usuario>(
        usuarioExistente ||
        new Usuario(null,"","","","ATIVO","",null)
    );

    // Atualiza um campo específico do usuário conforme a pessoa digita
    const handlerChange = ( campo: 'nome'|  'email' |'cpf'| 'senha' | 'cep', valor:string) =>{
        // ao trocar o CEP, limpa o endereço antigo (só volta a preencher quando o ViaCEP responder)
        setUsuario(valorAnterior => ({
            ...valorAnterior,
            [campo]: valor,
            ...(campo === 'cep' ? { logradouro: "", bairro: "", cidade: "", uf: "" } : {})
        }))
    }

    // MUDANÇA: o admin edita o endereço do freelancer (cliente e admin não têm endereço aqui)
    const temEndereco = !!usuarioExistente && usuarioExistente.role === "ROLE_USUARIO";

    // true enquanto o ViaCEP responde (nesse tempo não deixa salvar)
    const [buscandoCep, setBuscandoCep] = useState(false);

    // Quando a pessoa sai do campo CEP, busca o endereço no ViaCEP e preenche os outros campos
    const handlerBuscarCep = async () => {
        if ((usuario.cep ?? "").replace(/\D/g, "").length !== 8) {
            return;
        }

        setBuscandoCep(true);
        try {
            const endereco = await buscarEnderecoPorCep(usuario.cep ?? "");
            setUsuario(valorAnterior => ({
                ...valorAnterior,
                logradouro: endereco.logradouro,
                bairro: endereco.bairro,
                cidade: endereco.cidade,
                uf: endereco.uf
            }))
        } catch (erro) {
            alert((erro as { response?: { data?: string } }).response?.data || "Erro ao buscar CEP!");
        } finally {
            setBuscandoCep(false);
        }
    }


    // Salva o usuário: se já existir, atualiza; se não, cria um novo. Depois volta para a lista
    const handlerSalvar = async (formData : FormData) =>{

    // freelancer: o endereço precisa ter vindo do CEP (cidade e UF preenchidas) antes de salvar
    if (temEndereco && (buscandoCep || !usuario.cidade || !usuario.uf)) {
        alert("Informe um CEP válido e aguarde o endereço ser preenchido!");
        return;
    }

    try {
        if(usuarioExistente){
            // Já existe: atualiza os dados desse usuário
            var dadosRetorno = await atualizarUsuario(usuario);

            if(dadosRetorno){
                alert("Usuário foi salvo com sucesso!");
            }else{
                alert("Erro ao atualizar Usuário!");

                return;
            }


        }else{
            // Não existe ainda: cria um usuário novo
            var dadosRetorno = await salvarUsuario(usuario);

            if(dadosRetorno){
                alert("Usuário foi salvo com sucesso!");
            }else{
                alert("Erro ao salvar Usuário!");

                return;
            }

        }
    } catch (erro) {
        // mostra a mensagem que o back devolveu (ex: CPF inválido)
        alert((erro as { response?: { data?: string } }).response?.data || "Erro ao salvar Usuário!");

        return;
    }

    // Depois de salvar, volta para a listagem de usuários
    router.push("/usuarios");

    }


    return (
        <form action={handlerSalvar} className="space-y-6">

            <fieldset disabled={somenteLeitura} className="min-w-0 border-0 p-0 m-0">
            {/* Campos do formulário: nome, CPF, e-mail e senha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Nome completo:
                    </label>
                    <input 
                    name="nome" 
                    value={usuario.nome}
                    required
                    autoComplete="off"
                    onChange={(e)=> handlerChange('nome',e.target.value)}
                    placeholder="João da Silva Sauro"
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        CPF:
                    </label>
                    <input
                    name="CPF"
                    value={usuario.cpf ?? ""}
                    required={!usuarioExistente || !!usuarioExistente.cpf}
                    autoComplete="off"
                    placeholder="000.000.000-00"
                    onChange={(e)=> handlerChange('cpf',e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        E-mail
                    </label>
                    <input 
                    name="email" 
                    value={usuario.email}
                    required
                    autoComplete="off"
                    placeholder="EmailDoJoao@SilvaSauro.com.br"
                    onChange={(e)=> handlerChange('email',e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Senha:
                    </label>
                    <input 
                    name="Senha" 
                    value={usuario.senha ?? ""}
                    required
                    autoComplete="new-password"
                    placeholder= "*********************"
                    onChange={(e)=> handlerChange('senha',e.target.value)}
                    type="password" className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    </input>
                </div>
                {temEndereco && (
                    <>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">
                                CEP:
                            </label>
                            <input
                                name="cep"
                                value={usuario.cep ?? ""}
                                required
                                autoComplete="off"
                                placeholder="00000-000"
                                onChange={(e) => handlerChange('cep', e.target.value)}
                                onBlur={handlerBuscarCep}
                                className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                            </input>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">
                                Logradouro:
                            </label>
                            <input
                                name="logradouro"
                                value={usuario.logradouro ?? ""}
                                readOnly
                                placeholder="Preenchido pelo CEP"
                                className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                            </input>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">
                                Bairro:
                            </label>
                            <input
                                name="bairro"
                                value={usuario.bairro ?? ""}
                                readOnly
                                placeholder="Preenchido pelo CEP"
                                className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                            </input>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">
                                Cidade:
                            </label>
                            <input
                                name="cidade"
                                value={usuario.cidade ?? ""}
                                readOnly
                                placeholder="Preenchido pelo CEP"
                                className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                            </input>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">
                                UF:
                            </label>
                            <input
                                name="uf"
                                value={usuario.uf ?? ""}
                                readOnly
                                placeholder="Preenchido pelo CEP"
                                className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/[0.05] transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                            </input>
                        </div>
                    </>
                )}
            </div>

            </fieldset>

            {/* aviso: cadastro excluído não pode ser alterado */}
            {somenteLeitura && (
                <p className="text-sm text-amber-400">Este cadastro de usuário foi excluído e não pode mais ser alterado.</p>
            )}

            {/* Botões: cancelar volta para a lista sem salvar, salvar envia o formulário */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/[0.08]">
                <Link href="/usuarios" className="px-5 py-2.5 bg-white/[0.03] hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-500/10 text-slate-300 hover:text-white font-medium text-sm rounded-xl transition-all duration-300 text-center border border-white/[0.08] hover:border-blue-400/40 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)]"> Cancelar</Link>
                {!somenteLeitura && (
                    <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 text-white font-semibold text-sm rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 hover:-translate-y-0.5 active:translate-y-0"> Salvar</button>
                )}
            </div>
        </form>
    );
}