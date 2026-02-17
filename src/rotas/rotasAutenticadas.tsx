import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuInferior } from "./menuInferior";
import { AppBar } from "../componentes/appBar/AppBarView";
import { FormularioUsuarioView } from "../app/usuarios/FormularioUsuarioView";
import { UsuarioView } from "../app/usuarios/UsuariosView";
import { IUsuario } from "../modelos/IUsuario";
import { IPostagem } from "../modelos/IPostagem";
import { FormularioPostagensView } from "../app/postagens/formularioPostagensView";
import { PostagensView } from "../app/postagens/postagensView";

export type RotasAutenticadasParamList = {
    Apps: undefined;
    Usuarios: undefined;
    Postagens: undefined;
    FormularioUsuario:
    | {
        ehEdicao?: boolean;
        editarObjeto?: IUsuario;
    }
    | undefined;

    FormularioPostagem:
    | {
        ehEdicao?: boolean;
        editarObjeto?: IPostagem;
    }
    | undefined;
};

const Stack = createNativeStackNavigator<RotasAutenticadasParamList>();

export const RotasAutenticadas = () => {
    return (
        <Stack.Navigator screenOptions={{ header: () => <AppBar />, }}>
            <Stack.Screen name="Apps" component={MenuInferior} />
            <Stack.Screen name="FormularioUsuario" component={FormularioUsuarioView} />
            <Stack.Screen name="FormularioPostagem" component={FormularioPostagensView} />
            <Stack.Screen name="Usuarios" component={UsuarioView} />
        </Stack.Navigator>
    );
};
