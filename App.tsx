import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { RotasApp } from "./src/rotas/rotasApp";
import { AutenticacaoProvider } from "./src/contextos/useAutenticacao";

export const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider>
                <AutenticacaoProvider>
                    <RotasApp />
                </AutenticacaoProvider>
            </PaperProvider>
        </GestureHandlerRootView>
    );
};