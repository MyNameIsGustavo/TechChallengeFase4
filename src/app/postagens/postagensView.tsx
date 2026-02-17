import { SafeAreaView } from "react-native-safe-area-context"
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { CartaoLista } from "../../componentes/cartaoLista/cartaoLista";
import { usePostagensViewModel } from "./usePostagensViewModel";
import { IPostagem } from "../../modelos/IPostagem";
import { Alerta } from "../../componentes/alerta/alerta";
import AntDesign from '@expo/vector-icons/AntDesign';

export const PostagensView = () => {
    const {
        pesquisar,
        postagens,
        setTermo,
        termo,
        abrirConfirmacaoExclusao,
        alerta,
        setAlerta,
        vaiParaFormularioPostagem,
        selecionarPostagem
    } = usePostagensViewModel();

    const cartao = ({ item }: { item: IPostagem }) => {
        let imagem = "https://avatars.githubusercontent.com/u/103784593?v=4";
        if (typeof item.caminhoImagem === "string") {
            imagem = item.caminhoImagem;
        }
        return (
            <CartaoLista<IPostagem>
                item={item}
                getNome={(item) => item.titulo}
                getData={(item) => item.autor.nomeCompleto}
                getImagem={() => imagem}
                aoDeletar={() => abrirConfirmacaoExclusao(item.id)}
                aoPressionar={() => selecionarPostagem(item.id)}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <TextInput placeholder="Encontrar postagens..." mode="outlined" dense style={styles.pesquisa} value={termo}
                onChangeText={setTermo}
                onEndEditing={pesquisar}

                activeOutlineColor="#6f6f6f"
            />
            <View style={styles.blocoTitulo}>
                <Text style={styles.titulo}>Cadastrar postagem</Text>
                <AntDesign name="plus-circle" size={24} color="black" onPress={vaiParaFormularioPostagem} />
            </View>
            <FlatList
                data={postagens}
                keyExtractor={(item) => item.id.toString()}
                renderItem={cartao}
                contentContainerStyle={styles.lista}
                showsVerticalScrollIndicator={false}
            />
            <Alerta
                visivel={alerta.exibe}
                titulo={alerta.titulo}
                descricao={alerta.mensagem}
                aoFechar={() => setAlerta({ ...alerta, exibe: false })}
                aoConfirmar={alerta.onConfirm}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    titulo: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    pesquisa: {
        margin: 16,
    },
    blocoTitulo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 16,
    },
    lista: {
        paddingBottom: 16,
    },
});