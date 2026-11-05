'use client'

import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

// axios com a url base do back
const api = axios.create({
    baseURL: 'http://localhost:8080'
});

// antes de cada requisição, coloca o token (que está na store do Redux) no header
api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }
);

// se o token expirou ou é inválido (401), faz logout no Redux
// e o layout do sistema volta sozinho para a tela de login
api.interceptors.response.use(
    (resposta) => resposta,
    (erro) => {
        // 401 em qualquer rota (menos o próprio login): faz logout e não repassa o erro,
        // assim as telas não mostram alertas de erro enquanto voltam para o login
        if (erro.response?.status === 401 && !String(erro.config?.url).includes('/auth/login')) {
            store.dispatch(logout());
            return new Promise(() => {});
        }

        return Promise.reject(erro);
    }
);

export default api;
