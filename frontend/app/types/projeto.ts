export class Projeto{
    constructor(
        public id: number | null,
        public nome: string,
        public descricao: string,
        public valor: number,
        public prazo: string,
        public status: string

    ){}
}