'use client'

import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

// axios com a url base do back
const api = axios.create({
    baseURL: 'http://localhost:8080'
});

// antes de cada requisição, coloca o token no header
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');

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
        if (erro.response?.status === 401) {
            store.dispatch(logout());
        }

        return Promise.reject(erro);
    }
);

export default api;
