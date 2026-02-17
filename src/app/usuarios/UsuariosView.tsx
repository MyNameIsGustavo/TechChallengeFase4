import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CartaoLista } from "../../componentes/cartaoLista/cartaoLista"
import { UseUsuarioViewModel } from "./useUsuarioViewModel";
import { Alerta } from "../../componentes/alerta/alerta";
import { IUsuario } from "../../modelos/IUsuario";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from '@expo/vector-icons/AntDesign';

export const UsuarioView = () => {
    const { usuarios,
        vaiParaFormularioUsuario,
        alerta,
        setAlerta,
        abrirConfirmacaoExclusao,
        selecionarUsuario,
        setPapelUsuarioSelecionado,
        carregarUsuarios,
        carregando
    } = UseUsuarioViewModel();

    const cartao = ({ item }: any) => {
        let imagem = "https://avatars.githubusercontent.com/u/103784593?v=4";
        if (typeof item.caminhoImagem === "string") {
            imagem = item.caminhoImagem;
        }

        return (
            <CartaoLista<IUsuario>
                item={item.nomeCompleto ? item : { ...item, nomeCompleto: "Usuário sem nome" }}
                getNome={(item) => item.nomeCompleto}
                getData={(item) => item.dataCadastro}
                getImagem={() => imagem}
                aoDeletar={() => abrirConfirmacaoExclusao(item.id)}
                aoPressionar={() => selecionarUsuario(item.id)}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <View style={styles.blocoTitulo}>
                <Text style={styles.titulo}>Cadastrar usuários</Text>
                <AntDesign name="plus-circle" size={24} color="black" onPress={vaiParaFormularioUsuario} />
            </View>
            <View>
                <Dropdown
                    data={[
                        { label: "Todos", value: undefined },
                        { label: "Professor", value: 1 },
                        { label: "Aluno", value: 2 },
                    ]}
                    labelField="label"
                    valueField="value"
                    placeholder="Selecione o papel"
                    onChange={(item) => {
                        setPapelUsuarioSelecionado?.(item.value)
                    }}
                    style={{
                        borderColor: "#000",
                        borderWidth: 1,
                        borderRadius: 4,
                        padding: 16,
                        margin: 16
                    }}
                />
            </View>
            <FlatList
                data={usuarios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={cartao}
                onEndReached={() => carregarUsuarios?.()}
                onEndReachedThreshold={0.2}
                ListFooterComponent={
                    carregando ? <ActivityIndicator size="small" /> : null
                }
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
        marginTop: 16
    },
    lista: {
        paddingBottom: 16,
    },
});
