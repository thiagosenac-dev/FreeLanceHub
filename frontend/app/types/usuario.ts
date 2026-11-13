export class Usuario{
    constructor(
        public id: number | null,
        public nome:string,
        public email:string,
        public senha:string,
        public status:string,
        public cpf:string,
        public clienteId?: number | null, // cliente (empresa), só para usuário do tipo empresa
        public role?: string, // perfil: ROLE_ADMIN, ROLE_CLIENTE ou ROLE_USUARIO
        // endereço (preenchido pelo CEP), só o freelancer (ROLE_USUARIO) tem
        public cep?: string,
        public logradouro?: string,
        public bairro?: string,
        public cidade?: string,
        public uf?: string){

    }
}
export interface UsuarioFormProps {
    usuarioExistente ?: Usuario;
}