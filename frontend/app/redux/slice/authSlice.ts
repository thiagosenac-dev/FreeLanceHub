import { AuthState } from "@/app/types/auth";
import { Usuario } from "@/app/types/usuario";
import { createSlice, PayloadAction } from "@/node_modules/@reduxjs/toolkit/dist/index";
import { createCombinedPayloadAtDepth } from "@/node_modules/next/dist/server/app-render/instant-validation/instant-validation";


const initialState: AuthState ={
    usuario: null,
    token : ""
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers:{
        login:( state, action: PayloadAction<{token:string, usuario:Usuario}>) =>{

            state.token = action.payload.token;
            state.usuario = action.payload.usuario;

        },
        logout:( state) =>{

        }
    }
});