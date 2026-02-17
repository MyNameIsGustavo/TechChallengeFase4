import { useForm } from "react-hook-form";
import { IFormularioPostagem, IPostagem } from "../../modelos/IPostagem";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { RotasAutenticadasParamList } from "../../rotas/rotasAutenticadas";
import { useEffect, useState } from "react";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { ServicoPostagem } from "../../servicos/modeloPostagem";
import * as ImagePicker from "expo-image-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface ImagemUpload {
    uri: string;
    name: string;
    type: string;
}

export const useFormularioPostagensViewModel = () => {
    const [alerta, setAlerta] = useState({ exibe: false, titulo: "", mensagem: "", onConfirm: () => { }, });
    const { handleSubmit, control, formState: { errors, isSubmitting }, setValue } = useForm<IPostagem>();
    const { tokenJWT } = useAutenticacao();
    const navegacao = useNavigation<
        NativeStackNavigationProp<RotasAutenticadasParamList>
    >(); const larguraTela = Dimensions.get("window").width;
    type FormularioRouteProp = RouteProp<RotasAutenticadasParamList, "FormularioPostagem">;
    const route = useRoute<FormularioRouteProp>();
    const ehEdicao = route.params?.ehEdicao ?? false;
    const postagemEdicao = route.params?.editarObjeto;
    const postagemServico = new ServicoPostagem();

    async function selecionarImagem(): Promise<ImagemUpload | null> {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            return {
                uri: asset.uri,
                name: asset.fileName ?? 'imagem.jpg',
                type: asset.mimeType ?? 'image/jpeg',
            };
        }
        return null;
    }

    const vaiParaPostagens = () => {navegacao.navigate("Apps");}

    const cadastrarPostagem = async (dadosFormulario: IFormularioPostagem) => {
        if (!tokenJWT) return;
        try {
            const postagemCadastrada = await postagemServico.cadastrar(tokenJWT, dadosFormulario);
            if (postagemCadastrada) return vaiParaPostagens();
        } catch (error) {
            console.log("Erroo")
        }
    }

    const editarPostagem = async (dadosFormulario: IFormularioPostagem) => {
        if (!tokenJWT) return;
        try {
            const postagemEditada = await postagemServico.editar(tokenJWT, dadosFormulario, postagemEdicao!.id);
            console.log("retorno ", postagemEditada)
            if (postagemEditada) {
                vaiParaPostagens();
            }
        } catch (error) {
            console.log("Erro ao editar postagem");
        }
    }

    const abrirConfirmacaoSalvar = (data: any) => {
        setAlerta({
            exibe: true,
            titulo: "Confirmar ação",
            mensagem: ehEdicao
                ? "Deseja realmente atualizar esta postagem?"
                : "Deseja realmente cadastrar esta postagem?",
            onConfirm: async () => {
                setAlerta((prev) => ({ ...prev, exibe: false }));

                if (ehEdicao) {
                    await editarPostagem(data);
                } else {
                    await cadastrarPostagem(data);
                }
            },
        });
    };

    useEffect(() => {
        if (ehEdicao && postagemEdicao) {
            setValue("titulo", postagemEdicao.titulo);
            setValue("descricao", postagemEdicao.descricao);
            setValue("visibilidade", postagemEdicao.visibilidade);
            setValue("caminhoImagem", postagemEdicao.caminhoImagem);
        }
    }, [ehEdicao, postagemEdicao]);

    return {
        handleSubmit,
        control,
        errors,
        isSubmitting,
        setValue,
        selecionarImagem,
        vaiParaPostagens,
        larguraTela,
        ehEdicao,
        postagemEdicao,
        abrirConfirmacaoSalvar,
        setAlerta,
        alerta
    };
}