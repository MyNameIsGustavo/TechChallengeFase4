import { IPostagem } from "../modelos/IPostagem";
import { chronosAPI } from "../conexoes/chronosAPI";
import { IFormularioPostagem } from "../modelos/IPostagem";

export class ServicoPostagem {

    private readonly baseRoute = "/postagem";

    private authHeader(tokenJWT: string) {
        return {
            headers: {
                Authorization: `Bearer ${tokenJWT}`,
            }
        };
    }

    async listarTodas(tokenJWT: string, termo?: string): Promise<IPostagem[] | null> {
        try {
            const resposta = await chronosAPI.get<IPostagem[]>(
                this.baseRoute,
                this.authHeader(tokenJWT)
            );
            return resposta.data;
        } catch {
            return null;
        }
    }

    async buscarPorPalavraChave(tokenJWT: string, palavra: string): Promise<IPostagem[] | null> {
        try {
            const resposta = await chronosAPI.get<IPostagem[]>(
                `${this.baseRoute}/palavraChave`,
                {
                    ...this.authHeader(tokenJWT),
                    params: { palavra }
                }
            );
            return resposta.data;
        } catch {
            return null;
        }
    }

    async listarPorId(tokenJWT: string, id: number): Promise<IPostagem | null> {
        try {
            const resposta = await chronosAPI.get<IPostagem>(
                `${this.baseRoute}/${id}`,
                this.authHeader(tokenJWT)
            );
            return resposta.data;
        } catch {
            return null;
        }
    }

    async cadastrar(tokenJWT: string, dadosFormulario: IFormularioPostagem): Promise<IPostagem | null> {
        try {
            const formData = new FormData();
            formData.append("titulo", dadosFormulario.titulo);
            formData.append("descricao", dadosFormulario.descricao);
            formData.append("visibilidade", dadosFormulario.visibilidade);

            if (dadosFormulario.caminhoImagem) {
                formData.append("caminhoImagem", {
                    uri: dadosFormulario.caminhoImagem.uri,
                    name: dadosFormulario.caminhoImagem.name,
                    type: dadosFormulario.caminhoImagem.type,
                } as any);
            }

            const resposta = await chronosAPI.post<IPostagem>(
                this.baseRoute,
                formData,
                {
                    headers: { Authorization: `Bearer ${tokenJWT}`, "Content-Type": "multipart/form-data", },
                }
            );
            return resposta.data;
        } catch (error) {
            return null;
        }
    }

    async editar(tokenJWT: string, dadosFormulario: IFormularioPostagem, id: number): Promise<IPostagem | null> {
        try {
            const formData = new FormData();

            formData.append("titulo", dadosFormulario.titulo);
            formData.append("descricao", dadosFormulario.descricao);
            formData.append("visibilidade", dadosFormulario.visibilidade);

            if (dadosFormulario.caminhoImagem && typeof dadosFormulario.caminhoImagem !== "string" && dadosFormulario.caminhoImagem.uri) {
                formData.append("caminhoImagem", {
                    uri: dadosFormulario.caminhoImagem.uri,
                    name: dadosFormulario.caminhoImagem.name ?? "imagem.jpg",
                    type: dadosFormulario.caminhoImagem.type ?? "image/jpeg",
                } as any);
            }

            const resposta = await chronosAPI.put<IPostagem>(
                `${this.baseRoute}/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${tokenJWT}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return resposta.data;
        } catch (error: any) {
            return null;
        }
    }

    async deletar(tokenJWT: string, id: number): Promise<boolean> {
        try {
            await chronosAPI.delete(
                `${this.baseRoute}/${id}`,
                this.authHeader(tokenJWT)
            );
            return true;
        } catch {
            return false;
        }
    }
}