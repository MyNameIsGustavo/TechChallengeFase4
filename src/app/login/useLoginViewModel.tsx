import { useForm } from 'react-hook-form';
import { loginSchema, LoginValidacao } from "../../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod"
import { useAutenticacao } from '../../contextos/useAutenticacao';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useLoginViewModel = () => {
    const { realizarLogin } = useAutenticacao();
    const { control, handleSubmit, formState: { errors, isSubmitting },
    } = useForm<LoginValidacao>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", senha: "", }, })
    const [erroLogin, setErroLogin] = useState<string | null>(null);

    const login = async (credenciais: LoginValidacao) => {
        try {
            setErroLogin(null);

            const resultado = await realizarLogin(credenciais);

            if (!resultado) {
                throw new Error("Credenciais inválidas");
            }

        } catch (error: any) {
            setErroLogin(error.message || "Erro ao realizar login");
        }
    };

    return {
        handleSubmit,
        control,
        errors,
        isSubmitting,
        login,
        erroLogin
    }
}
