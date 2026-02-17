import { IComentario } from "../modelos/IComentario";
import { chronosAPI } from "../conexoes/chronosAPI";

export class ComentariosService {

    private readonly baseRoute = "/postagem";
    private readonly acao = "/comentario";
    private authHeader(tokenJWT: string) { return { headers: { Authorization: `Bearer ${tokenJWT}`, } }; }

    async listarPorId(tokenJWT: string, postagemID: number, id: number): Promise<IComentario | null> {
        try {
            const resposta = await chronosAPI.get<IComentario>(`${this.baseRoute}/${postagemID}${this.acao}/${id}`, this.authHeader(tokenJWT));
            return resposta.data;
        } catch {
            return null;
        }
    }

    async cadastrar(tokenJWT: string, postagemID: number, conteudo: string): Promise<IComentario | null> {
        try {
            const resposta = await chronosAPI.post<IComentario>(`${this.baseRoute}/${postagemID}${this.acao}`, { conteudo }, this.authHeader(tokenJWT));
            return resposta.data;
        } catch {
            return null;
        }
    }

    async editar(tokenJWT: string, postagemID: number, id: number, conteudo: string): Promise<IComentario | null> {
        try {
            const resposta = await chronosAPI.put<IComentario>(`${this.baseRoute}/${postagemID}${this.acao}/${id}`, conteudo, this.authHeader(tokenJWT));
            return resposta.data;
        } catch {
            return null;
        }
    }

    async deletar(tokenJWT: string, postagemID: number, id: number): Promise<boolean> {
        try {
            await chronosAPI.delete(`${this.baseRoute}/${postagemID}${this.acao}/${id}`, this.authHeader(tokenJWT));
            return true;
        } catch {
            return false;
        }
    }
}