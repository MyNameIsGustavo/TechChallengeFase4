import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";
import { useDashboardViewModel } from "./useDashboardViewModel";
import { GraficoBarra } from "../../componentes/graficos/graficoBarra";
import { GraficoLinha } from "../../componentes/graficos/graficoLinha";
import { GraficoPizza } from "../../componentes/graficos/graficoPizza";

export const DashboardView = () => {
    const {
        usuariosPorPapel,
        usuariosPorPostagem,
        postagemPorMes,
        curtidasPorPostagem
    } = useDashboardViewModel();
    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 24 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <GraficoBarra
                    dados={postagemPorMes}
                    getLabel={(item) => item.mes}
                    getValue={(item) => item.totalPostagens}
                    titulo="Postagens por mês"
                />
                <GraficoPizza
                    dados={curtidasPorPostagem}
                    getLabel={(item) => item.titulo}
                    getValue={(item) => item.totalCurtidas}
                    titulo="Curtidas por post."
                />
                <GraficoBarra
                    dados={usuariosPorPapel}
                    getLabel={(item) => item.papel}
                    getValue={(item) => item.total}
                    titulo="Usuários por papel"
                />
                <GraficoPizza
                    dados={usuariosPorPostagem}
                    getLabel={(item) => item.usuario}
                    getValue={(item) => item.total}
                    titulo="Postagem por usuário"
                />
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
    },
    pesquisa: {
        margin: 16,
    },
    listContent: {
        paddingBottom: 16,
    },
    empty: {
        textAlign: "center",
        marginTop: 40,
        fontSize: 16,
        color: "#777",
    },
});
