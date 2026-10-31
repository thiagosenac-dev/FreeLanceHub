import { Usuario } from "./usuario"

export interface loginResponse{
    token:string,
    role:string
}


export interface AuthState {
    usuario : Usuario  |null,
    token : string
}
