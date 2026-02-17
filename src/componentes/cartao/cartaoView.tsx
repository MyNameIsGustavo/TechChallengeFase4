import { View, StyleSheet, Text, Image, Pressable, TextInput } from "react-native";
import { Avatar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IComentario } from "../../modelos/IComentario";
import { useCartaoViewModel } from "./useCartaoViewModel";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";

interface CartaoPostagemProps {
    usuario: string;
    fotoUsuario: string;
    imagemPost: string;
    descricao: string;
    numCurtidas?: number;
    numComentarios?: number;
    titulo: string;
    postagemID: number;
    comentarios: IComentario[];
    iniciaCurtido: boolean;
    autorID: number;
    selecionar?: () => void;
    abrirModal?: () => void;
}

export const Cartao = ({
    usuario,
    fotoUsuario,
    imagemPost,
    descricao,
    numCurtidas = 0,
    numComentarios = 0,
    titulo,
    postagemID,
    comentarios,
    iniciaCurtido,
    autorID,
    selecionar,
    abrirModal,
}: CartaoPostagemProps) => {

    const {
        likes,
        listaComentarios,
        isCurtido,
        informacoesUsuario,
        curtirPostagem,
        descurtirPostagem,
        comentarPostagem,
        handleSubmit,
        setValue,
        descomentarPostagem,
    } = useCartaoViewModel({
        numCurtidas,
        numComentarios,
        comentarios,
        postagemID,
        iniciaCurtido,
    });

    return (
        <View style={styles.card}>
            <Pressable style={styles.header} onPress={abrirModal}>
                <View style={styles.containerInformacoesUsuario}>
                    <Avatar.Image size={40} source={{ uri: fotoUsuario }} />
                    <View>
                        <Text style={styles.usuarioTitulo}>{usuario}</Text>
                        <Text style={styles.usuarioSubtitulo}>{titulo}</Text>
                    </View>
                </View>
            </Pressable>

            <Image source={{ uri: imagemPost }} style={styles.imagem} />

            <View style={styles.acoes}>
                <Pressable
                    onPress={() => {
                        isCurtido ? descurtirPostagem() : curtirPostagem();
                    }}
                >
                    <MaterialCommunityIcons
                        name={isCurtido ? "heart" : "heart-outline"}
                        size={26}
                        color={isCurtido ? "#cd0f0f" : "#000"}
                    />
                </Pressable>

                <FontAwesome6 name="comment" size={22} />
            </View>

            <Text style={styles.likes}>{likes} Curtidas</Text>

            <Text style={styles.descricao}>
                <Text style={{ fontWeight: "bold" }}>{usuario}</Text> {descricao}
            </Text>

            {listaComentarios.length > 0 ? (
                listaComentarios.slice(0, 2).map((comentario) => (
                    <View key={comentario.id} style={styles.comentario}>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>
                                {comentario.usuario?.nomeCompleto ?? "Usuário"}
                            </Text>{" "}
                            {comentario.conteudo}
                        </Text>

                        {comentario.usuario?.id === informacoesUsuario?.id && (
                            <Pressable onPress={() => descomentarPostagem(comentario.id)}>
                                <MaterialCommunityIcons name="delete-outline" size={18} />
                            </Pressable>
                        )}
                    </View>
                ))
            ) : (
                <Text style={styles.semComentario}>Nenhum comentário ainda.</Text>
            )}

            <View style={styles.comentar}>
                <TextInput
                    placeholder="Adicione um comentário..."
                    style={styles.input}
                    onChangeText={(text) => setValue("conteudo", text)}
                />
                <Pressable
                    onPress={handleSubmit((data) => comentarPostagem(data.conteudo))}
                >
                    <Feather name="send" size={22} />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 16,
        overflow: "hidden",
    },
    header: {
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    containerInformacoesUsuario: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    usuarioTitulo: {
        fontWeight: "bold",
        fontSize: 15,
    },
    usuarioSubtitulo: {
        fontSize: 12,
        color: "#666",
    },
    imagem: {
        width: "100%",
        height: 220,
    },
    acoes: {
        flexDirection: "row",
        gap: 16,
        padding: 12,
    },
    likes: {
        fontWeight: "bold",
        paddingHorizontal: 12,
    },
    descricao: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    comentario: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    semComentario: {
        paddingHorizontal: 12,
        fontStyle: "italic",
        color: "#777",
    },
    comentar: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        gap: 8,
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 4,
    },
});
