// guarda e lê o token e o perfil (role) do usuário logado
export const salvarSessao = (token: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
}

export const lerRole = () => localStorage.getItem("role") ?? "";

export const sairDaSessao = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
}
