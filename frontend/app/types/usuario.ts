export class Usuario{
    constructor(
        public id: number | null,
        public nome:string,
        public email:string,
        public senha:string,
        public status:string,
        public cpf:string

    ){}
}