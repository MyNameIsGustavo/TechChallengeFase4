import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dialog, Portal, Text, Button, Icon } from 'react-native-paper';

interface ModalProps {
    visivel: boolean;
    aoFechar: () => void;
    aoConfirmar: () => void;
    descricao: string;
    titulo: string;
}

export const Alerta = ({ visivel, aoFechar, aoConfirmar, descricao, titulo }: ModalProps) => {
    return (
        <Portal>
            <Dialog visible={visivel} onDismiss={aoFechar} style={styles.container}>
                <View style={styles.blocoIcone}>
                    <Text style={styles.titulo}>{titulo}</Text>
                    <Icon source="alert-circle" size={24} color="#e44343" />
                </View>

                <Dialog.Content><Text variant="bodyMedium" style={styles.descricaoTexto}>{descricao}</Text></Dialog.Content>

                <Dialog.Actions style={{ justifyContent: "center", gap: 16 }}>
                    <Button onPress={aoConfirmar} style={styles.botaoConfirmar} labelStyle={{ color: "#ffffff" }}>Confirmar</Button>
                    <Button onPress={aoFechar} style={styles.botaoCancelar} labelStyle={{ color: "#ffffff" }}>Cancelar</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};
const styles = StyleSheet.create({
    container:{
        flex: .35,
        backgroundColor: "#ffffff",
    },
    blocoIcone: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        gap: 8,
    },
    titulo: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#e44343",
        marginTop: 0,
        paddingTop: 0,
    },
    descricaoTexto: {
        fontSize: 16,
        textAlign: "center",
    },
    botaoConfirmar: {
        backgroundColor: "#e44343",
        color: "#ffffff",
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    botaoCancelar: {
        backgroundColor: "#43a1e4",
        color: "#ffffff",
        paddingHorizontal: 16,
        borderRadius: 4,
    },
})