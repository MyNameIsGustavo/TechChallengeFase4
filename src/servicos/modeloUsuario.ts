import { LoginValidacao } from "../schemas/login.schema";
import { IUsuario, IUsuarioAlteracao, IUsuarioEdicao } from "../modelos/IUsuario";
import { chronosAPI } from "../conexoes/chronosAPI";

export class UsuarioService {

    private readonly baseRoute = "/usuarios";

    private authHeader(tokenJWT: string) {
        return {
            headers: {
                Authorization: `Bearer ${tokenJWT}`,
            }
        };
    }

    async login(dadosLogin: LoginValidacao): Promise<string | null> {
        console.log("Realizando login com dados:", dadosLogin);
        try {
            const { data } = await chronosAPI.post<string>(
                "/login",
                dadosLogin
            );
            return data;
        } catch {
            return null;
        }
    }

    async buscarPorId(tokenJWT: string, id: number) {
        try {
            const { data } = await chronosAPI.get<IUsuario>(
                `${this.baseRoute}/${id}`,
                this.authHeader(tokenJWT)
            );
            return data;
        } catch {
            return null;
        }
    }

    async buscarInformacoes(tokenJWT: string) {
        try {
            const { data } = await chronosAPI.get<IUsuario>(
                `${this.baseRoute}/buscaInformacoes`,
                this.authHeader(tokenJWT)
            );
            return data;
        } catch {
            return null;
        }
    }

    async listarTodos(
        tokenJWT: string,
        params?: {
            pagina?: number;
            limite?: number;
            tipoUsuario?: number;
        }
    ) {
        try {
            const searchParams = new URLSearchParams();

            if (params?.pagina !== undefined) {
                searchParams.append("pagina", params.pagina.toString());
            }

            if (params?.limite !== undefined) {
                searchParams.append("limite", params.limite.toString());
            }

            if (params?.tipoUsuario !== undefined) {
                searchParams.append("tipoUsuario", params.tipoUsuario.toString());
            }

            const queryString = searchParams.toString();
            const url = queryString
                ? `${this.baseRoute}?${queryString}`
                : this.baseRoute;

            const { data } = await chronosAPI.get<IUsuario[]>(
                url,
                this.authHeader(tokenJWT)
            );

            return data;
        } catch {
            return null;
        }
    }

    async deletar(tokenJWT: string, id: number) {
        try {
            await chronosAPI.delete(
                `${this.baseRoute}/${id}`,
                this.authHeader(tokenJWT)
            );
            return true;
        } catch {
            return null;
        }
    }

    async cadastrar(tokenJWT: string, usuario: IUsuario) {
        try {
            const formData = new FormData();

            formData.append("nomeCompleto", usuario.nomeCompleto);
            formData.append("email", usuario.email);
            formData.append("senha", usuario.senha);
            formData.append("telefone", usuario.telefone);
            formData.append("papelUsuarioID", String(usuario.papelUsuarioID));

            if (usuario.caminhoImagem) {
                formData.append("caminhoImagem", {
                    uri: usuario.caminhoImagem.uri,
                    name: usuario.caminhoImagem.name,
                    type: usuario.caminhoImagem.type,
                } as any);
            }

            const response = await chronosAPI.post(
                this.baseRoute,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${tokenJWT}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            return null;
        }
    }


    async editar(tokenJWT: string, usuario: IUsuarioEdicao, id: number) {
        try {
            const formData = new FormData();
            formData.append("nomeCompleto", usuario.nomeCompleto);
            formData.append("email", usuario.email);
            formData.append("telefone", usuario.telefone);

            if (usuario.senha && usuario.senha.length > 0) formData.append("senha", usuario.senha);
            formData.append("papelUsuarioID", usuario.papelUsuarioID.toString());

            if (usuario.caminhoImagem && typeof usuario.caminhoImagem !== "string" && usuario.caminhoImagem.uri) {
                formData.append("caminhoImagem", {
                    uri: usuario.caminhoImagem.uri,
                    name: usuario.caminhoImagem.name ?? "imagem.jpg",
                    type: usuario.caminhoImagem.type ?? "image/jpeg",
                } as any);
            }

            const { data } = await chronosAPI.put<IUsuario>(
                `${this.baseRoute}/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${tokenJWT}`,
                        "Content-Type": "multipart/form-data",
                    },
                }

            );
            return data;
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
            return null;
        }
    }

    async alterar(tokenJWT: string, usuario: IUsuarioAlteracao) {
        try {
            const formData = new FormData();
            formData.append("nomeCompleto", usuario.nomeCompleto);
            formData.append("telefone", usuario.telefone);
            if (usuario.senha && usuario.senha.length > 0) formData.append("senha", usuario.senha);

            if (usuario.caminhoImagem) {
                formData.append("caminhoImagem", {
                    uri: usuario.caminhoImagem.uri,
                    name: usuario.caminhoImagem.name,
                    type: usuario.caminhoImagem.type,
                } as any);
            }

            console.log("retorno da api", formData);
            const { data } = await chronosAPI.put<IUsuario>(`${this.baseRoute}`, formData, {
                headers: {
                    Authorization: `Bearer ${tokenJWT}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("retorno da api", data);
            return data;
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
            return null;
        }
    }
}