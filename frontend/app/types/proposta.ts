export class Proposta{
    constructor(
        public id: number | null,
        public descricao: string,
        public valor: number,
        public prazo: string,
        public status: string

    ){}
}