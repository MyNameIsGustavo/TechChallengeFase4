import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { Controller } from "react-hook-form";
import { UseFormularioUsuarioViewModel } from "./useFormularioUsuarioViewModel";
import { Dropdown } from "react-native-element-dropdown";
import { Alerta } from "../../componentes/alerta/alerta";
import { ScrollView } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

export const FormularioUsuarioView = () => {
    const {
        vaiParaAlunos,
        handleSubmit,
        selecionarImagem,
        abrirConfirmacaoSalvar,
        setValue,
        setAlerta,
        control,
        errors,
        isSubmitting,
        alerta,
        ehEdicao,
        usuarioEdicao,
    } = UseFormularioUsuarioViewModel();

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 24 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.blocoFormulario}>
                    <Text style={styles.titulo}>FORMULÁRIO DE USUÁRIO</Text>
                    <Controller
                        control={control}
                        name="nomeCompleto"
                        rules={{ required: "Nome obrigatório" }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <TextInput
                                    label="Nome completo"
                                    mode="outlined"
                                    value={value}
                                    onChangeText={onChange}
                                    style={{ backgroundColor: "#ffffff" }}
                                    activeOutlineColor="#6f6f6f"
                                />
                                <HelperText type="error" visible={!!errors.nomeCompleto}>
                                    {errors.nomeCompleto?.message}
                                </HelperText>
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: "Email obrigatório",
                            pattern: {
                                value: /^\S+@\S+$/,
                                message: "Email inválido",
                            },
                        }}
                        render={({ field }) => (
                            <>
                                <TextInput
                                    label="Email"
                                    mode="outlined"
                                    keyboardType="email-address"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    style={{ backgroundColor: "#ffffff" }}
                                    activeOutlineColor="#6f6f6f"
                                />
                                <HelperText type="error" visible={!!errors.email}>
                                    {errors.email?.message}
                                </HelperText>
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="senha"
                        rules={{
                            required: ehEdicao ? false : "Senha é obrigatória",
                            minLength: {
                                value: 6,
                                message: "Mínimo 6 caracteres",
                            },
                        }}
                        render={({ field }) => (
                            <>
                                <TextInput
                                    label="Senha"
                                    mode="outlined"
                                    secureTextEntry
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    style={{ backgroundColor: "#ffffff" }}
                                    activeOutlineColor="#6f6f6f"
                                />
                                <HelperText type="error" visible={!!errors.senha}>
                                    {errors.senha?.message}
                                </HelperText>
                            </>
                        )}
                    />
                    <Controller
                        control={control}
                        name="telefone"
                        rules={{
                            required: "Telefone obrigatório",
                            minLength: {
                                value: 10,
                                message: "Mínimo 10 caracteres",
                            },
                        }}
                        render={({ field }) => (
                            <>
                                <TextInput
                                    label="Telefone"
                                    mode="outlined"
                                    keyboardType="phone-pad"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    style={{ backgroundColor: "#ffffff" }}
                                    activeOutlineColor="#6f6f6f"
                                />
                                <HelperText type="error" visible={!!errors.telefone}>
                                    {errors.telefone?.message}
                                </HelperText>
                            </>
                        )}
                    />
                    <Controller
                        control={control}
                        name="papelUsuarioID"
                        rules={{ required: "Selecione o papel" }}
                        render={({ field }) => (
                            <>
                                <Dropdown
                                    value={field.value}
                                    onChange={(item) => field.onChange(item.value)}
                                    data={[
                                        { label: "Professor", value: 1 },
                                        { label: "Aluno", value: 2 },
                                    ]}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Selecione o papel"
                                    style={{ borderColor: errors.papelUsuarioID ? "#e44343" : "#000000", borderWidth: 1, borderRadius: 4, padding: 16 }}

                                />
                                <HelperText type="error" visible={!!errors.papelUsuarioID}>
                                    {errors.papelUsuarioID?.message}
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
                                    (typeof usuarioEdicao?.caminhoImagem === "string"
                                        ? usuarioEdicao.caminhoImagem
                                        : usuarioEdicao?.caminhoImagem?.uri);

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

                    <TouchableOpacity style={styles.blocoSalvar} onPress={handleSubmit(abrirConfirmacaoSalvar)} disabled={isSubmitting}>
                        <Text style={styles.textoSalvar}>
                            {isSubmitting ? "Salvando..." : "Salvar"}
                        </Text>
                        <Feather name="check-circle" size={24} color="#63e443" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.blocoSair} onPress={vaiParaAlunos}>
                        <Text style={styles.textoSair}>Voltar</Text>
                        <Ionicons name="chevron-back-circle-outline" size={26} color="#e44343" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Alerta
                visivel={alerta.exibe}
                titulo={alerta.titulo}
                descricao={alerta.mensagem}
                aoFechar={() => setAlerta({ ...alerta, exibe: false })}
                aoConfirmar={alerta.onConfirm}
            />
        </SafeAreaView>
    );
};

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
