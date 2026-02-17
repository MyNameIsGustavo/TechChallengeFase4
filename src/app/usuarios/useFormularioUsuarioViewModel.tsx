import { useNavigation } from "@react-navigation/native";
import { IUsuario, IUsuarioEdicao } from "../../modelos/IUsuario";
import { useForm } from "react-hook-form";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { UsuarioService } from "../../servicos/modeloUsuario";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { RotasAutenticadasParamList } from "../../rotas/rotasAutenticadas";
import { Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";

export interface ImagemUpload {
    uri: string;
    name: string;
    type: string;
}

export const UseFormularioUsuarioViewModel = () => {
    const [alerta, setAlerta] = useState({ exibe: false, titulo: "", mensagem: "", onConfirm: () => { }, });
    const { handleSubmit, control, formState: { errors, isSubmitting }, setValue } = useForm<IUsuario>();
    const { tokenJWT } = useAutenticacao();
    const usuarioServico = new UsuarioService();
    const navegacao = useNavigation();
    const vaiParaAlunos = () => { navegacao.goBack(); };
    type FormularioRouteProp = RouteProp<RotasAutenticadasParamList, "FormularioUsuario">;
    const route = useRoute<FormularioRouteProp>();
    const larguraTela = Dimensions.get("window").width;


    const ehEdicao = route.params?.ehEdicao ?? false;
    const usuarioEdicao = route.params?.editarObjeto;

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

    const cadastrar = async (dados: IUsuario) => {
        if (!tokenJWT) return;
        try {
            const usuarioCadastrado = await usuarioServico.cadastrar(tokenJWT, dados);
            if (usuarioCadastrado) return vaiParaAlunos();
        } catch (error) {
            console.log("Erro ao cadastrar usuário");
        }
    };

    const editar = async (dadosFormulario: IUsuarioEdicao) => {
        if (!tokenJWT) return;

        const dadosParaEnviar = { ...dadosFormulario };
        if (!dadosParaEnviar.senha || dadosParaEnviar.senha.trim() === "") { delete dadosParaEnviar.senha; }
        
        try {
            if (await usuarioServico.editar(tokenJWT, dadosParaEnviar, usuarioEdicao!.id)) vaiParaAlunos();
        } catch (error) {
            console.log("Erro ao editar usuário");
        }
    };


    const abrirConfirmacaoSalvar = (data: any) => {
        setAlerta({
            exibe: true,
            titulo: "Confirmar ação",
            mensagem: ehEdicao
                ? "Deseja realmente atualizar este usuário?"
                : "Deseja realmente cadastrar este usuário?",
            onConfirm: async () => {
                setAlerta((prev) => ({ ...prev, show: false }));
                if (ehEdicao) {
                    await editar(data);
                } else {
                    await cadastrar(data);
                }
            },
        });
    };

    useEffect(() => {
        if (ehEdicao && usuarioEdicao) {
            setValue("nomeCompleto", usuarioEdicao.nomeCompleto);
            setValue("email", usuarioEdicao.email);
            setValue("telefone", usuarioEdicao.telefone);
            setValue("papelUsuarioID", usuarioEdicao.papelUsuarioID);
            setValue("caminhoImagem", usuarioEdicao.caminhoImagem);
        }
    }, [ehEdicao, usuarioEdicao]);

    return {
        larguraTela,
        vaiParaAlunos,
        handleSubmit,
        control,
        errors,
        isSubmitting,
        selecionarImagem,
        abrirConfirmacaoSalvar,
        setValue,
        alerta,
        setAlerta,
        ehEdicao,
        usuarioEdicao
    };
};
