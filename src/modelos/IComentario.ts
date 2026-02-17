import { IUsuario } from "./IUsuario";

export interface IComentario {
    id: number;
    conteudo: string;
    dataCriacao: string;
    usuario: IUsuario;
}