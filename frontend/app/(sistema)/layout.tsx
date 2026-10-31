'use client'

import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SistemaLayout({ children }: { children: React.ReactNode }) {

    // usuário logado no Redux (null = não logado ou deslogado pelo interceptor)
    const usuario = useSelector((state: RootState) => state.auth.usuario);

    const router = useRouter();

    // só desenha o sistema depois de montar no navegador (o login vem dos cookies)
    const [montado, setMontado] = useState(false);

    useEffect(() => {
        setMontado(true);
    }, []);

    // sem usuário no Redux, volta para o login
    useEffect(() => {
        if (montado && usuario == null) {
            router.push("/login");
        }
    }, [montado, usuario]);

    if (!montado || usuario == null) return null;

    return (
        <div className="flex min-h-screen bg-[#030712]">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 ">
                <Header />
                <main className="flex-1 overflow-y-auto bg-[#030712] text-gray-100">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}
