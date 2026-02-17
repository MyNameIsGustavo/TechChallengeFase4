import * as React from 'react';
import { Dialog, Portal } from 'react-native-paper';
import { StyleSheet } from "react-native";

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal = ({ visible, onClose, children }: ModalProps) => {
    return (
        <Portal >
            <Dialog visible={visible} onDismiss={onClose} style={styles.bloco}>
                <Dialog.Content>
                    {children}
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    bloco: {
        backgroundColor: 'white',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});