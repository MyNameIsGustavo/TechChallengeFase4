import { useEffect, useState } from "react";
import { IUsuario } from "../../modelos/IUsuario";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { UsuarioService } from "../../servicos/modeloUsuario";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RotasAutenticadasParamList } from "../../rotas/rotasAutenticadas";
import { useIsFocused } from "@react-navigation/native";

export const UseUsuarioViewModel = () => {
    const [alerta, setAlerta] = useState({ exibe: false, titulo: "", mensagem: "", onConfirm: () => { } });
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [pagina, setPagina] = useState(0);
    const [carregando, setCarregando] = useState(false);
    const [temMais, setTemMais] = useState(true);

    const [papelUsuarioSelecionado, setPapelUsuarioSelecionado] = useState<number | undefined>(undefined);
    const { tokenJWT, logout } = useAutenticacao();
    const usuarioServico = new UsuarioService();
    const navegacao = useNavigation<NavigationProps>();
    type NavigationProps = NativeStackNavigationProp<RotasAutenticadasParamList, "Usuarios">;
    const ehFocadoNaTela = useIsFocused();

    const LIMITE = 10;

    async function carregarUsuarios(reset = false) {
        if (!tokenJWT || carregando) return;
        if (!temMais && !reset) return;

        setCarregando(true);

        const paginaAtual = reset ? 1 : pagina;

        const resposta = await usuarioServico.listarTodos(tokenJWT, {
            pagina: paginaAtual,
            limite: LIMITE,
            tipoUsuario: papelUsuarioSelecionado
        });

        if (resposta) {
            const usuariosFormatados = resposta.content.map(usuario => ({
                ...usuario,
                dataCadastro: usuario.dataCadastro
                    ? new Intl.DateTimeFormat("pt-BR").format(
                        new Date(usuario.dataCadastro)
                    )
                    : ""
            }));

            setUsuarios(prev =>
                reset ? usuariosFormatados : [...prev, ...usuariosFormatados]
            );

            setPagina(paginaAtual + 1);
            setTemMais(paginaAtual < resposta.totalPages);
        }

        setCarregando(false);
    }

    const abrirConfirmacaoExclusao = (id: number) => {
        setAlerta({
            exibe: true,
            titulo: "Confirmar exclusão",
            mensagem: "Tem certeza que deseja remover este usuário?",
            onConfirm: async () => {
                setAlerta({ ...alerta, exibe: false });
                await deletarUsuario(id);
            },
        });
    };

    const deletarUsuario = async (id: number) => {
        if (!tokenJWT) return;
        try {
            if (await usuarioServico.deletar(tokenJWT, id)) carregarUsuarios();
        } catch (error) {
            console.error("Erro ao remover usuário:", error);
        }
    };

    const selecionarUsuario = async (id: number) => {
        if (!tokenJWT) return;
        try {
            const usuario = await usuarioServico.buscarPorId(tokenJWT, id);
            navegacao.navigate("FormularioUsuario", {
                ehEdicao: true,
                editarObjeto: usuario!,
            });
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
        }
    }

    const vaiParaFormularioUsuario = () => { navegacao.navigate("FormularioUsuario"); };

    useEffect(() => {
        if (tokenJWT && ehFocadoNaTela) {
            setUsuarios([]);
            setPagina(1);
            setTemMais(true);
            carregarUsuarios(true);
        }
    }, [ehFocadoNaTela, tokenJWT, papelUsuarioSelecionado]);

    if (!tokenJWT) return { usuarios: [], alerta, setAlerta, abrirConfirmacaoExclusao, selecionarUsuario, vaiParaFormularioUsuario };

    return {
        usuarios,
        alerta,
        setAlerta,
        abrirConfirmacaoExclusao,
        selecionarUsuario,
        vaiParaFormularioUsuario: () => navegacao.navigate("FormularioUsuario"),
        setPapelUsuarioSelecionado,
        carregarUsuarios,
        carregando
    };
}