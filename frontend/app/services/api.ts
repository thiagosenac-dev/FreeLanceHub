import axios from "@/node_modules/axios/index";

// axios com a url base do back
const api = axios.create({
    baseURL: "http://localhost:8080"
});

// antes de cada requisição, coloca o token no header
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// se o token expirou ou é inválido (401), volta pro login
api.interceptors.response.use(
    (resposta) => resposta,
    (erro) => {
        if (erro.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }

        return Promise.reject(erro);
    }
);

export default api;