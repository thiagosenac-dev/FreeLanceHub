import { Categoria } from "@/app/types/categoria";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logout } from "./authSlice";

// segunda funcionalidade no Redux: lista de categorias compartilhada entre as telas
// (projetos, vagas e formulário de projeto leem daqui em vez de cada uma guardar a sua)
interface CategoriasState {
    lista: Categoria[]
}

const initialState: CategoriasState = {
    lista: []
}

const categoriasSlice = createSlice({
    name: 'categorias',
    initialState,
    reducers: {
        setCategorias: (state, action: PayloadAction<Categoria[]>) => {
            state.lista = action.payload;
        },
        limparCategorias: (state) => {
            state.lista = [];
        }
    },
    // quando o usuário sai, a lista de categorias também é limpa
    extraReducers: (builder) => {
        builder.addCase(logout, (state) => {
            state.lista = [];
        });
    }
});

export const { setCategorias, limparCategorias } = categoriasSlice.actions;
export default categoriasSlice.reducer;
