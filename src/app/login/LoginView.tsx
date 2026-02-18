import React, { useEffect } from "react";
import { Alert, Image, StyleSheet } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLoginViewModel } from "./useLoginViewModel";
import { Controller } from "react-hook-form"
import { CarregadorTela } from "../../componentes/carregador/carregador";

export const LoginView = () => {
    const { handleSubmit, control, errors, login, isSubmitting, erroLogin } = useLoginViewModel();
    useEffect(() => {
        if (erroLogin) {
            Alert.alert(
                "Verifique suas credenciais",
                erroLogin,
                [{ text: "OK" }]
            );
        }
    }, [erroLogin]);
    return (
        <SafeAreaView style={styles.container}>
            {isSubmitting && <CarregadorTela texto="Entrando..." />}
            <Image
                source={require('../../../assets/images/LogoChronos.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        label="Email"
                        mode="outlined"
                        value={value}
                        onChangeText={onChange}
                        error={!!errors.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        activeOutlineColor="#6f6f6f"
                    />
                )}
            />

            <Controller
                control={control}
                name="senha"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        label="Senha"
                        mode="outlined"
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry
                        error={!!errors.senha}
                        activeOutlineColor="#6f6f6f"
                        style={{ marginBottom: 24 }}
                    />
                )}
            />
            <Button textColor="#FFFFFF" buttonColor={"#3d3d3d"} style={{ borderRadius: 8 }} mode="contained" onPress={handleSubmit(login)}>Entrar</Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#ffffff",
    },
    logo: {
        width: "100%",
        alignSelf: "center",
        margin: 0,
        padding: 0,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 24,
    },
    input: {
        marginBottom: 16,
    },
    botao: {
        color: "#6f6f6f",
    }
})
