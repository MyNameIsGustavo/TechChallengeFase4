import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAutenticacao } from "../contextos/useAutenticacao";
import { RotasAutenticadas } from "./rotasAutenticadas";
import { RotasPublicas } from "./rotasPublicas";

export const RotasApp = () => {
    const { tokenJWT } = useAutenticacao();

    return (
        <NavigationContainer>
            {tokenJWT ? <RotasAutenticadas /> : <RotasPublicas />}
        </NavigationContainer>
    );
};
