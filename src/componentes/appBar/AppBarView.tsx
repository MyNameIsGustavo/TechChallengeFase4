import React from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, HelperText } from 'react-native-paper';
import { Modal } from "../modal/modal";
import { useAppBarViewModel } from "./useAppBarViewModel";
import { TextInput } from "react-native-paper";
import { Controller } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Alerta } from "../alerta/alerta";

export const AppBar = () => {
    const {
        informacoesUsuario,
        mostrarModal,
        abrirModal,
        fecharModal,
        logout,
        selecionarImagem,
        control,
        handleSubmit,
        errors,
        setValue,
        alerta,
        setAlerta,
        abrirConfirmacaoSalvar
    } = useAppBarViewModel();

    return (
        <SafeAreaView edges={["top"]} style={styles.safe}>
            <View style={styles.container}>
                <Text style={styles.titulo}>
                    {`Olá, ${informacoesUsuario?.nomeCompleto || "usuário"}!` || "Olá!"}
                </Text>

                <Pressable onPress={abrirModal}>
                    <Avatar.Image
                        size={40}
                        source={{
                            uri:
                                typeof informacoesUsuario?.caminhoImagem === "string"
                                    ? informacoesUsuario.caminhoImagem
                                    : "https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg"
                        }}
                    />
                </Pressable>
            </View>

            <Modal visible={mostrarModal} onClose={fecharModal}>
                <ScrollView contentContainerStyle={{ paddingVertical: 5 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.containerInformacoesUsuario}>
                        <Avatar.Image
                            size={40}
                            source={{
                                uri:
                                    typeof informacoesUsuario?.caminhoImagem === "string"
                                        ? informacoesUsuario.caminhoImagem
                                        : "https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg"
                            }}
                        />
                        <Text style={styles.usuarioTitulo}>{informacoesUsuario?.nomeCompleto}</Text>
                    </View>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <TextInput
                                mode="outlined"
                                disabled
                                value={field.value}
                                onChangeText={field.onChange}
                                style={{ backgroundColor: "rgb(240, 240, 240)f" }}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="dataCadastro"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                defaultValue={informacoesUsuario?.dataCadastro}
                                disabled
                                mode="outlined"
                                onChangeText={onChange}
                                error={!!errors.dataCadastro}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                activeOutlineColor="#6f6f6f"
                                style={{ marginTop: 16, backgroundColor: "rgb(240, 240, 240)f" }}
                                value={informacoesUsuario?.dataCadastro ? new Intl.DateTimeFormat('pt-BR').format(new Date(informacoesUsuario.dataCadastro)) : "Não informado"}
                            />
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
                                    disable={true}
                                    data={[
                                        { label: "Professor", value: 1 },
                                        { label: "Aluno", value: 2 },
                                    ]}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Selecione o papel"
                                    style={{ borderColor: errors.papelUsuarioID ? "#e44343" : "#c7c7c7", borderWidth: 1, borderRadius: 4, padding: 16, marginTop: 16, backgroundColor: "rgb(240, 240, 240)f", }}
                                    selectedTextStyle={{ color: "#a0a0a0", fontSize: 16 }}
                                />
                                <HelperText type="error" visible={!!errors.papelUsuarioID}>
                                    {errors.papelUsuarioID?.message}
                                </HelperText>
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="nomeCompleto"
                        rules={{
                            minLength: { value: 10, message: "O deve ter 10 caracteres" },
                        }}
                        render={({ field }) => (
                            <>
                                <TextInput
                                    mode="outlined"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    keyboardType="default"
                                    error={!!errors.nomeCompleto}
                                    style={{ backgroundColor: "white", }}
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
                        name="telefone"
                        rules={{
                            minLength: { value: 10, message: "Telefone inválido" },
                        }}
                        render={({ field }) => (
                            <>
                                <TextInput
                                    mode="outlined"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    keyboardType="phone-pad"
                                    error={!!errors.telefone}
                                    activeOutlineColor="#6f6f6f"
                                    style={{ backgroundColor: "white", }}
                                />
                                <HelperText type="error" visible={!!errors.telefone}>
                                    {errors.telefone?.message}
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
                                    (typeof informacoesUsuario?.caminhoImagem === "string"
                                        ? informacoesUsuario.caminhoImagem
                                        : informacoesUsuario?.caminhoImagem?.uri);

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

                    <Controller
                        control={control}
                        name="senha"
                        render={({ field }) => (
                            <TextInput
                                label="Senha"
                                mode="outlined"
                                activeOutlineColor="#6f6f6f"
                                secureTextEntry
                                value={field.value}
                                onChangeText={field.onChange}
                                style={{ backgroundColor: "white" }}
                            />
                        )}
                    />

                    <TouchableOpacity
                        style={styles.blocoSalvar}
                        onPress={handleSubmit((data) => {
                            abrirConfirmacaoSalvar(data);
                        })}
                    >
                        <Text style={styles.textoSalvar}>Salvar</Text>
                        <Feather name="check-circle" size={24} color="#63e443" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.blocoSair} onPress={() => { logout(); fecharModal(); }}>
                        <Text style={styles.textoSair}>Sair</Text>
                        <MaterialCommunityIcons name="logout" size={24} color="#e44343" />
                    </TouchableOpacity>
                </ScrollView>
                <Alerta
                    visivel={alerta.exibe}
                    titulo={alerta.titulo}
                    descricao={alerta.mensagem}
                    aoFechar={() => setAlerta({ ...alerta, exibe: false })}
                    aoConfirmar={alerta.onConfirm}
                />
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: {
        backgroundColor: "#3d3d3d",
    },
    container: {
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#3d3d3d",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    titulo: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    pesquisa: {
        marginTop: 8,
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
    containerInformacoesUsuario: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 16
    },
    usuarioTitulo: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000",
    },
    usuarioSubtitulo: {
        fontSize: 12,
        color: "#000000",
    },
});
