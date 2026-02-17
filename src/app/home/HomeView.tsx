import React from "react";
import { FlatList, Text, StyleSheet, ListRenderItem } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { Cartao } from "../../componentes/cartao/cartaoView";
import { useHomeViewModel } from "./useHomeViewModel";
import { IPostagem } from "../../modelos/IPostagem";
import { PostagemDetalhada } from "../../componentes/postagemDetalhada/postagemDetalhada";
import { Modal } from "../../componentes/modal/modal";

export const HomeView = () => {
    const { postagens, termo, setTermo, pesquisar, selecionarPostagemModal, setMostrarModal, mostrarModal, postagemSelecionada } = useHomeViewModel();

    const itemLista: ListRenderItem<IPostagem> = ({ item: dados }) => (
        <Cartao
            usuario={dados.autor.nomeCompleto}
            fotoUsuario={
                typeof dados.autor.caminhoImagem === "string"
                    ? dados.autor.caminhoImagem
                    : "https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg"
            }
            imagemPost={
                typeof dados.caminhoImagem === "string"
                    ? dados.caminhoImagem
                    : "https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg"
            }
            descricao={dados.descricao.toLowerCase()}
            numCurtidas={dados.estatisticas?.totalCurtidas ?? 0}
            numComentarios={dados.estatisticas?.totalComentarios ?? 0}
            postagemID={dados.id}
            comentarios={dados.comentarios}
            iniciaCurtido={dados.estatisticas?.usuarioCurtiu}
            titulo={dados.titulo}
            autorID={dados.autor.id}
            abrirModal={() => {
                selecionarPostagemModal(dados.id);
                setMostrarModal(true);
            }}
        />
    );

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <FlatList
                data={postagens}
                keyExtractor={(item) => item.id.toString()}
                renderItem={itemLista}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={
                    <>
                        <TextInput
                            placeholder="Encontrar postagens..."
                            mode="outlined"
                            dense
                            style={styles.pesquisa}
                            value={termo}
                            onChangeText={setTermo}
                            onEndEditing={pesquisar}
                            activeOutlineColor="#6f6f6f"
                        />
                        <Text style={styles.title}>Central Chronos</Text>
                    </>
                }
                ListEmptyComponent={
                    <Text style={styles.empty}>
                        Nenhuma postagem encontrada
                    </Text>
                }
            />
            {mostrarModal && postagemSelecionada && (
                <Modal
                    visible={mostrarModal}
                    onClose={() => setMostrarModal(false)}
                >
                    <PostagemDetalhada postagem={postagemSelecionada} />
                </Modal>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
    },
    pesquisa: {
        margin: 16,
    },
    listContent: {
        paddingBottom: 16,
    },
    empty: {
        textAlign: "center",
        marginTop: 40,
        fontSize: 16,
        color: "#777",
    },
});
