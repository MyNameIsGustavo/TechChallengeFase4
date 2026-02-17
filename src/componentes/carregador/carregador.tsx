import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

interface CarregadorTelaProps {
    texto?: string;
}

export const CarregadorTela = ({ texto = "Carregando..." }: CarregadorTelaProps) => {
    return (
        <View style={styles.overlay}>
            <ActivityIndicator animating size="large" color="black" />
            <Text style={styles.texto}>{texto}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.4)",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
    },
    texto: {
        marginTop: 12,
        fontSize: 16,
        color: "#000000",
        fontWeight: "600",
    },
});
