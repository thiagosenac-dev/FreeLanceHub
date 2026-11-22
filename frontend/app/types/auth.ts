import { Usuario } from "./usuario"

// resposta do login: token e perfil (role)
export interface loginResponse{
    token:string,
    role:string
}


// o que o Redux guarda do login: usuário e token
export interface AuthState {
    usuario : Usuario  |null,
    token : string
}
