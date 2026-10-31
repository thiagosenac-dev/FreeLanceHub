export class Usuario{
    constructor(
        public id: number | null,
        public nome:string,
        public email:string,
        public senha:string,
        public status:string,
        public cpf:string,
        public clienteId?: number | null, // cliente (empresa), só para usuário do tipo empresa
        public role?: string){ // perfil: ROLE_ADMIN, ROLE_EMPRESA ou ROLE_FREELANCER

    }
}
export interface UsuarioFormProps {
    usuarioExistente ?: Usuario;
}