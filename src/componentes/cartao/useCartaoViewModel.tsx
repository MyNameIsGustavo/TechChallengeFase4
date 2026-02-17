import { useForm } from "react-hook-form";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { IComentario } from "../../modelos/IComentario";
import { ComentariosService } from "../../servicos/modeloComentario";
import { CurtidasService } from "../../servicos/modeloCurtidas";
import { useState } from "react";

interface UseCartaoParams { numCurtidas: number; numComentarios: number; comentarios: IComentario[]; postagemID: number; iniciaCurtido: boolean; }

export const useCartaoViewModel = ({ numCurtidas, numComentarios, comentarios, postagemID, iniciaCurtido }: UseCartaoParams) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IComentario>();
    const { tokenJWT, informacoesUsuario } = useAutenticacao();
    const curtidaService = new CurtidasService();
    const comentarioService = new ComentariosService();
    const [isCurtido, setIsCurtido] = useState(iniciaCurtido);
    const [listaComentarios, setListaComentarios] = useState<IComentario[]>(comentarios);
    const [likes, setLikes] = useState(numCurtidas);
    const [auxComentario, setAuxComentario] = useState(numComentarios);

    const curtirPostagem = async () => {
        if (!tokenJWT || isCurtido) return;

        await curtidaService.curtir(tokenJWT, postagemID);
        setIsCurtido(true);
        setLikes(prev => prev + 1);
    };

    const descurtirPostagem = async () => {
        if (!tokenJWT || !isCurtido) return;

        await curtidaService.descurtir(tokenJWT, postagemID);
        setIsCurtido(false);
        setLikes(prev => Math.max(prev - 1, 0));
    };

    const comentarPostagem = async (conteudo: string) => {
        if (!tokenJWT) return;

        const novoComentario = await comentarioService.cadastrar(
            tokenJWT,
            postagemID,
            conteudo
        );

        if (novoComentario) {
            setListaComentarios(prev => [novoComentario, ...prev]);
            setValue("conteudo", "");
            setAuxComentario(prev => prev + 1);
        }
    };

    const descomentarPostagem = async (comentarioID: number) => {
        if (!tokenJWT) return;

        const sucesso = await comentarioService.deletar(tokenJWT, postagemID, comentarioID);

        if (sucesso) {
            setListaComentarios(prev =>
                prev.filter(comentario => comentario.id !== comentarioID)
            );
            setAuxComentario(prev => Math.max(prev - 1, 0))
        }
    };


    return {
        curtirPostagem,
        descurtirPostagem,
        comentarPostagem,
        isCurtido,
        setIsCurtido,
        register,
        handleSubmit,
        errors,
        setValue,
        informacoesUsuario,
        likes,
        listaComentarios,
        descomentarPostagem
    }
}