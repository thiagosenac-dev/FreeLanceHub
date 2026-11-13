export class Cliente{
    constructor(
        public id: number | null,
        public nome:string,
        public email:string,
        public status:string,
        public cpf:string,
        public telefone:string,
        public cep:string = "",
        public logradouro:string = "",
        public bairro:string = "",
        public cidade:string = "",
        public uf:string = "",
        public tipo:string = "PESSOA", // PESSOA ou EMPRESA (na empresa o "nome" é o nome fantasia)
        public razaoSocial:string = "",
        public cnpj:string = ""

    ){}
}