import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { Avatar } from "react-native-paper";
import { IPostagem } from "../../modelos/IPostagem";

interface DetalhePostagemProps {
    postagem: IPostagem;
}

export const PostagemDetalhada = ({ postagem }: DetalhePostagemProps) => {
    const fotoPadrao =
        "https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg";

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{postagem.titulo}</Text>
            <View style={styles.autorContainer}>
                <Avatar.Image
                    size={50}
                    source={{
                        uri:
                            typeof postagem.autor?.caminhoImagem === "string"
                                ? postagem.autor.caminhoImagem
                                : fotoPadrao,
                    }}
                />

                <View style={styles.autorInfo}>
                    <Text style={styles.autorNome}>
                        {postagem.autor?.nomeCompleto ?? "Professor"}
                    </Text>
                    <Text style={styles.data}>
                        {new Date(postagem.dataPublicacao).toLocaleString("pt-BR")}
                    </Text>
                </View>
            </View>

            {postagem.caminhoImagem && (
                <Image
                    source={{
                        uri: typeof postagem.caminhoImagem === "string"
                            ? postagem.caminhoImagem
                            : "https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg"
                    }}
                    style={styles.imagemPost}
                    resizeMode="cover"
                />
            )}
            <Text style={styles.descricao}>
                <Text style={{ fontWeight: "bold" }}>
                    {postagem.autor?.nomeCompleto ?? "Professor"}:
                </Text>{" "}
                {postagem.descricao}
            </Text>
            <View style={styles.estatisticas}>
                <View style={styles.badge}>
                    <Text style={styles.badgeTexto}>
                        {postagem.estatisticas?.totalCurtidas ?? 0} Curtidas
                    </Text>
                </View>

                <View style={styles.badge}>
                    <Text style={styles.badgeTexto}>
                        {postagem.estatisticas?.totalComentarios ?? 0} Comentários
                    </Text>
                </View>
            </View>
            <Text style={styles.tituloComentarios}>Comentários</Text>
            {postagem.comentarios && postagem.comentarios.length > 0 ? (
                <FlatList
                    data={postagem.comentarios}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.comentario}>
                            <Avatar.Image
                                size={40}
                                source={{
                                    uri:
                                        typeof item.usuario?.caminhoImagem === "string"
                                            ? item.usuario.caminhoImagem
                                            : fotoPadrao,
                                }}
                            />

                            <View style={styles.comentarioTexto}>
                                <Text>
                                    <Text style={{ fontWeight: "bold" }}>
                                        {item.usuario?.nomeCompleto ?? "Usuário desconhecido"}
                                    </Text>
                                    {": "}
                                    {item.conteudo}
                                </Text>
                            </View>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <Text style={styles.semComentario}>
                    Nenhum comentário disponível.
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    titulo: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    autorContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
    },
    autorInfo: {
        flexDirection: "column",
    },
    autorNome: {
        fontWeight: "bold",
        fontSize: 14,
    },
    data: {
        fontSize: 12,
        color: "#777",
    },
    imagemPost: {
        width: "100%",
        height: 220,
        borderRadius: 8,
        marginBottom: 12,
    },
    descricao: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    estatisticas: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 16,
    },
    badge: {
        backgroundColor: "#6c757d",
        borderRadius: 6,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    badgeTexto: {
        color: "#fff",
        fontSize: 12,
    },
    tituloComentarios: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
    },
    comentario: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 12,
        alignItems: "flex-start",
    },
    comentarioTexto: {
        flex: 1,
        justifyContent: "center"
    },
    semComentario: {
        textAlign: "center",
        color: "#777",
        fontStyle: "italic",
    },
});
