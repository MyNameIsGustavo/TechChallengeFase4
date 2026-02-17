import { useEffect, useState } from "react";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { IPostagem } from "../../modelos/IPostagem";
import { ServicoPostagem } from "../../servicos/modeloPostagem";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { RotasAutenticadasParamList } from "../../rotas/rotasAutenticadas";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const usePostagensViewModel = () => {
    const { tokenJWT } = useAutenticacao();
    const [postagens, setPostagens] = useState<IPostagem[]>([]);
    const [termo, setTermo] = useState<string>();
    const [alerta, setAlerta] = useState({ exibe: false, titulo: "", mensagem: "", onConfirm: () => { } });
    const postagemServico = new ServicoPostagem();
    const ehFocadoNaTela = useIsFocused();

    const navegacao = useNavigation<NavigationProps>();
    type NavigationProps = NativeStackNavigationProp<RotasAutenticadasParamList, "Usuarios">;


    const pesquisar = async () => {
        if (!tokenJWT) return;
        if (!termo || termo.trim() === "") return buscarPostagens();
        const resultado = await postagemServico.buscarPorPalavraChave(tokenJWT, termo);
        setPostagens(resultado ?? []);
    };


    const buscarPostagens = async () => {
        if (!tokenJWT) return;
        try {
            const postagens = await postagemServico.listarTodas(tokenJWT);
            if (postagens && Array.isArray(postagens)) {
                setPostagens(postagens);
            } else {
                setPostagens([]);
            }
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    const deletarPostagem = async (id: number) => {
        if (!tokenJWT) return;
        try {
            if (await postagemServico.deletar(tokenJWT, id)) buscarPostagens();
        } catch (error) {
            console.error("Erro ao remover usuário:", error);
        }
    };

    const abrirConfirmacaoExclusao = (id: number) => {
        setAlerta({
            exibe: true,
            titulo: "Confirmar exclusão",
            mensagem: "Tem certeza que deseja remover esta postagem?",
            onConfirm: async () => {
                setAlerta({ ...alerta, exibe: false });
                await deletarPostagem(id);
            },
        });
    };

    const selecionarPostagem = async (id: number) => {
        if (!tokenJWT) return;
        try {
            const postagem = await postagemServico.listarPorId(tokenJWT, id);
            navegacao.navigate("FormularioPostagem", {
                ehEdicao: true,
                editarObjeto: postagem!,
            });
        } catch (error) {
            console.error("Erro ao buscar postagem:", error);
        }
    }
    const vaiParaFormularioPostagem = () => { navegacao.navigate("FormularioPostagem"); };

    useEffect(() => { if (tokenJWT && ehFocadoNaTela) buscarPostagens() }, [ehFocadoNaTela, tokenJWT]);

    return {
        postagens,
        pesquisar,
        termo,
        setTermo,
        abrirConfirmacaoExclusao,
        alerta,
        setAlerta,
        vaiParaFormularioPostagem,
        selecionarPostagem
    };
}