"use client"

import { useRouter } from "@/node_modules/next/navigation";
import { useEffect, useState } from "react";

// MUDANÇA (novo): só deixa entrar no sistema quem fez login, senão volta para o login
export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [liberado, setLiberado] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/login");
            return;
        }
        setLiberado(true);
    }, []);

    if (!liberado) return null;

    return <>{children}</>;
}
