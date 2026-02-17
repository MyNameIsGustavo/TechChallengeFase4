import { chronosAPI } from "../conexoes/chronosAPI";

export class CurtidasService {

    private readonly baseRoute = "/postagem";
    private readonly acao = "/curtida";

    private authHeader(tokenJWT: string) { return { headers: { Authorization: `Bearer ${tokenJWT}` } }; }

    async curtir(tokenJWT: string, postagemID: number): Promise<boolean> {
        try {
            await chronosAPI.post(
                `${this.baseRoute}/${postagemID}${this.acao}`,
                null,
                this.authHeader(tokenJWT)
            );
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async descurtir(tokenJWT: string, postagemID: number): Promise<boolean> {
        try {
            await chronosAPI.delete(
                `${this.baseRoute}/${postagemID}${this.acao}`,
                this.authHeader(tokenJWT)
            );
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}