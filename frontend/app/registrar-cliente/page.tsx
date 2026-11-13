'use client'

import { registrarCliente } from "@/app/services/authService";
import { buscarEnderecoPorCep } from "@/app/services/enderecoService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// MUDANÇA (novo): cadastro público de cliente (quem publica projetos), pessoa ou empresa
export default function RegistrarCliente(){
    const router = useRouter();

    // escolhe se o cliente é pessoa ou empresa (muda os campos da tela)
    const [tipoCliente, setTipoCliente] = useState<"PESSOA" | "EMPRESA">("PESSOA");

    // guarda o que a pessoa digitou (assim os campos não somem quando dá erro)
    const [nome, setNome] = useState("");
    const [razaoSocial, setRazaoSocial] = useState("");
    const [cpf, setCpf] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");

    // true enquanto o ViaCEP responde (nesse tempo não deixa cadastrar)
    const [buscandoCep, setBuscandoCep] = useState(false);

    // CEP sem logradouro ou bairro (cidade pequena): libera esses dois campos para a pessoa digitar
    const [enderecoManual, setEnderecoManual] = useState(false);

    const ehEmpresa = tipoCliente === "EMPRESA";

    // Quando a pessoa sai do campo CEP, busca o endereço no ViaCEP e preenche os outros campos
    const handlerBuscarCep = async () => {
        if (cep.replace(/\D/g, "").length !== 8) {
            return;
        }

        setBuscandoCep(true);
        try {
            const endereco = await buscarEnderecoPorCep(cep);
            setLogradouro(endereco.logradouro);
            setBairro(endereco.bairro);
            setCidade(endereco.cidade);
            setUf(endereco.uf);
            setEnderecoManual(!endereco.logradouro || !endereco.bairro);
        } catch (erro) {
            alert((erro as { response?: { data?: string } }).response?.data || "Erro ao buscar CEP!");
        } finally {
            setBuscandoCep(false);
        }
    }

    // envia os dados para o back, que cria o cliente e o usuário de acesso dele
    const handlerRegistrar = async(formData : FormData) =>{
        // o endereço precisa ter vindo do CEP (cidade e UF preenchidas) antes de cadastrar
        if (buscandoCep || !logradouro || !bairro || !cidade || !uf) {
            alert("Informe um CEP válido, aguarde o endereço ser preenchido e preencha todos os campos!");
            return;
        }

        const dadosRetorno = await registrarCliente({
            tipo: tipoCliente,
            nome: nome,
            razaoSocial: razaoSocial,
            cpf: cpf,
            cnpj: cnpj,
            email: email,
            telefone: telefone,
            senha: senha,
            cep: cep,
            logradouro: logradouro,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
        });

        if (dadosRetorno.status == 200){
            alert("Cadastro realizado! Agora é só entrar.");
            router.push("/login");
        } else {
            alert(dadosRetorno.data);
        }
    }

    const inputClasses = "w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm";
    const labelClasses = "block text-xs font-semibold uppercase tracking-wider text-slate-300";
    const opcaoAtiva = "flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white cursor-pointer";
    const opcaoInativa = "flex-1 py-2.5 px-3 rounded-xl text-sm font-medium bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white cursor-pointer";

    return(
    <div className="relative min-h-screen bg-black text-slate-100 flex items-center justify-center overflow-hidden px-4 py-10">
        {/* Efeitinho das bola azul que fica piscando */}
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full blur-[100px] z-0 pointer-events-none top-[-10%] left-[-10%] animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-600/20 to-blue-500/20 rounded-full blur-[100px] z-0 pointer-events-none bottom-[-10%] right-[-10%] animate-pulse"></div>

        {/* botão para voltar à página inicial */}
        <Link href="/" className="absolute top-5 left-5 z-10 inline-flex items-center justify-center text-sm font-medium text-slate-300 hover:text-white bg-white/[0.03] hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-500/10 border border-white/[0.08] hover:border-blue-400/40 px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)]">
            &larr; Voltar à página inicial
        </Link>

        <div className="w-full max-w-2xl bg-slate-950/70 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-8 md:p-10 shadow-2xl shadow-blue-950/30 relative z-10">
            <div className="text-center mb-8 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-1">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                    Novo Cliente
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                    Criar Conta
                </h1>
                <p className="text-sm text-slate-400">Cadastre-se para publicar projetos e receber propostas</p>
            </div>

            {/* escolhe se o cliente é pessoa ou empresa */}
            <div className="flex gap-3 mb-6">
                <button type="button" onClick={() => setTipoCliente("PESSOA")} className={tipoCliente === "PESSOA" ? opcaoAtiva : opcaoInativa}>Sou pessoa</button>
                <button type="button" onClick={() => setTipoCliente("EMPRESA")} className={tipoCliente === "EMPRESA" ? opcaoAtiva : opcaoInativa}>Sou empresa</button>
            </div>

            <form action={handlerRegistrar} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                    <label className={labelClasses}>{ehEmpresa ? "Nome da empresa" : "Nome completo"}</label>
                    <input name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required placeholder={ehEmpresa ? "Nome da empresa (nome fantasia)" : "João da Silva Sauro"} className={inputClasses} />
                </div>

                {ehEmpresa && (
                    <div className="space-y-1.5">
                        <label className={labelClasses}>Razão social</label>
                        <input name="razaoSocial" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} required placeholder="Razão social da empresa" className={inputClasses} />
                    </div>
                )}

                {ehEmpresa ? (
                    <div className="space-y-1.5">
                        <label className={labelClasses}>CNPJ</label>
                        <input name="cnpj" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required placeholder="00.000.000/0000-00" className={inputClasses} />
                    </div>
                ) : (
                    <div className="space-y-1.5">
                        <label className={labelClasses}>CPF</label>
                        <input name="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} required placeholder="000.000.000-00" className={inputClasses} />
                    </div>
                )}

                <div className="space-y-1.5">
                    <label className={labelClasses}>E-mail</label>
                    <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="seu@email.com" className={inputClasses} />
                </div>
                <div className="space-y-1.5">
                    <label className={labelClasses}>Telefone</label>
                    <input name="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required placeholder="(00) 00000-0000" className={inputClasses} />
                </div>
                <div className="space-y-1.5">
                    <label className={labelClasses}>Senha</label>
                    <input name="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required placeholder="••••••••" className={inputClasses} />
                </div>

                {/* endereço: o CEP preenche o resto pelo ViaCEP */}
                <div className="space-y-1.5">
                    <label className={labelClasses}>CEP</label>
                    <input name="cep" value={cep} onChange={(e) => { setCep(e.target.value); setLogradouro(""); setBairro(""); setCidade(""); setUf(""); setEnderecoManual(false); }} onBlur={handlerBuscarCep} required placeholder="00000-000" className={inputClasses} />
                </div>
                <div className="space-y-1.5">
                    <label className={labelClasses}>Logradouro</label>
                    <input name="logradouro" value={logradouro} readOnly={!enderecoManual} onChange={(e) => setLogradouro(e.target.value)} required placeholder="Preenchido pelo CEP" className={inputClasses} />
                </div>
                <div className="space-y-1.5">
                    <label className={labelClasses}>Bairro</label>
                    <input name="bairro" value={bairro} readOnly={!enderecoManual} onChange={(e) => setBairro(e.target.value)} required placeholder="Preenchido pelo CEP" className={inputClasses} />
                </div>
                <div className="space-y-1.5">
                    <label className={labelClasses}>Cidade</label>
                    <input name="cidade" value={cidade} readOnly required placeholder="Preenchido pelo CEP" className={inputClasses} />
                </div>
                <div className="space-y-1.5">
                    <label className={labelClasses}>UF</label>
                    <input name="uf" value={uf} readOnly required placeholder="Preenchido pelo CEP" className={inputClasses} />
                </div>

                <button
                    type="submit"
                    disabled={buscandoCep}
                    className="md:col-span-2 w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 transform active:scale-[0.99] cursor-pointer text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    CADASTRAR
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
                Já tem conta? <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">Entrar</Link>
            </p>
        </div>
    </div>
    );
}
