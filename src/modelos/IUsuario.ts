export interface IUsuario {
    id: number;
    nomeCompleto: string;
    caminhoImagem?: {
        uri: string;
        name: string;
        type: string;
    };
    telefone: string;
    email: string;
    senha: string;
    dataCadastro: string;
    papelUsuarioID: number;
}

export interface IUsuarioEdicao {
    nomeCompleto: string;
    email: string;
    telefone: string;
    papelUsuarioID: number;
    senha?: string;
    caminhoImagem?: {
        uri: string;
        name: string;
        type: string;
    };
}

export interface IUsuarioAlteracao {
    id?: number;
    nomeCompleto: string;
    caminhoImagem?: {
        uri: string;
        name: string;
        type: string;
    };
    telefone: string;
    senha?: string | undefined;
    papelUsuarioID?: number;
}