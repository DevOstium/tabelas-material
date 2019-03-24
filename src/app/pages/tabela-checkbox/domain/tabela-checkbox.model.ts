export interface Produto {
    id             : number;
    estoque        : number;
    nome           : string;
    inativo        : boolean;
    prazoValidade  : string;
    precoVenda     : number
}