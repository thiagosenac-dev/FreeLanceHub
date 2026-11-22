// proposta de um freelancer para um projeto
export class Proposta{
    constructor(
        public id: number | null,
        public descricao: string,
        public valor: number,
        public prazo: string,
        public status: string,
        public projetoId?: number | null, // MUDANÇA: projeto que recebeu a proposta
        public freelancerNome?: string | null, // MUDANÇA: contato do freelancer
        public freelancerEmail?: string | null,
        public projetoNome?: string | null, // nome do projeto da proposta
        public projetoAberto?: boolean // false se o projeto não está mais aberto ou a empresa está bloqueada/excluída

    ){}
}