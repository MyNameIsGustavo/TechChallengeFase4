import { IComentario } from "./IComentario";
import { ICurtida } from "./ICurtida";
import { IEstatisticasPostagem } from "./IEstatisticaPostagem";
import { IUsuario } from "./IUsuario";

export interface IPostagem {
    id: number;
    titulo: string;
    descricao: string;
    visibilidade: boolean | string;
    dataPublicacao: string;
    caminhoImagem?: {
        uri: string;
        name: string;
        type: string;
    };
    autor: IUsuario;
    curtidas: ICurtida[];
    comentarios: IComentario[];
    estatisticas: IEstatisticasPostagem;
}

export interface IFormularioPostagem {
    id: number;
    titulo: string;
    descricao: string;
    visibilidade: string;
    caminhoImagem?: {
        uri: string;
        name: string;
        type: string;
    };
}