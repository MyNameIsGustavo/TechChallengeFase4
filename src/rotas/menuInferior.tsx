import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeView } from "../app/home/HomeView";
import { UsuarioView } from "../app/usuarios/UsuariosView";
import { PostagensView } from "../app/postagens/postagensView";
import { DashboardView } from "../app/dashboard/dashboardView";
import { useAutenticacao } from "../contextos/useAutenticacao";
import { PapeisUsuario } from "../enums/EPapeisUsuario";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import AntDesign from '@expo/vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

export const MenuInferior = () => {
    const { informacoesUsuario } = useAutenticacao();

    const podeAcessarRotasAdmin =
        informacoesUsuario?.papelUsuarioID === PapeisUsuario.DOCENTE ||
        informacoesUsuario?.papelUsuarioID === PapeisUsuario.SUPORTE;

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#3d3d3d",
                tabBarInactiveTintColor: "#cacaca",
                lazy: true,
                tabBarStyle: {
                    height: 90,
                    paddingBottom: 6,
                },
            }}
        >
            <Tab.Screen
                name="Feed"
                component={HomeView}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            {podeAcessarRotasAdmin && (
                <>
                    <Tab.Screen
                        name="Postagens"
                        component={PostagensView}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome name="bookmark-o" size={size} color={color} />
                            ),
                        }}
                    />

                    <Tab.Screen
                        name="Gerenciar"
                        component={UsuarioView}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <SimpleLineIcons name="graduation" size={size} color={color} />
                            ),
                        }}
                    />

                    <Tab.Screen
                        name="Dashboard"
                        component={DashboardView}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <AntDesign name="bar-chart" size={size} color={color} />
                            ),
                        }}
                    />
                </>
            )}
        </Tab.Navigator>
    );
};

