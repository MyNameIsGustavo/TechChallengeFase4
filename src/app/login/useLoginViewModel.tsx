import { useForm } from 'react-hook-form';
import { loginSchema, LoginValidacao } from "../../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod"
import { useAutenticacao } from '../../contextos/useAutenticacao';

export const useLoginViewModel = () => {
    const { realizarLogin } = useAutenticacao();
    const { control, handleSubmit, formState: { errors, isSubmitting },
    } = useForm<LoginValidacao>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", senha: "", }, })

    const login = async (credenciais: LoginValidacao) => {
        await realizarLogin(credenciais);
    };

    return {
        handleSubmit,
        control,
        errors,
        isSubmitting,
        login
    }
}
