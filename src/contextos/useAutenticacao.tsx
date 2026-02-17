import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { UsuarioService } from "../servicos/modeloUsuario";
import { IUsuario } from "../modelos/IUsuario";
import { LoginValidacao } from "../schemas/login.schema";

interface AutenticacaoContextType {
    tokenJWT: string | null;
    informacoesUsuario: IUsuario | null;
    realizarLogin: (credenciais: LoginValidacao) => Promise<boolean>;
    logout: () => void;
}

const autenticacaoContext = createContext<AutenticacaoContextType | undefined>(undefined);

interface AutenticacaoProviderProps {
    children: ReactNode;
}

export const AutenticacaoProvider: React.FC<AutenticacaoProviderProps> = ({ children }) => {
    const [tokenJWT, setTokenJWT] = useState<string | null>(null);
    const [informacoesUsuario, setInformacoesUsuario] = useState<IUsuario | null>(null);
    const usuarioServico = new UsuarioService();

    useEffect(() => {
        let ativo = true;
        const carregarUsuario = async () => {
            if (!tokenJWT) {
                if (ativo) setInformacoesUsuario(null);
                return;
            }

            try {
                const dadosUsuario = await usuarioServico.buscarInformacoes(tokenJWT);
                if (ativo) setInformacoesUsuario(dadosUsuario);
            } catch (error) {
                console.error("Erro ao buscar informações do usuário", error);
                if (ativo) {
                    setTokenJWT(null);
                    setInformacoesUsuario(null);
                }
            }
        };
        carregarUsuario();
        return () => {
            ativo = false; 
        };
    }, [tokenJWT]);

    const realizarLogin = async (credenciais: LoginValidacao): Promise<boolean> => {
        try {
            const hashToken = await usuarioServico.login(credenciais);

            if (!hashToken) return false;

            setTokenJWT(hashToken);
            return true;
        } catch (error) {
            console.error("Erro ao fazer login", error);
            return false;
        }
    };

    const logout = () => {
        setTokenJWT(null);
        setInformacoesUsuario(null);
    };

    return (
        <autenticacaoContext.Provider value={{ tokenJWT, informacoesUsuario, realizarLogin, logout }}>
            {children}
        </autenticacaoContext.Provider>
    );
};

export const useAutenticacao = (): AutenticacaoContextType => {
    const context = useContext(autenticacaoContext);

    if (!context) throw new Error("Erro ao criar useAutenticacao");

    return context;
};