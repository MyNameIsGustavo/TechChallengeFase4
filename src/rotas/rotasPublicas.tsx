import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginView } from "../app/login/LoginView";

const Stack = createNativeStackNavigator();

export const RotasPublicas = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginView} />
        </Stack.Navigator>
    );
};
