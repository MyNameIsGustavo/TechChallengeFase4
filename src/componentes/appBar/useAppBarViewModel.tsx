import { useEffect, useState } from "react";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { IUsuario, IUsuarioAlteracao } from "../../modelos/IUsuario";
import { useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from "react-native";
import { UsuarioService } from "../../servicos/modeloUsuario";

export interface ImagemUpload {
    uri: string;
    name: string;
    type: string;
}

export const useAppBarViewModel = () => {
    const [alerta, setAlerta] = useState({ exibe: false, titulo: "", mensagem: "", onConfirm: () => { }, });
    const [mostrarModal, setMostrarModal] = useState(false);
    const { informacoesUsuario, logout } = useAutenticacao();
    const { tokenJWT } = useAutenticacao();
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        setValue,
        reset,
    } = useForm<IUsuario>({
        defaultValues: {
            email: "",
            telefone: "",
            nomeCompleto: "",
            dataCadastro: "",
            papelUsuarioID: 1,
            caminhoImagem: undefined,
            senha: "",
        },
    });

    const abrirModal = () => setMostrarModal(true);
    const fecharModal = () => setMostrarModal(false);
    const usuarioServico = new UsuarioService();
    const larguraTela = Dimensions.get("window").width;

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

    const editar = async (dadosFormulario: IUsuario) => {
        if (!tokenJWT) return;

        const dadosParaEnviar: IUsuarioAlteracao = {
            nomeCompleto: dadosFormulario.nomeCompleto,
            telefone: dadosFormulario.telefone,
            ...(dadosFormulario.senha && dadosFormulario.senha.trim() !== "" && { senha: dadosFormulario.senha }),
            caminhoImagem: dadosFormulario.caminhoImagem
        };
        try {
            console.log(dadosFormulario)
            if (await usuarioServico.alterar(tokenJWT, dadosParaEnviar)) logout();
        } catch {
            console.log("Erro ao editar usuário");
        }
    };

    useEffect(() => {
        if (informacoesUsuario) {
            reset({
                email: informacoesUsuario.email,
                telefone: informacoesUsuario.telefone,
                nomeCompleto: informacoesUsuario.nomeCompleto,
                dataCadastro: informacoesUsuario.dataCadastro,
                papelUsuarioID: informacoesUsuario.papelUsuarioID,
                caminhoImagem: informacoesUsuario.caminhoImagem,
                senha: "",
            });
        }
    }, [informacoesUsuario, reset]);


    const abrirConfirmacaoSalvar = (data: any) => {
        setAlerta({
            exibe: true,
            titulo: "Confirmar ação",
            mensagem: "Deseja realmente atualizar as informações?",
            onConfirm: async () => {
                setAlerta((prev) => ({ ...prev, show: false }));
                await editar(data);
            },
        });
    };

    return {
        informacoesUsuario,
        mostrarModal,
        abrirModal,
        fecharModal,
        logout,
        selecionarImagem,
        control,
        handleSubmit,
        errors,
        isSubmitting,
        setValue,
        larguraTela,
        alerta,
        setAlerta,
        abrirConfirmacaoSalvar
    };
}