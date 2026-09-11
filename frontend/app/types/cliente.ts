export class Cliente{
    constructor(
        public id: number | null,
        public nome:string,
        public email:string,
        public status:string,
        public cpf:string,
        public telefone:string

    ){}
}