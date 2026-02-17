import { chronosAPI } from "../conexoes/chronosAPI";
import { IComentariosPorPostagem, ICurtidasPorPostagem, IPostagemPorMes, IUsuarioPorPapel, IUsuarioPorPostagem } from "../modelos/IDashboard";

export class DashboardService {

    private readonly baseRoute = "/dashboard";

    private authHeader(tokenJWT: string) {
        return {
            headers: {
                Authorization: `Bearer ${tokenJWT}`,
            }
        };
    }

    async listarUsuarioPorPapel(tokenJWT: string) {
        const usuarioPorPapel = "/usuarioPorPapel"
        try {
            const { data } = await chronosAPI.get<IUsuarioPorPapel[]>(
                `${this.baseRoute}${usuarioPorPapel}`,
                this.authHeader(tokenJWT)
            );
            return data;
        } catch {
            return null;
        }
    }

    async listarUsuarioPorPostagem(tokenJWT: string) {
        const usuarioPorPostagem = "/usuarioPorPostagem"
        try {
            const { data } = await chronosAPI.get<IUsuarioPorPostagem[]>(
                `${this.baseRoute}${usuarioPorPostagem}`,
                this.authHeader(tokenJWT)
            );
            return data;
        } catch {
            return null;
        }
    }

    async listarCurtidasPorPostagem(tokenJWT: string) {
        const curtidasPorPostagem = "/curtidaPorPostagem"
        try {
            const { data } = await chronosAPI.get<ICurtidasPorPostagem[]>(`${this.baseRoute}${curtidasPorPostagem}`, this.authHeader(tokenJWT));
            return data;
        } catch {
            return null;
        }
    }

    async listarComentarioPorPostagem(tokenJWT: string) {
        const comentariosPorPostagem = "/comentarioPorPostagem";
        try {
            const { data } = await chronosAPI.get<IComentariosPorPostagem[]>(
                `${this.baseRoute}${comentariosPorPostagem}`,
                this.authHeader(tokenJWT)
            );
            return data;
        } catch {
            return null;
        }
    }

    async listarPostagemPorMes(tokenJWT: string) {
        const postagemPorMes = "/postagemPorMes";
        try {
            const { data } = await chronosAPI.get<IPostagemPorMes[]>(`${this.baseRoute}${postagemPorMes}`, this.authHeader(tokenJWT));
            return data;
        } catch {
            return null;
        }
    }
}