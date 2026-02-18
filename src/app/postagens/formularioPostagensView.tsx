import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Controller } from "react-hook-form";
import { HelperText, TextInput } from "react-native-paper";
import { useFormularioPostagensViewModel } from "./useFormularioPostagensViewModel";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { Alerta } from "../../componentes/alerta/alerta";
import Feather from "@expo/vector-icons/Feather";
import { minLength } from "zod";

export const FormularioPostagensView = () => {
    const {
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
        alerta,
        setAlerta
    } = useFormularioPostagensViewModel();

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 24 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.blocoFormulario}>
                    <Text style={styles.titulo}>FORMULÁRIO DE POSTAGEM</Text>
                    <Controller
                        control={control}
                        name="titulo"
                        rules={{ required: "Título obrigatório" }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <TextInput
                                    label="Título"
                                    mode="outlined"
                                    value={value}
                                    onChangeText={onChange}
                                    style={{ backgroundColor: "#ffffff" }}
                                    activeOutlineColor="#6f6f6f"
                                />
                                <HelperText type="error" visible={!!errors.titulo}>
                                    {errors.titulo?.message}
                                </HelperText>
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="descricao"
                        rules={{
                            required: "Descrição obrigatória",
                            minLength: {
                                value: 10,
                                message: "A descrição deve conter no mínimo 10 caracteres",
                            },
                        }}
                        render={({ field }) => (
                            <>
                                <TextInput
                                    label="Descrição"
                                    mode="outlined"
                                    keyboardType="default"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    style={{ backgroundColor: "#ffffff" }}
                                    activeOutlineColor="#6f6f6f"
                                />
                                <HelperText type="error" visible={!!errors.descricao}>
                                    {errors.descricao?.message}
                                </HelperText>
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="visibilidade"
                        rules={{
                            validate: (value) =>
                                value !== undefined || "Selecione a visibilidade",
                        }}
                        render={({ field }) => (
                            <>
                                <Dropdown
                                    value={field.value}
                                    onChange={(item) => field.onChange(item.value)}
                                    data={[
                                        { label: "Verdadeiro", value: true },
                                        { label: "Falso", value: false },
                                    ]}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Selecione a visibilidade"
                                    style={{ borderColor: errors.visibilidade ? "#e44343" : "#000000", borderWidth: 1, borderRadius: 4, padding: 16 }}

                                />
                                <HelperText type="error" visible={!!errors.visibilidade}>
                                    {errors.visibilidade?.message}
                                </HelperText>
                            </>
                        )}
                    />

                    <View style={{ flexDirection: "row", marginTop: 16 }}>
                        <TouchableOpacity
                            style={{
                                borderColor: errors.caminhoImagem ? "#e44343" : "#000",
                                borderWidth: 1,
                                borderRadius: 4,
                                paddingVertical: 12,
                                paddingHorizontal: 30,
                                justifyContent: "center",
                                flex: 1,
                                alignItems: 'center',
                            }}
                            onPress={async () => {
                                const imagem = await selecionarImagem();
                                if (imagem) {
                                    setValue("caminhoImagem", imagem, {
                                        shouldValidate: true,
                                    });
                                }
                            }}
                        >
                            <Text>Selecionar foto</Text>
                        </TouchableOpacity>

                        <Controller
                            control={control}
                            name="caminhoImagem"
                            render={({ field }) => {
                                const uri =
                                    field.value?.uri ||
                                    (typeof postagemEdicao?.caminhoImagem === "string"
                                        ? postagemEdicao.caminhoImagem
                                        : postagemEdicao?.caminhoImagem?.uri);

                                return (
                                    <>
                                        {uri && (
                                            <Image
                                                source={{ uri }}
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: 25,
                                                    marginLeft: 12,
                                                }}
                                            />
                                        )}
                                    </>
                                );
                            }}
                        />
                    </View>

                    <HelperText type="error" visible={!!errors.caminhoImagem}>
                        {errors.caminhoImagem?.message}
                    </HelperText>

                    <TouchableOpacity style={styles.blocoSalvar} onPress={handleSubmit(abrirConfirmacaoSalvar)}>
                        <Text style={styles.textoSalvar}>
                            Salvar
                        </Text>
                        <Feather name="check-circle" size={24} color="#63e443" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.blocoSair} onPress={vaiParaPostagens}>
                        <Text style={styles.textoSair}>Voltar</Text>
                        <Ionicons name="chevron-back-circle-outline" size={26} color="#e44343" />
                    </TouchableOpacity>
                </View>
                <Alerta
                    visivel={alerta.exibe}
                    titulo={alerta.titulo}
                    descricao={alerta.mensagem}
                    aoFechar={() => setAlerta({ ...alerta, exibe: false })}
                    aoConfirmar={alerta.onConfirm}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    blocoFormulario: {
        margin: 16,
    },
    titulo: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
    },
    pesquisa: {
        marginBottom: 16,
    },
    blocoTitulo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 16,
    },
    blocoSalvar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "auto",
        backgroundColor: "#d8f8d7",
        width: "100%",
        padding: 12,
        borderRadius: 4,
        marginTop: 16,
        justifyContent: "center",
    },
    textoSalvar: {
        fontSize: 16,
        marginRight: 8,
        color: "#63e443",
        fontWeight: "bold",
    },
    blocoSair: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "auto",
        backgroundColor: "#f8d7da",
        width: "100%",
        padding: 12,
        borderRadius: 4,
        marginTop: 10,
        justifyContent: "center",
    },
    textoSair: {
        fontSize: 16,
        marginRight: 8,
        color: "#e44343",
        fontWeight: "bold",
    },
});